import * as dotenv from 'dotenv';
import { join } from 'path';

// Before we load any of the NestJS classes, be sure to load the configuration
// on which some of the NestJS classes rely.
const environment = process.env.XI_ENV || 'development';
const pathToRoot = __dirname.endsWith('dist/src') ? '../..' : '..';

dotenv.config({
  path: join(__dirname, pathToRoot, 'config', `${environment}.env`),
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Xi')
    .setDescription('The Xi API')
    .setVersion('1.0')
    .addTag('Xi')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  app.useStaticAssets(join(__dirname, pathToRoot, 'public'));
  app.setBaseViewsDir(join(__dirname, pathToRoot, 'views'));
  app.setViewEngine('hbs');

  app.enableCors();
  app.use(cookieParser());

  await app.listen(process.env.XI_PORT);
}

bootstrap();
