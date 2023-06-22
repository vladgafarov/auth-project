import { IsString } from 'class-validator'

export class CreateRoleDto {
	@IsString()
	value: string
}
