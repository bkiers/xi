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

  async sendTemplate(template: MailTemplate) {
    if (this.mailEnabled) {
      const message = {
        to: template.toEmail,
        from: process.env.XI_MAIL_SENDER,
        subject: template.subject,
        html: template.message,
      };

      await SendGrid.send(message);
    } else {
      this.logger.log(
        `Mail disabled, not sending: '${template.templateName}' to '${template.toEmail}'`,
      );
    }
  }
}
