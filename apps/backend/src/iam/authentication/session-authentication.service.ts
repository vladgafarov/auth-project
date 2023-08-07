import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { HashingService } from '../hashing/hashing.service'
import { SignInDto } from './dto/sign-in.dto'

@Injectable()
export class SessionAuthenticationService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly hashingService: HashingService,
	) {}

	async signIn({ password, email }: SignInDto) {
		const user = await this.prismaService.user.findUnique({
			where: {
				email,
			},
			include: {
				role: true,
			},
		})
		if (!user) {
			throw new UnauthorizedException('User or password is invalid')
		}

		const isEqual = await this.hashingService.compare(password, user.password)
		if (!isEqual) {
			throw new UnauthorizedException('User or password is invalid')
		}

		return user
	}
}
