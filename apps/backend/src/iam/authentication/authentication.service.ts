import {
	BadRequestException,
	Inject,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import jwtConfig from '../config/jwt.config'
import { HashingService } from '../hashing/hashing.service'
import { ActiveUserData } from '../interfaces/active-user-data.interface'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { SignInDto } from './dto/sign-in.dto'

@Injectable()
export class AuthenticationService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly hashingService: HashingService,
		private readonly jwtService: JwtService,
		@Inject(jwtConfig.KEY)
		private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
	) {}

	async signUp({ email, password }: Prisma.UserCreateInput) {
		try {
			const user = await this.prismaService.user.create({
				data: {
					email: email,
					password: await this.hashingService.hash(password),
				},
			})

			return user
		} catch (err) {
			throw new BadRequestException('cannot signup')
		}
	}

	async signIn({ password, email }: SignInDto) {
		const user = await this.prismaService.user.findUnique({
			where: {
				email,
			},
		})
		if (!user) {
			throw new UnauthorizedException('User or password is invalid')
		}

		const isEqual = await this.hashingService.compare(password, user.password)
		if (!isEqual) {
			throw new UnauthorizedException('User or password is invalid')
		}

		return this.generateTokens(user)
	}

	async refreshTokens(refreshTokensDto: RefreshTokenDto) {
		try {
			const { sub } = await this.jwtService.verifyAsync<
				Pick<ActiveUserData, 'sub'>
			>(refreshTokensDto.refreshToken, {
				secret: this.jwtConfiguration.secret,
				audience: this.jwtConfiguration.audience,
				issuer: this.jwtConfiguration.issuer,
			})
			const user = await this.prismaService.user.findUnique({
				where: { id: sub },
			})

			return this.generateTokens(user)
		} catch (error) {
			throw new UnauthorizedException()
		}
	}

	async generateTokens(user: User) {
		const [accessToken, refreshToken] = await Promise.all([
			this.signToken<Partial<ActiveUserData>>(
				user.id,
				this.jwtConfiguration.accessTokenTtl,
				{
					email: user.email,
				}
			),
			this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl),
		])

		return {
			accessToken,
			refreshToken,
		}
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
