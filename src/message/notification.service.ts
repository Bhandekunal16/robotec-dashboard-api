import { Injectable } from '@nestjs/common';
import axios from 'axios';

const apiUrl = 'https://mailer-service-eight.vercel.app/message/send-email';

@Injectable()
export class NotificationService {
  async sendEmailNotification(to: string, message: string) {
    try {
      const response = await axios.post(apiUrl, { to, message });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error.message || error);
    }
  }
}
