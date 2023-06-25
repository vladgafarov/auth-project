import { Body, Controller, Post } from '@nestjs/common'
import { GoogleTokenDto } from '../dto/google-token.dto'
import { GoogleAuthenticationService } from './google-authentication.service'

@Controller('authentication/google')
export class GoogleAuthenticationController {
	constructor(
		private readonly googleAuthService: GoogleAuthenticationService
	) {}

	@Post()
	authenticate(@Body() tokenDto: GoogleTokenDto) {
		return this.googleAuthService.authenticate(tokenDto.token)
	}
}
