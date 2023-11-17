import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'src/common/logger/logger.service';
import { Utils } from 'src/common/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new Logger() });
  app.useGlobalPipes(new ValidationPipe());
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ limit: '10mb', extended: true }));
  app.use(cookieParser());
  await app.listen(Utils.isProd() ? 7002 : 50002);
}
bootstrap();
