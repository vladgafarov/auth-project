import { IsEmail } from 'class-validator'

export class WebauthnLoginOptionsDto {
	@IsEmail()
	email: string
}
