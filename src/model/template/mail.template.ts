import { join } from 'path';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import { projectRoot } from '../../main';

export abstract class MailTemplate {
  public readonly templateName: string;
  public readonly toEmail: string[];
  public readonly subject: string;
  public readonly message: string;

  protected constructor(
    templateName: string,
    toEmail: string[],
    subject: string,
    data: any = {},
    ...extraData: [string, any][]
  ) {
    this.templateName = templateName;
    this.toEmail = toEmail;
    this.subject = subject;
    this.message = MailTemplate.getMessage(templateName, data, extraData);
  }

  private static getMessage(
    templateName: string,
    data: any = {},
    extraData: [string, any][],
  ): string {
    const templatePath = join(projectRoot(), 'template', `${templateName}.hbs`);

    const source = fs.readFileSync(templatePath, 'utf8');
    const template = Handlebars.compile(source);

    const json = data.toJSON();

    for (const tuple of extraData) {
      json[tuple[0]] = tuple[1];
    }

    json.baseUrl = process.env.XI_BASE_URL;

    return template(json);
  }
}
