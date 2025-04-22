import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) =>
        new BadRequestException(JSON.stringify(errors)),
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(process.env.LISTENING_PORT ?? 3000);
}
bootstrap();
