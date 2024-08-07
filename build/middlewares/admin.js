"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unauthorized_1 = require("../exceptions/unauthorized");
const errorhandler_1 = require("../exceptions/errorhandler");
const adminMiddleware = async (req, res, next) => {
    const user = req.user;
    if (user.role === "ADMIN")
        next();
    else
        next(new unauthorized_1.UnauthorizedException("Unauthorized Excess", errorhandler_1.ErrorCode.UNAUTHORIZED));
};
exports.default = adminMiddleware;
