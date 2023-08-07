import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { REQUEST_USER_KEY } from '../../iam.constants'
import { ActiveUserData } from '../../interfaces/active-user-data.interface'
import { PrismaService } from '../../../prisma.service'
import { Role } from '../../../users/enums/role.enum'
import { ROLES_KEY } from '../decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly prismaService: PrismaService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const contextRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		])

		if (!contextRoles) return true

		const user: ActiveUserData = context.switchToHttp().getRequest()[
			REQUEST_USER_KEY
		]

		for (let index = 0; index < contextRoles.length; index++) {
			try {
				const element = contextRoles[index]

				const { value } = await this.prismaService.role.findUnique({
					where: { id: user.roleId },
				})

				if (element === value) return true
			} catch (error) {
				throw new UnauthorizedException('Cannot check role')
			}
		}

		return false

		// TODO check async in some
		//const res = contextRoles.some(async role => {
		//try {
		//const { value } = await this.prismaService.role.findUnique({
		//where: { id: user.roleId },
		//})
		//console.log(value, role)
		//console.log(value === role)
		//return value === role
		//} catch (error) {
		//throw new UnauthorizedException('Cannot check role')
		//}
		//})
		//console.log(res)

		//return res
	}
}
