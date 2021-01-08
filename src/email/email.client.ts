import { Injectable } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailClient {
  private readonly pathToTemplates: string;

  constructor() {
    this.pathToTemplates = __dirname.endsWith('dist/src/email')
      ? '../../../template'
      : '../../template';
  }

  sendTemplate(templateName: string, data: any = {}): string {
    const templatePath = path.join(
      __dirname,
      this.pathToTemplates,
      `${templateName}.hbs`,
    );

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
