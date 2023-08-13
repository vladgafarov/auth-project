import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator'

export class WebauthnRegistrationVerificationDto {
	@IsEmail()
	email: string

	@IsString()
	id: string

	@IsString()
	rawId: string

	@IsOptional()
	@IsEnum(['cross-platform', 'platform'])
	authenticatorAttachment?: 'cross-platform' | 'platform'

	@IsEnum(['public-key'])
	type: 'public-key'

	response: {
		attestationObject: string
		authenticatorData: string
		clientDataJSON: string
		publicKey?: string
		publicKeyAlgorithm?: number
		transports?: AuthenticatorTransport[]
	}

	clientExtensionResults: {
		appid?: boolean
		credProps?: { rk?: boolean }
		hmacCreateSecret?: boolean
	}
}
