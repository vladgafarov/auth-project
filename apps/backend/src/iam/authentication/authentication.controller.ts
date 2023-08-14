import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { toFileStream } from 'qrcode'
import { ActiveUser } from '../decorators/active-user.decorator'
import { Auth } from '../decorators/auth.decorator'
import { AuthType } from '../enums/auth-type.enum'
import { REFRESH_TOKEN_COOKIE_NAME } from '../iam.constants'
import { ActiveUserData } from '../interfaces/active-user-data.interface'
import { AuthenticationService } from './authentication.service'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { WebauthnRegistrationOptionsDto } from './dto/webauthn-registration-options.dto'
import { WebauthnRegistrationVerificationDto } from './dto/webauthn-registration-verification.dto'
import { OtpAuthenticationService } from './otp-authentication.service'
import { WebauthnService } from './webauthn/webauthn.service'
import { WebauthnLoginOptionsDto } from './dto/webauthn-login-options.dto'
import { WebauthnLoginVerificationDto } from './dto/webauthn-login-verification.dto'

@Auth(AuthType.None)
@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
	constructor(
		private readonly authService: AuthenticationService,
		private readonly otpAuthService: OtpAuthenticationService,
		private readonly webauthnService: WebauthnService,
	) {}

	@Post('sign-up')
	async signUp(
		@Body() signUpDto: SignUpDto,
		@Res({ passthrough: true }) response: Response,
	) {
		const tokens = await this.authService.signUp(signUpDto)
		this.authService.responseJwtInCookie(response, tokens)

		return tokens
	}

	@HttpCode(HttpStatus.OK)
	@Post('sign-in')
	async signIn(
		@Res({ passthrough: true }) response: Response,
		@Body() signInDto: SignInDto,
	) {
		const tokens = await this.authService.signIn(signInDto)
		this.authService.responseJwtInCookie(response, tokens)

		return tokens
	}

	@HttpCode(HttpStatus.OK)
	@Post('refresh-tokens')
	async refreshTokens(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response,
	) {
		const refreshToken = request.cookies[REFRESH_TOKEN_COOKIE_NAME]
		if (!refreshToken) {
			throw new BadRequestException('no refresh token was provided')
		}

		const tokens = await this.authService.refreshTokens({ refreshToken })
		this.authService.responseJwtInCookie(response, tokens)

		return tokens
	}

	@Auth(AuthType.Bearer)
	@HttpCode(HttpStatus.OK)
	@Post('2fa/generate')
	async generateQrCode(
		@ActiveUser() user: ActiveUserData,
		@Res() response: Response,
	) {
		const { secret, uri } = await this.otpAuthService.generateSecret(
			user.email,
		)
		await this.otpAuthService.enableTfaForUser(user.email, secret)
		response.type('png')
		return toFileStream(response, uri)
	}

	@Post('webauthn-registration-options')
	@HttpCode(HttpStatus.OK)
	async webauthnRegistrationOptions(
		@Body() dto: WebauthnRegistrationOptionsDto,
	) {
		return this.webauthnService.registrationOptions(dto)
	}

	@Post('webauthn-registration-verification')
	@HttpCode(HttpStatus.OK)
	async webauthnRegistrationVerification(
		@Body() dto: WebauthnRegistrationVerificationDto,
	) {
		return this.webauthnService.registrationVerification(dto)
	}

	@Post('webauthn-registration-verification')
	@HttpCode(HttpStatus.OK)
	async webauthnLoginOptions(@Body() dto: WebauthnLoginOptionsDto) {
		return this.webauthnService.loginOptions(dto)
	}

	@Post('webauthn-registration-verification')
	@HttpCode(HttpStatus.OK)
	async webauthnLoginVerification(@Body() dto: WebauthnLoginVerificationDto) {
		return this.webauthnService.loginVerification(dto)
	}

	@Auth(AuthType.Bearer)
	@Post('sign-out')
	@HttpCode(HttpStatus.OK)
	async signOut(@Res({ passthrough: true }) response: Response) {
		this.authService.clearJwtInCookie(response)
	}
}
