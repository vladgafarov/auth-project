import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Res,
} from '@nestjs/common'
import { Response } from 'express'
import { toFileStream } from 'qrcode'
import { ActiveUser } from '../decorators/active-user.decorator'
import { Auth } from '../decorators/auth.decorator'
import { AuthType } from '../enums/auth-type.enum'
import { ActiveUserData } from '../interfaces/active-user-data.interface'
import { AuthenticationService } from './authentication.service'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { OtpAuthenticationService } from './otp-authentication.service'

@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
	constructor(
		private readonly authService: AuthenticationService,
		private readonly otpAuthService: OtpAuthenticationService
	) {}

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

	@Auth(AuthType.Bearer)
	@HttpCode(HttpStatus.OK)
	@Post('2fa/generate')
	async generateQrCode(
		@ActiveUser() user: ActiveUserData,
		@Res() response: Response
	) {
		const { secret, uri } = await this.otpAuthService.generateSecret(
			user.email
		)
		await this.otpAuthService.enableTfaForUser(user.email, secret)
		response.type('png')
		return toFileStream(response, uri)
	}
}
