import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';
import { ValidationResponseError } from '../error/validation.response.error';

@Catch(ValidationError)
export class ValidationFilter implements ExceptionFilter {
  catch(error: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const payload = new ValidationResponseError(
      HttpStatus.BAD_REQUEST,
      request.url,
      error,
    );

    response.status(HttpStatus.BAD_REQUEST).json(payload);
  }
}
