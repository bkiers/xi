import { ValidationError } from 'sequelize';
import { ErrorType } from './error.type';

export class ValidationResponseError {
  readonly statusCode: number;
  readonly timestamp: string;
  readonly path: string;
  readonly errors: ValidationErrorDetails[];

  constructor(statusCode: number, path: string, error: ValidationError) {
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
    this.path = path;
    this.errors = error.errors.map(
      (e) => new ValidationErrorDetails(e.message, e.path, e.value),
    );
  }
}

export class ValidationErrorDetails {
  readonly errorType = ErrorType.ValidationError;
  readonly message: string;
  readonly field: string;
  readonly value: string;

  constructor(message: string, field: string, value: string) {
    this.message = message;
    this.field = field;
    this.value = value;
  }
}
