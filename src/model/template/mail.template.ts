import { join } from 'path';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import { projectRoot } from '../../main';

export abstract class MailTemplate {
  public readonly templateName;
  public readonly toEmail;
  public readonly subject;
  public readonly message;

  protected constructor(
    templateName: string,
    toEmail: string,
    subject: string,
    data: any = {},
  ) {
    this.templateName = templateName;
    this.toEmail = toEmail;
    this.subject = subject;
    this.message = this.getMessage(templateName, data);
  }

  private getMessage(templateName: string, data: any = {}): string {
    const templatePath = join(projectRoot(), 'template', `${templateName}.hbs`);

    const source = fs.readFileSync(templatePath, 'utf8');
    const template = Handlebars.compile(source);

    const json = data.toJSON();

    json.baseUrl = this.baseUrl();

    return template(json);
  }

  private baseUrl(): string {
    const url = process.env.XI_BASE_URL;
    const port = process.env.XI_PORT;

    return port === '80' ? url : `${url}:${port}`;
  }
}
