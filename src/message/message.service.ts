import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import mailerConfig from './mailer.config';

@Injectable()
export class MessageService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(mailerConfig.transport);
  }

  async sendEmail(to: string, subject: string, text: string, html: string) {
    const mailOptions = {
      from: mailerConfig.transport.auth.user,
      to,
      subject,
      text,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }
  }
}
