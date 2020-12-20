import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';

@Module({
  controllers: [SurveyController],
  imports: [],
  providers: [SurveyService],
})
export class SurveyModule {}
