import { Module } from '@nestjs/common'
import { HashingService } from './hashing/hashing.service'
import { BcryptService } from './hashing/bcrypt.service'
import { AuthenticationController } from './authentication/authentication.controller'
import { AuthenticationService } from './authentication/authentication.service'
import { PrismaService } from 'src/prisma.service'
import { JwtModule } from '@nestjs/jwt'
import jwtConfig from './config/jwt.config'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { AccessTokenGuard } from './authentication/guards/access-token.guard'
import { AuthenticationGuard } from './authentication/guards/authentication.guard'
import { RefreshTokenIdsStorage } from './authentication/refresh-token-ids.storage'
import { RolesGuard } from './authorization/guards/roles.guard'
import { ApiKeysService } from './authentication/api-keys.service'
import { ApiKeyGuard } from './authentication/guards/api-key.guard'
import { GoogleAuthenticationService } from './authentication/social/google-authentication.service'
import { GoogleAuthenticationController } from './authentication/social/google-authentication.controller'

@Module({
	imports: [
		JwtModule.registerAsync(jwtConfig.asProvider()),
		ConfigModule.forFeature(jwtConfig),
	],
	providers: [
		{
			provide: HashingService,
			useClass: BcryptService,
		},
		{
			provide: APP_GUARD,
			useClass: AuthenticationGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
		AccessTokenGuard,
		ApiKeyGuard,
		AuthenticationService,
		PrismaService,
		RefreshTokenIdsStorage,
		ApiKeysService,
		GoogleAuthenticationService,
	],
	controllers: [AuthenticationController, GoogleAuthenticationController],
})
export class IamModule {}
