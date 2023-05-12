import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './env/enverment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  await app.listen(environment.serverPort);
}
bootstrap();
