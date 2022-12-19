import { ConfigService } from '@nestjs/config/dist';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      //genera automaticamente instancias de los dto
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port);

  console.log(`listening on port ${port} ( ͡~ ͜ʖ ͡°)`);
}
bootstrap();
