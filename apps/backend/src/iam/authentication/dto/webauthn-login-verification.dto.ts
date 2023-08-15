import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator'

export class WebauthnLoginVerificationDto {
	// @IsEmail()
	// email: string
	@IsString()
	challenge: string

	@IsString()
	id: string

	@IsString()
	rawId: string

	@IsEnum(['public-key'])
	type: 'public-key'

	@IsOptional()
	@IsEnum(['cross-platform', 'platform'])
	authenticatorAttachment?: 'cross-platform' | 'platform'

	response: {
		authenticatorData: string
		clientDataJSON: string
		signature: string
		userHandle?: string
	}
	clientExtensionResults: AuthenticationExtensionsClientOutputs
}
