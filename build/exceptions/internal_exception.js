"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalException = void 0;
const errorhandler_1 = require("./errorhandler");
class InternalException extends errorhandler_1.HttpException {
    constructor(message, errors, errorCode) {
        super(message, 500, errors, errorCode);
    }
}
exports.InternalException = InternalException;
