import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { logger } from 'src/interface/Logger';

const apiUrl = 'https://mailer-service-eight.vercel.app/message/send-email';

@Injectable()
export class NotificationService {
  async sendEmailNotification(to: string, message: string) {
    try {
      await axios.post(apiUrl, { to, message });
    } catch (error) {
      logger.error(error.message || error);
    }
  }
}
