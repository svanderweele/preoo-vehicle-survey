import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//TODO: Logging of exceptions
//TODO: Rename Exception classes

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
