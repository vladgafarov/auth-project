import {
	BadRequestException,
	Inject,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'crypto'
import { Response } from 'express'
import { PrismaService } from 'src/prisma.service'
import jwtConfig from '../config/jwt.config'
import { HashingService } from '../hashing/hashing.service'
import {
	ACCESS_TOKEN_COOKIE_NAME,
	REFRESH_TOKEN_COOKIE_NAME,
} from '../iam.constants'
import { ActiveUserData } from '../interfaces/active-user-data.interface'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { SignInDto } from './dto/sign-in.dto'
import { OtpAuthenticationService } from './otp-authentication.service'
import {
	InvalidatedRefreshTokenError,
	RefreshTokenIdsStorage,
} from './refresh-token-ids.storage'

@Injectable()
export class AuthenticationService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly hashingService: HashingService,
		private readonly jwtService: JwtService,
		@Inject(jwtConfig.KEY)
		private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
		private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
		private readonly otpAuthService: OtpAuthenticationService
	) {}

	async signUp({ email, password }: Prisma.UserCreateInput) {
		try {
			const user = await this.prismaService.user.create({
				data: {
					email,
					password: await this.hashingService.hash(password),
					role: {
						connectOrCreate: {
							where: {
								value: 'regular',
							},
							create: {
								value: 'regular',
							},
						},
					},
				},
			})

			return this.generateTokens(user)
		} catch (err) {
			throw new BadRequestException('cannot signup')
		}
	}

	async signIn({ password, email, tfaCode }: SignInDto) {
		const user = await this.prismaService.user.findUnique({
			where: {
				email,
			},
			include: {
				role: true,
			},
		})
		if (!user) {
			throw new UnauthorizedException('User or password is invalid')
		}

		const isEqual = await this.hashingService.compare(password, user.password)
		if (!isEqual) {
			throw new UnauthorizedException('User or password is invalid')
		}

		if (user.isTfaEnabled) {
			const isValid = this.otpAuthService.verifyCode(tfaCode, user.tfaSecret)
			if (!isValid) {
				throw new UnauthorizedException('Invalid 2FA code')
			}
		}

		return this.generateTokens(user)
	}

	async refreshTokens(refreshTokensDto: RefreshTokenDto) {
		try {
			const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
				Pick<ActiveUserData, 'sub'> & { refreshTokenId: string }
			>(refreshTokensDto.refreshToken, {
				secret: this.jwtConfiguration.secret,
				audience: this.jwtConfiguration.audience,
				issuer: this.jwtConfiguration.issuer,
			})
			const user = await this.prismaService.user.findUnique({
				where: { id: sub },
				include: {
					role: true,
				},
			})
			const isValid = await this.refreshTokenIdsStorage.validate(
				user.id,
				refreshTokenId
			)
			if (isValid) {
				await this.refreshTokenIdsStorage.invalidate(user.id)
			} else {
				throw new Error('Refresh token is invalid')
			}

			return this.generateTokens(user)
		} catch (error) {
			if (error instanceof InvalidatedRefreshTokenError) {
				throw new UnauthorizedException('Access denied')
			}

			throw new UnauthorizedException()
		}
	}

	async generateTokens(user: User) {
		const refreshTokenId = randomUUID()
		const [accessToken, refreshToken] = await Promise.all([
			this.signToken<Partial<ActiveUserData>>(
				user.id,
				this.jwtConfiguration.accessTokenTtl,
				{
					email: user.email,
					roleId: user.roleId,
				}
			),
			this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, {
				refreshTokenId,
			}),
		])
		await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId)

		return {
			accessToken,
			refreshToken,
		}
	}

	responseJwtInCookie(
		response: Response,
		tokens: Awaited<ReturnType<AuthenticationService['generateTokens']>>
	) {
		response.cookie(ACCESS_TOKEN_COOKIE_NAME, tokens.accessToken, {
			httpOnly: true,
			maxAge: this.jwtConfiguration.accessTokenTtl,
		})
		response.cookie(REFRESH_TOKEN_COOKIE_NAME, tokens.refreshToken, {
			httpOnly: true,
			maxAge: this.jwtConfiguration.refreshTokenTtl,
		})
	}

	private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
		return this.jwtService.signAsync(
			{
				sub: userId,
				...payload,
			},
			{
				audience: this.jwtConfiguration.audience,
				issuer: this.jwtConfiguration.issuer,
				secret: this.jwtConfiguration.secret,
				expiresIn,
			}
		)
	}
}
