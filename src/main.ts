import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger3 } from './logger/logger3.middleware';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger3);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
