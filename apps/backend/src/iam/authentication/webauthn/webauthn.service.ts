import { BadRequestException, Injectable } from '@nestjs/common'
import {
	VerifiedRegistrationResponse,
	generateRegistrationOptions,
	verifyRegistrationResponse,
} from '@simplewebauthn/server'
import { PrismaService } from '../../../prisma.service'
import { WebauthnRegistrationOptionsDto } from '../dto/webauthn-registration-options.dto'
import { WebauthnRegistrationVerificationDto } from '../dto/webauthn-registration-verification.dto'
import { origin, rpID, rpName } from './webauthn.constansts'
import { UsersService } from '../../../users/users.service'

@Injectable()
export class WebauthnService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly usersService: UsersService,
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
			credentialID: registrationInfo.credentialID.toString(),
			credentialPublicKey: registrationInfo.credentialPublicKey,
			userId: user.id,
		})

		return { verified }
	}
}
