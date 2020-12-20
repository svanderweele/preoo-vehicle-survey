import { HttpException } from '@nestjs/common';
import { DatabaseErrorCodes } from 'src/api/database/database.types';
import { SurveyErrorCode } from 'src/api/survey/survey.types';

type ErrorCode = DatabaseErrorCodes | SurveyErrorCode | 'MONGO_ERROR';

export class CustomException extends HttpException {
  code: ErrorCode;

  constructor(code: ErrorCode, message: string, status: number) {
    super(message, status);
    this.code = code;
  }
}
