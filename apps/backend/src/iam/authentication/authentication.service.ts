import {
	BadGatewayException,
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { HashingService } from '../hashing/hashing.service'
import { SignInDto } from './dto/sign-in.dto'

@Injectable()
export class AuthenticationService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly hashingService: HashingService
	) {}

	async signUp({ email, password }: Prisma.UserCreateInput) {
		try {
			const user = await this.prismaService.user.create({
				data: {
					email: email,
					password: await this.hashingService.hash(password),
				},
			})

			return user
		} catch (err) {
			throw new BadRequestException('cannot signup')
		}
	}

	async signIn({ password, email }: SignInDto) {
		const user = await this.prismaService.user.findUnique({
			where: {
				email,
			},
		})
		if (!user) {
			throw new UnauthorizedException('User or password is invalid')
		}

		const isEqual = await this.hashingService.compare(password, user.password)
		if (!isEqual) {
			throw new UnauthorizedException('User or password is invalid')
		}

		return true
	}
}
