import { Injectable } from '@nestjs/common'
import { OnModuleInit, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { OAuth2Client } from 'google-auth-library'
import { PrismaService } from '../../../prisma.service'
import { AuthenticationService } from '../authentication.service'

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
	private oauthClient: OAuth2Client

	constructor(
		private readonly configService: ConfigService,
		private readonly authService: AuthenticationService,
		private readonly prismaService: PrismaService,
	) {}

	onModuleInit() {
		const clientId = this.configService.get('GOOGLE_CLIENT_ID')
		const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET')
		this.oauthClient = new OAuth2Client(clientId, clientSecret)
	}

	async authenticate(token: string) {
		try {
			const loginTicket = await this.oauthClient.verifyIdToken({
				idToken: token,
			})
			const { email, sub: googleId } = loginTicket.getPayload()
			const user = await this.prismaService.user.findUnique({
				where: { googleId },
			})
			if (user) {
				return this.authService.generateTokens(user)
			} else {
				const newUser = await this.prismaService.user.create({
					data: {
						email,
						googleId,
					},
				})
				return this.authService.generateTokens(newUser)
			}
		} catch (error) {
			throw new UnauthorizedException('cannot login with Google')
		}
	}
}
