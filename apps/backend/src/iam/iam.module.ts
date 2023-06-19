import { Module } from '@nestjs/common'
import { HashingService } from './hashing/hashing.service'
import { BcryptService } from './hashing/bcrypt.service'
import { AuthenticationController } from './authentication/authentication.controller'
import { AuthenticationService } from './authentication/authentication.service'
import { PrismaService } from 'src/prisma.service'

@Module({
	providers: [
		{
			provide: HashingService,
			useClass: BcryptService,
		},
		AuthenticationService,
		PrismaService,
	],
	controllers: [AuthenticationController],
})
export class IamModule {}
