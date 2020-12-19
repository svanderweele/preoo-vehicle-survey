import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "./utiltiies/DatabaseConnector"

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
