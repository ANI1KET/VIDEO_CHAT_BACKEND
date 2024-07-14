"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, statusCode, errors, errorCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errors = errors;
        this.errorCode = errorCode;
    }
}
exports.HttpException = HttpException;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["USER_NOT_FOUND"] = 1001] = "USER_NOT_FOUND";
    ErrorCode[ErrorCode["USER_ALREADY_EXIST"] = 1002] = "USER_ALREADY_EXIST";
    ErrorCode[ErrorCode["INCORRECT_EMAIL_PASSWORD"] = 1003] = "INCORRECT_EMAIL_PASSWORD";
    ErrorCode[ErrorCode["UNPROCESSABLE_ENTITY"] = 1004] = "UNPROCESSABLE_ENTITY";
    ErrorCode[ErrorCode["INTERNAL_EXCEPTION"] = 1005] = "INTERNAL_EXCEPTION";
    ErrorCode[ErrorCode["UNAUTHORIZED"] = 1006] = "UNAUTHORIZED";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
