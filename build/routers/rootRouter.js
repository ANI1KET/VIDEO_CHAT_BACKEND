"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const meeting_1 = __importDefault(require("./meeting"));
const rootRoute = (0, express_1.Router)();
rootRoute.use("/auth", auth_1.default);
rootRoute.use("/meeting", meeting_1.default);
exports.default = rootRoute;
