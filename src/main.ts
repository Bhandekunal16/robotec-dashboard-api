import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { logger } from './interface/Logger';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
logger.log('host :' + process.env.LOCALHOST);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const server = createServer(app.getHttpAdapter().getInstance());

  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3001',
      methods: ['GET', 'POST'],
    },
  });

  io.attach(server);

  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  app.useWebSocketAdapter(new IoAdapter(io));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.LOCALHOST);
}
bootstrap();
