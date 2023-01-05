import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

const corsOptions: CorsOptions = {
  origin: 'http://localhost:8902',
  optionsSuccessStatus: 200,
  credentials: true,
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: corsOptions })

  app.use(cookieParser())
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('React PWA API')
    .setDescription('The React PWA API description')
    .setVersion('1.0')
    .addTag('react-pwa')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap().then()
