"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorhandler_1 = require("../exceptions/errorhandler");
const internal_exception_1 = require("../exceptions/internal_exception");
const zod_1 = require("zod");
const bad_requests_1 = require("../exceptions/bad_requests");
const errorHandler = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        }
        catch (error) {
            let exception;
            if (error instanceof errorhandler_1.HttpException)
                exception = error;
            else if (error instanceof zod_1.ZodError)
                exception = new bad_requests_1.BadRequestsException("Unprocessable Entity", errorhandler_1.ErrorCode.UNPROCESSABLE_ENTITY, error);
            else
                exception = new internal_exception_1.InternalException("Something went wrong!", error, errorhandler_1.ErrorCode.INTERNAL_EXCEPTION);
            next(exception);
        }
    };
};
exports.errorHandler = errorHandler;
