"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const errorhandler_1 = require("./errorhandler");
class NotFoundException extends errorhandler_1.HttpException {
    constructor(message, errorCode) {
        super(message, 404, null, errorCode);
    }
}
exports.NotFoundException = NotFoundException;
