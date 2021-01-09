import { Injectable, Logger } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import { MailTemplate } from '../model/template/mail.template';

@Injectable()
export class EmailClient {
  private readonly logger = new Logger(EmailClient.name);
  private readonly mailEnabled: boolean;

  constructor() {
    SendGrid.setApiKey(process.env.XI_SENDGRID_API_KEY);
    this.mailEnabled = process.env.XI_MAIL_ENABLED === 'true';
  }

  async send(toEmail: string, subject: string, html: string) {
    if (this.mailEnabled) {
      const message = {
        to: toEmail,
        from: process.env.XI_MAIL_SENDER,
        subject: subject,
        html: html,
      };

      await SendGrid.send(message);
    } else {
      const summary = html.replace(
        /^[\s\S]*<!-- START MAIN CONTENT AREA -->|<!-- END MAIN CONTENT AREA -->[\s\S]*$/g,
        '',
      );

      this.logger.log(
        `Mail disabled, not sending '${subject}' to '${toEmail}': \n${summary}`,
      );
    }
  }

  async sendTemplate(template: MailTemplate) {
    await this.send(template.toEmail, template.subject, template.message);
  }
}
