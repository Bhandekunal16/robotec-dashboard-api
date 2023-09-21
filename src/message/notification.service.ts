// notification.service.ts

import { Injectable } from '@nestjs/common';
import { MessageService } from './message.service';

@Injectable()
export class NotificationService {
  constructor(private readonly emailService: MessageService) {}

  async sendEmailNotification(to: string, message: string) {
    try {
      // Define email subject and content
      const subject = 'Robotic';
      const text = message;
      const html = `<p>${message}</p>`;

      // Send the email notification
      await this.emailService.sendEmail(to, subject, text, html);

      return { success: true, message: 'Email notification sent successfully' };
    } catch (error) {
      // Handle email sending errors
      throw error;
    }
  }
}
