/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common'
import { Request } from 'express'
import { promisify } from 'util'
import { ActiveUser } from '../decorators/active-user.decorator'
import { Auth } from '../decorators/auth.decorator'
import { AuthType } from '../enums/auth-type.enum'
import { ActiveUserData } from '../interfaces/active-user-data.interface'
import { SignInDto } from './dto/sign-in.dto'
import { SessionGuard } from './guards/session.guard'
import { SessionAuthenticationService } from './session-authentication.service'

@Auth(AuthType.None)
@Controller('session-authentication')
export class SessionAuthenticationController {
	constructor(
		private readonly sessionAuthService: SessionAuthenticationService
	) {}

	@HttpCode(HttpStatus.OK)
	@Post('sign-in')
	async signIn(@Req() request: Request, @Body() signInDto: SignInDto) {
		const user = await this.sessionAuthService.signIn(signInDto)
		//@ts-ignore ok
		await promisify(request.logIn).call(request, user)
	}

	@UseGuards(SessionGuard)
	@Get()
	async sayHello(@ActiveUser() user: ActiveUserData) {
		return `Hey, ${user.email}`
	}
}
