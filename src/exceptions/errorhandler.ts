export class HttpException extends Error {
  message: string;
  statusCode: number;
  errors: any;
  errorCode: ErrorCode;

  constructor(
    message: string,
    statusCode: number,
    errors: any,
    errorCode: ErrorCode
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
    this.errorCode = errorCode;
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXIST = 1002,
  INCORRECT_EMAIL_PASSWORD = 1003,
  UNPROCESSABLE_ENTITY = 1004,
  INTERNAL_EXCEPTION = 1005,
  UNAUTHORIZED = 1006,
}
