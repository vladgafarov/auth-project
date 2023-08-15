import { BadRequestException, Injectable } from '@nestjs/common'
import {
	VerifiedAuthenticationResponse,
	VerifiedRegistrationResponse,
	generateAuthenticationOptions,
	generateRegistrationOptions,
	verifyAuthenticationResponse,
	verifyRegistrationResponse,
} from '@simplewebauthn/server'
import { PrismaService } from '../../../prisma.service'
import { UsersService } from '../../../users/users.service'
import { AuthenticationService } from '../authentication.service'
import { WebauthnLoginVerificationDto } from '../dto/webauthn-login-verification.dto'
import { WebauthnRegistrationOptionsDto } from '../dto/webauthn-registration-options.dto'
import { WebauthnRegistrationVerificationDto } from '../dto/webauthn-registration-verification.dto'
import { origin, rpID, rpName } from './webauthn.constansts'

@Injectable()
export class WebauthnService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly usersService: UsersService,
		private readonly authService: AuthenticationService,
	) {}

	async registrationOptions(dto: WebauthnRegistrationOptionsDto) {
		const { email } = dto

		const user = await this.prismaService.user.findUnique({
			where: {
				email,
			},
			include: {
				webauthnDevices: true,
			},
		})

		if (!user) {
			throw new BadRequestException('User not found')
		}

		const registrationOptions = generateRegistrationOptions({
			rpID,
			rpName,
			userID: String(user.id),
			userName: user.email,
			attestationType: 'none',
			excludeCredentials: user.webauthnDevices.map(authenticator => ({
				id: Buffer.from(authenticator.credentialID, 'base64'),
				type: 'public-key',
			})),
			authenticatorSelection: {
				residentKey: 'required',
				userVerification: 'preferred',
			},
		})

		// TODO: redis
		await this.prismaService.user.update({
			where: {
				email,
			},
			data: {
				currentWebauthnChallenge: registrationOptions.challenge,
			},
		})

		return registrationOptions
	}

	async registrationVerification(dto: WebauthnRegistrationVerificationDto) {
		const { email, ...credential } = dto

		const user = await this.prismaService.user.findUnique({
			where: {
				email,
			},
			include: {
				webauthnDevices: true,
			},
		})
		if (!user) {
			throw new BadRequestException('User not found')
		}

		let verification: VerifiedRegistrationResponse

		try {
			verification = await verifyRegistrationResponse({
				response: credential,
				// TODO: from redis
				expectedChallenge: user.currentWebauthnChallenge,
				expectedOrigin: origin,
				expectedRPID: rpID,
				requireUserVerification: true,
			})
		} catch (error) {
			throw new BadRequestException('Error ', error.message)
		}

		const { verified, registrationInfo } = verification

		await this.usersService.addWebauthnDevice({
			counter: registrationInfo.counter,
			credentialID: Buffer.from(registrationInfo.credentialID).toString(
				'base64url',
			),
			credentialPublicKey: registrationInfo.credentialPublicKey,
			userId: user.id,
			transports: credential.response.transports,
		})

		return { verified }
	}

	async loginOptions() {
		const loginOptions = generateAuthenticationOptions({
			userVerification: 'preferred',
		})

		return loginOptions
	}

	async loginVerification(dto: WebauthnLoginVerificationDto) {
		const authenticator = await this.prismaService.webauthnDevice.findUnique({
			where: {
				credentialID: dto.id,
			},
			include: {
				user: true,
			},
		})
		if (!authenticator) {
			throw new BadRequestException('Device not found')
		}

		let verification: VerifiedAuthenticationResponse

		try {
			verification = await verifyAuthenticationResponse({
				response: dto,
				expectedChallenge: dto.challenge,
				expectedOrigin: origin,
				expectedRPID: rpID,
				authenticator: {
					...authenticator,
					// @ts-ignore
					transports: authenticator.transports,
					credentialID: Buffer.from(authenticator.credentialID, 'base64'),
				},
				requireUserVerification: true,
			})
		} catch (error) {
			throw new BadRequestException(error.message)
		}

		const { verified, authenticationInfo } = verification

		if (verified) {
			await this.prismaService.webauthnDevice.update({
				where: { credentialID: dto.id },
				data: {
					counter: authenticationInfo.newCounter,
				},
			})
		}

		return this.authService.generateTokens(authenticator.user)
	}
}
