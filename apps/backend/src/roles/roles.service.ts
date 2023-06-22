import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { UpdateRoleDto } from './dto/update-role.dto'

@Injectable()
export class RolesService {
	constructor(private readonly prismaService: PrismaService) {}

	async create({ value }: Prisma.RoleCreateInput) {
		try {
			const role = await this.prismaService.role.create({
				data: {
					value,
				},
			})

			return role
		} catch (error) {
			throw new BadRequestException('cannot create role')
		}
	}

	async findAll() {
		try {
			const roles = await this.prismaService.role.findMany()
			return roles
		} catch (error) {
			throw new BadRequestException('cannot get all roles')
		}
	}

	findOne(id: number) {
		return `This action returns a #${id} role`
	}

	update(id: number, updateRoleDto: UpdateRoleDto) {
		return `This action updates a #${id} role`
	}

	remove(id: number) {
		return `This action removes a #${id} role`
	}
}
