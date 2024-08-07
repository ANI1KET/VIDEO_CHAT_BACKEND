"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const unauthorized_1 = require("../exceptions/unauthorized");
const errorhandler_1 = require("../exceptions/errorhandler");
const env_variable_1 = require("../env_variable");
const server_1 = require("../server");
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return next(new unauthorized_1.UnauthorizedException("Unauthorized Excess", errorhandler_1.ErrorCode.UNAUTHORIZED));
    }
    try {
        const payload = jwt.verify(token, env_variable_1.JWT_SECRET);
        const user = await server_1.prismaClient.user.findFirst({
            where: { id: payload.userId },
        });
        if (!user)
            return next(new unauthorized_1.UnauthorizedException("Unauthorized Excess", errorhandler_1.ErrorCode.UNAUTHORIZED));
        req.user = user;
        next();
    }
    catch (error) {
        next(new unauthorized_1.UnauthorizedException("Unauthorized Excess", errorhandler_1.ErrorCode.UNAUTHORIZED));
    }
};
exports.default = authMiddleware;
