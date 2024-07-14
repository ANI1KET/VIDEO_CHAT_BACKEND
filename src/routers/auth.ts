import { Router } from "express";

import { login, me, signUp } from "../controllers/auth";
import { errorHandler } from "../utils/error_handler";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

const authRoutes: Router = Router();

authRoutes.post("/signup", errorHandler(signUp));
authRoutes.post("/login", errorHandler(login));
authRoutes.get("/me", [authMiddleware], errorHandler(me));
// authRoutes.get("/me", [authMiddleware, adminMiddleware], errorHandler(me));

export default authRoutes;
