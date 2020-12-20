import { HttpStatus } from '@nestjs/common';
import { CustomException, DatabaseErrorCodes } from './CustomException';

export default class DatabaseException extends CustomException {
  constructor(code: DatabaseErrorCodes) {
    let message = 'Unknown database exception occurred';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (code) {
      case 'DATABASE_CONNECTION_ERROR':
        message = 'Error connecting to database';
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
    }

    super(code, message, status);
  }
}
