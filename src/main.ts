import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

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

  // TODO app.setBaseViewsDir(join(__dirname, '..', 'views'));
  const publicDirRoot = '/Users/bart/Development/Nest/xi';
  const viewsDirRoot = '/Users/bart/Development/Nest/xi';

  app.useStaticAssets(join(publicDirRoot, 'public'));
  app.setBaseViewsDir(join(viewsDirRoot, 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}

bootstrap();
