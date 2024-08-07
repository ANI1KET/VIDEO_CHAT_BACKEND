"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (error, req, res, next) => {
    res.status(error.statusCode).json({
        message: error.message,
        error: error.errors,
        errorCode: error.errorCode,
    });
};
exports.errorMiddleware = errorMiddleware;
