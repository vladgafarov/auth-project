import { Body, Controller, Post, Res } from '@nestjs/common'
import { GoogleTokenDto } from '../dto/google-token.dto'
import { GoogleAuthenticationService } from './google-authentication.service'
import { Auth } from '../../decorators/auth.decorator'
import { AuthType } from '../../enums/auth-type.enum'
import { Response } from 'express'
import { AuthenticationService } from '../authentication.service'

@Auth(AuthType.None)
@Controller('authentication/google')
export class GoogleAuthenticationController {
	constructor(
		private readonly googleAuthService: GoogleAuthenticationService,
		private readonly authService: AuthenticationService,
	) {}

	@Post()
	async authenticate(
		@Body() tokenDto: GoogleTokenDto,
		@Res({ passthrough: true }) response: Response,
	) {
		const tokens = await this.googleAuthService.authenticate(tokenDto.token)
		this.authService.responseJwtInCookie(response, tokens)

		return tokens
	}
}
