import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNumberString, IsOptional, MinLength } from 'class-validator'

export class SignInDto {
	@ApiProperty()
	@IsEmail()
	email: string

	@ApiProperty({
		minLength: 6,
	})
	@MinLength(6)
	password: string

	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@IsNumberString()
	tfaCode?: string
}
