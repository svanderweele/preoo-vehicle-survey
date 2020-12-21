import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class SurveyModule {}
