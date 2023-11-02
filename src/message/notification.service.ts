// notification.service.ts

import { Injectable } from '@nestjs/common';
import { MessageService } from './message.service';

@Injectable()
export class NotificationService {
  constructor(private readonly emailService: MessageService) {}

  async sendEmailNotification(to: string, message: string) {
    try {
      const subject = 'Robotic';
      const text = message;
      const html = `<p>${message}</p>`;

      if (text !== undefined) {
        await this.emailService.sendEmail(to, subject, text, html);
        return {
          success: true,
          message: 'Email notification sent successfully',
        };
      } else return {status: true, message: 'email not send due to message'}
    } catch (error) {
      return { res: error, status: false, msg: 'error' };
    }
  }
}
