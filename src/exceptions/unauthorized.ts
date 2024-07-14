import { ErrorCode, HttpException } from "./errorhandler";

export class UnauthorizedException extends HttpException {
  constructor(message: string, errorCode: ErrorCode, errors?: unknown) {
    super(message, 401, errors, errorCode);
  }
}
