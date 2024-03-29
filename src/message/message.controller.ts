import { Controller, Post, Body, Logger } from '@nestjs/common';

import { NotificationService } from './notification.service';

@Controller('message')
export class MessageController {
  constructor(private notification: NotificationService) {}

  @Post('send-email')
  async sendEmailNotification(@Body() body: { to: string; message: string }) {
    try {
      const { to, message } = body;
      await this.notification.sendEmailNotification(to, message);
      return { success: true, message: 'Email notification request received' };
    } catch (error) {
      Logger.error(error);
      return { success: false, error: 'Failed to send email notification' };
    }
  }
}
