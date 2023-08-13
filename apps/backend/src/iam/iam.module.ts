import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { HashingService } from './hashing/hashing.service'
import { BcryptService } from './hashing/bcrypt.service'
import { AuthenticationController } from './authentication/authentication.controller'
import { AuthenticationService } from './authentication/authentication.service'
import { PrismaService } from '../prisma.service'
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
import { OtpAuthenticationService } from './authentication/otp-authentication.service'
import { SessionAuthenticationService } from './authentication/session-authentication.service'
import { SessionAuthenticationController } from './authentication/session-authentication.controller'
import session from 'express-session'
import passport from 'passport'
import { UserSerializer } from './authentication/serializers/user-serializer'
import { Redis } from 'ioredis'
import { WebauthnService } from './authentication/webauthn/webauthn.service'
import RedisStore from 'connect-redis'
import { UsersModule } from '../users/users.module'
import { UsersService } from '../users/users.service'

@Module({
	imports: [
		JwtModule.registerAsync(jwtConfig.asProvider()),
		ConfigModule.forFeature(jwtConfig),
		UsersModule,
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
		OtpAuthenticationService,
		SessionAuthenticationService,
		UserSerializer,
		WebauthnService,
		UsersService,
	],
	controllers: [
		AuthenticationController,
		GoogleAuthenticationController,
		SessionAuthenticationController,
	],
})
export class IamModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				session({
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					//@ts-ignore ok
					store: new RedisStore({ client: new Redis(6379, 'localhost') }),
					secret: process.env.SESSION_SECRET,
					resave: false,
					saveUninitialized: false,
					cookie: {
						sameSite: true,
						httpOnly: true,
					},
				}),
				passport.initialize(),
				passport.session(),
			)
			.forRoutes('*')
	}
}
