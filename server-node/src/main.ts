import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//TODO: Logging of exceptions
//TODO: Rename Exception classes
//TODO: Documentation
//TODO: Log requests

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
