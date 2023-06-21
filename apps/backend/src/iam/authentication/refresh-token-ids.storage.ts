import {
	Injectable,
	OnApplicationBootstrap,
	OnApplicationShutdown,
} from '@nestjs/common'
import { Redis } from 'ioredis'

export class InvalidatedRefreshTokenError extends Error {}

@Injectable()
export class RefreshTokenIdsStorage
	implements OnApplicationBootstrap, OnApplicationShutdown
{
	private redisClient: Redis

	onApplicationBootstrap() {
		// TODO: move to dedicated redis module
		this.redisClient = new Redis({
			host: 'localhost',
			port: 6379,
		})
	}

	onApplicationShutdown() {
		return this.redisClient.quit()
	}

	async insert(userId: number, tokenId: string) {
		await this.redisClient.set(this.getKey(userId), tokenId)
	}

	async validate(userId: number, tokenId: string) {
		const storedId = await this.redisClient.get(this.getKey(userId))
		if (storedId !== tokenId) {
			throw new InvalidatedRefreshTokenError()
		}
		return storedId === tokenId
	}

	async invalidate(userId: number) {
		await this.redisClient.del(this.getKey(userId))
	}

	private getKey(userId: number) {
		return `user-${userId}`
	}
}
