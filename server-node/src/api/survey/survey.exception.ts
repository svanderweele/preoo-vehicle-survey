import { HttpStatus } from '@nestjs/common';
import {
  CustomException,
  SurveyErrorCode,
} from 'src/exceptions/CustomException';

export class SurveyException extends CustomException {
  constructor(code: SurveyErrorCode) {
    let message = 'Unknown survey error';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    switch (code) {
      case 'SURVEY_NOT_FOUND':
        message = 'Survey not found';
        status = HttpStatus.NOT_FOUND;
        break;
    }
    super(code, message, status);
  }
}
