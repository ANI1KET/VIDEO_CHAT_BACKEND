import { ErrorCode, HttpException } from "./errorhandler";

export class NotFoundException extends HttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, 404, null, errorCode);
  }
}
