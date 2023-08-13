import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async addWebauthnDevice({
		counter,
		credentialID,
		credentialPublicKey,
		userId,
	}: {
		credentialID: string
		credentialPublicKey: Uint8Array
		counter: number
		userId: number
	}) {
		try {
			const device = await this.prismaService.webauthnDevice.create({
				data: {
					credentialID,
					credentialPublicKey: Buffer.from(credentialPublicKey),
					counter,
					userId,
				},
			})

			return device
		} catch (error) {
			throw new BadRequestException('Cannot add device')
		}
	}

	create(createUserDto: CreateUserDto) {
		return 'This action adds a new user'
	}

	findAll() {
		return `This action returns all users`
	}

	findOne(id: number) {
		return `This action returns a #${id} user`
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`
	}

	remove(id: number) {
		return `This action removes a #${id} user`
	}
}
