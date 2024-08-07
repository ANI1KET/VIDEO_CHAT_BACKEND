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
exports.me = exports.login = exports.signUp = void 0;
const bcrypt_1 = require("bcrypt");
const jwt = __importStar(require("jsonwebtoken"));
const server_1 = require("../server");
const env_variable_1 = require("../env_variable");
const bad_requests_1 = require("../exceptions/bad_requests");
const errorhandler_1 = require("../exceptions/errorhandler");
const uers_1 = require("../schemas/uers");
const not_found_1 = require("../exceptions/not_found");
const signUp = async (req, res, next) => {
    // try {
    uers_1.SignupSchema.parse(req.body);
    const { email, name, password } = req.body;
    let user = await server_1.prismaClient.user.findFirst({ where: { email } });
    if (user)
        throw new bad_requests_1.BadRequestsException("User already exist", errorhandler_1.ErrorCode.USER_ALREADY_EXIST);
    user = await server_1.prismaClient.user.create({
        data: {
            name,
            email,
            password: (0, bcrypt_1.hashSync)(password, 10),
        },
    });
    res.status(201).json(user);
    //   } catch (error: any) {
    //     return next(
    //       new UnprocessableEntity(
    //         error?.issues,
    //         "Unprocessable Entity",
    //         ErrorCode.UNPROCESSABLE_ENTITY
    //       )
    //     );
    //   }
};
exports.signUp = signUp;
const login = async (req, res, next) => {
    uers_1.LoginSchema.parse(req.body);
    const { email, password } = req.body;
    let user = await server_1.prismaClient.user.findFirst({ where: { email } });
    if (!user)
        throw new not_found_1.NotFoundException("User does not exist", errorhandler_1.ErrorCode.USER_NOT_FOUND);
    if (!(0, bcrypt_1.compareSync)(password, user.password))
        throw new not_found_1.NotFoundException("Incorrect email or password", errorhandler_1.ErrorCode.INCORRECT_EMAIL_PASSWORD);
    const token = jwt.sign({
        userId: user.id,
    }, env_variable_1.JWT_SECRET);
    res.status(201).json({ user, token });
};
exports.login = login;
const me = async (req, res, next) => {
    res.status(200).json(req.user);
};
exports.me = me;
