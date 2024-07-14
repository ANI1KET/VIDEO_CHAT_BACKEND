import { Router } from "express";

import { meeting } from "../controllers/meeting";
import { errorHandler } from "../utils/error_handler";
// import authMiddleware from "../middlewares/auth";
// import adminMiddleware from "../middlewares/admin";

const meetRoutes: Router = Router();

meetRoutes.post("/", errorHandler(meeting));

export default meetRoutes;
