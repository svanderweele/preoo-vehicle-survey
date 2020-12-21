import { Body, Controller, Post } from '@nestjs/common';
import { ResponseGeneric } from '../ResponseGeneric';
import { SurveyService } from './survey.service';
import { SurveyIds } from './survey.types';

export interface RequestSubmitSurvey {
  surveyId: SurveyIds;
  groupId: number;
  data: any;
}

@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  async postSurvey(
    @Body() body: RequestSubmitSurvey,
  ): Promise<ResponseGeneric> {
    await this.surveyService.save(body.surveyId, body.groupId, body.data);

    return { success: 1, message: 'Survey save successfully' };
  }
}
