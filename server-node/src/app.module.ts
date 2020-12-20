import { Module } from '@nestjs/common';
import { SurveyModule } from './api/survey/survey.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SurveyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
