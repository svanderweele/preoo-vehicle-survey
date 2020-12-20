import { Injectable } from '@nestjs/common';
import { CollectionNames, insert } from 'src/utiltiies/DatabaseConnector';
import { SurveyException } from './survey.exception';

export type SurveyIds = 'survey_vehicle_01';

export interface SurveyData {
  age: number;
}

@Injectable()
export class SurveyService {
  async save(surveyId: SurveyIds, surveyData: SurveyData): Promise<boolean> {
    let collectionName: CollectionNames;
    switch (surveyId) {
      case 'survey_vehicle_01':
        collectionName = 'surveys_vehicle01';
        break;

      default:
        throw new SurveyException('SURVEY_NOT_FOUND');
    }

    await insert<SurveyData>(collectionName, surveyData);

    return true;
  }
}
