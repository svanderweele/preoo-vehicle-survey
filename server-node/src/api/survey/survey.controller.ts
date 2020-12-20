import { Body, Controller, Post } from '@nestjs/common';
import { ResponseGeneric } from '../ResponseGeneric';
import { SurveyIds, SurveyService } from './survey.service';

export interface RequestSubmitSurvey {
  surveyId: SurveyIds;
  data: any;
}

@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  async postSurvey(
    @Body() body: RequestSubmitSurvey,
  ): Promise<ResponseGeneric> {
    await this.surveyService.save(body.surveyId, body.data);

    return { success: 1, message: 'Survey save successfully' };
  }
}
