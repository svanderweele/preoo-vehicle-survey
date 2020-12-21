import { Module } from '@nestjs/common';
import { DatabaseModule } from './api/database/database.module';
import { SurveyModule } from './api/survey/survey.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SurveyModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
