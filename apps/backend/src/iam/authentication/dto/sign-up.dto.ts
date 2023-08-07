import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, MinLength } from 'class-validator'

export class SignUpDto {
	@ApiProperty()
	@IsEmail()
	email: string

	@ApiProperty()
	@MinLength(6)
	password: string
}
