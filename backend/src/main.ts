import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.use(
    '/static_uploads',
    express.static(join(__dirname, '..', 'static_uploads')),
  );
  await app.listen(3000);
}
bootstrap();
