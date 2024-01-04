// chat.gateway.ts
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() server: Server;
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string) {
    this.server.emit('message', data);
  }
}
