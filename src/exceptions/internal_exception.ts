import { ErrorCode, HttpException } from "./errorhandler";

export class InternalException extends HttpException {
  constructor(message: string, errors: any, errorCode: ErrorCode) {
    super(message, 500, errors, errorCode);
  }
}
