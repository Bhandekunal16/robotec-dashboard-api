import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { NotificationService } from './notification.service';

@Module({
  controllers: [MessageController],
  providers: [NotificationService],
})
export class MessageModule {}
