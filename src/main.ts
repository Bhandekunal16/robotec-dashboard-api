import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
require('dotenv').config();
Logger.log('host :' + process.env.LOCALHOST, 'main.ts');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  await app.listen(process.env.LOCALHOST);
}
bootstrap();
