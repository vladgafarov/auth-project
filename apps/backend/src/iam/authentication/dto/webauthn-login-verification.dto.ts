import { IsEmail, IsEnum, IsString } from 'class-validator'

export class WebauthnLoginVerificationDto {
	@IsEmail()
	email: string

	@IsString()
	id: string

	@IsString()
	rawId: string

	@IsEnum(['public-key'])
	type: 'public-key'

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
