import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './response/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FirebaseAdmin } from './auth/firebase.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());

  await FirebaseAdmin.onApplicationBootstrap();

  const config = new DocumentBuilder()
    .addBearerAuth({ type: 'http' })
    .setTitle('Devotel test')
    .setDescription('All apis docs included here')
    .setVersion('1.0')
    .addTag('Devotel')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.APP_PORT);
}
bootstrap();
