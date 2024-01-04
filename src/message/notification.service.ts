import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

const apiUrl = 'https://mailer-service-eight.vercel.app/message/send-email';

@Injectable()
export class NotificationService {
  async sendEmailNotification(to: string, message: string) {
    try {
      await axios.post(apiUrl, { to, message });
    } catch (error) {
      Logger.error('Error:', error.message || error);
    }
  }
}
