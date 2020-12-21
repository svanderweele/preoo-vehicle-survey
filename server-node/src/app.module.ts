import { Module } from '@nestjs/common';
import { DatabaseModule } from './api/database/database.module';
import { SurveyModule } from './api/survey/survey.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SurveyModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.development'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
