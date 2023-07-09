import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import jwtConfig from 'src/iam/config/jwt.config'
import {
	ACCESS_TOKEN_COOKIE_NAME,
	REFRESH_TOKEN_COOKIE_NAME,
	REQUEST_USER_KEY,
} from 'src/iam/iam.constants'

@Injectable()
export class AccessTokenGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		@Inject(jwtConfig.KEY)
		private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()

		const token =
			this.extractTokenFromCookie(request) ||
			this.extractTokenFromHeader(request)

		if (!token) {
			throw new UnauthorizedException()
		}

		try {
			const payload = await this.jwtService.verifyAsync(
				token,
				this.jwtConfiguration
			)
			request[REQUEST_USER_KEY] = payload
		} catch (err) {
			throw new UnauthorizedException()
		}
		return true
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		const [type, token] = request.headers.authorization?.split(' ') ?? []
		return type === 'Bearer' ? token : undefined
	}

	private extractTokenFromCookie(request) {
		if (!request?.cookies) return undefined

		return (
			request.cookies[ACCESS_TOKEN_COOKIE_NAME] ||
			request.cookies[REFRESH_TOKEN_COOKIE_NAME]
		)
	}
}
