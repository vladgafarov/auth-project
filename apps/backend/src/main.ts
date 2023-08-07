import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.use(cookieParser())
	app.enableCors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
	app.useGlobalPipes(new ValidationPipe())

	const config = new DocumentBuilder()
		.setTitle('Auth project')
		.setDescription('Api for auth project')
		.setVersion('1.0')
		.build()
	//@ts-ignore
	const document = SwaggerModule.createDocument(app, config)
	//@ts-ignore
	SwaggerModule.setup('api', app, document)

	await app.listen(3001)
}
bootstrap()
