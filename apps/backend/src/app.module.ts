import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoffeesModule } from './coffees/coffees.module'
import { UsersModule } from './users/users.module'
import { IamModule } from './iam/iam.module'
import { ConfigModule } from '@nestjs/config'
import { RolesModule } from './roles/roles.module';

@Module({
	imports: [ConfigModule.forRoot(), CoffeesModule, UsersModule, IamModule, RolesModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
