import { HttpException } from '@nestjs/common';

export type DatabaseErrorCodes = 'DATABASE_CONNECTION_ERROR';
export type SurveyErrorCode = 'SURVEY_NOT_FOUND';

type ErrorCode = DatabaseErrorCodes | SurveyErrorCode | 'MONGO_ERROR';

export class CustomException extends HttpException {
  code: ErrorCode;

  constructor(code: ErrorCode, message: string, status: number) {
    super(message, status);
    this.code = code;
  }
}
