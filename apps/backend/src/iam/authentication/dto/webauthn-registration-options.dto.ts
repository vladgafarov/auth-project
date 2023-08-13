import { IsEmail } from 'class-validator'

export class WebauthnRegistrationOptionsDto {
	@IsEmail()
	email: string
}
