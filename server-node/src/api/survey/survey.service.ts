import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CollectionNames } from '../database/database.types';
import { SurveyException } from './survey.exception';
import { SurveyIds } from './survey.types';

@Injectable()
export class SurveyService {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(surveyId: SurveyIds, surveyData: any): Promise<boolean> {
    let collectionName: CollectionNames;
    switch (surveyId) {
      case 'survey_vehicle_01':
        collectionName = 'surveys_vehicle01';
        break;

      default:
        throw new SurveyException('SURVEY_NOT_FOUND');
    }

    await this.databaseService.insert<any>(collectionName, surveyData);

    return true;
  }
}
