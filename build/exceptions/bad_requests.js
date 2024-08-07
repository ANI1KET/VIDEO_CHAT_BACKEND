"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestsException = void 0;
const errorhandler_1 = require("./errorhandler");
class BadRequestsException extends errorhandler_1.HttpException {
    constructor(message, errorCode, error = null) {
        super(message, 400, error, errorCode);
    }
}
exports.BadRequestsException = BadRequestsException;
