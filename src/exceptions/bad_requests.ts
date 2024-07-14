import { ErrorCode, HttpException } from "./errorhandler";

export class BadRequestsException extends HttpException {
  constructor(message: string, errorCode: ErrorCode, error: any = null) {
    super(message, 400, error, errorCode);
  }
}
