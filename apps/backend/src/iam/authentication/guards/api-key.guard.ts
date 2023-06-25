import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { REQUEST_USER_KEY } from 'src/iam/iam.constants'
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface'
import { PrismaService } from 'src/prisma.service'
import { ApiKeysService } from '../api-keys.service'

@Injectable()
export class ApiKeyGuard implements CanActivate {
	constructor(
		private readonly apiKeysService: ApiKeysService,
		private readonly prismaService: PrismaService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const apiKey = this.extractKeyFromHeader(request)

		if (!apiKey) {
			throw new UnauthorizedException()
		}

		const apiKeyId = this.apiKeysService.extractIdFromApiKey(apiKey)
		try {
			const apiKeyEntity = await this.prismaService.apiKey.findUnique({
				where: {
					uuid: apiKeyId,
				},
				include: {
					user: {
						include: {
							role: true,
						},
					},
				},
			})
			if (!apiKeyEntity) {
				throw new Error('This api key does not exist')
			}
			const isValid = await this.apiKeysService.validate(
				apiKey,
				apiKeyEntity.key
			)
			if (!isValid) {
				throw new Error('Invalid api key')
			}
			request[REQUEST_USER_KEY] = {
				sub: apiKeyEntity.user.id,
				email: apiKeyEntity.user.email,
				roleId: apiKeyEntity.user.role.id,
			} as ActiveUserData
		} catch (error) {
			throw new UnauthorizedException(error ? error.message : undefined)
		}
		return true
	}

	private extractKeyFromHeader(request: Request) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		const [type, key] = request.headers.authorization?.split(' ') ?? []
		return type === 'ApiKey' ? key : undefined
	}
}
