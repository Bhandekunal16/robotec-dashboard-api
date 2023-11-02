import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { NotificationService } from './notification.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, NotificationService],
})
export class MessageModule {}
