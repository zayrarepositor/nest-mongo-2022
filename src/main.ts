import { ConfigService } from '@nestjs/config';

import { ValidationPipe } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get(ConfigService);

  const port = configService.get('port');

  await app.listen(port);

  console.log(`listening on port ${port} ( ͡~ ͜ʖ ͡°)`);
}
bootstrap();
