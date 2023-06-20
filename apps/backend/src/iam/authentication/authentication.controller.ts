import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { Auth } from '../decorators/auth.decorator'
import { AuthType } from '../enums/auth-type.enum'
import { AuthenticationService } from './authentication.service'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
	constructor(private readonly authService: AuthenticationService) {}

	@Post('sign-up')
	async signUp(@Body() signUpDto: SignUpDto) {
		return this.authService.signUp(signUpDto)
	}

	@HttpCode(HttpStatus.OK)
	@Post('sign-in')
	signIn(@Body() signInDto: SignInDto) {
		return this.authService.signIn(signInDto)
	}

	@HttpCode(HttpStatus.OK)
	@Post('refresh-tokens')
	refreshTokens(@Body() refreshTokensDto: RefreshTokenDto) {
		return this.authService.refreshTokens(refreshTokensDto)
	}
}
