"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
const errorhandler_1 = require("./errorhandler");
class UnauthorizedException extends errorhandler_1.HttpException {
    constructor(message, errorCode, errors) {
        super(message, 401, errors, errorCode);
    }
}
exports.UnauthorizedException = UnauthorizedException;
