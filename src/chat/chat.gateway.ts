// chat.gateway.ts
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(
    client: any,
    payload: { sender: string; message: string },
  ): void {
    this.server.emit('message', payload);
  }
}
