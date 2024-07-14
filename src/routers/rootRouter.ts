import { Router } from "express";
import authRoutes from "./auth";
import meetRoutes from "./meeting";

const rootRoute: Router = Router();

rootRoute.use("/auth", authRoutes);
rootRoute.use("/meeting", meetRoutes);

export default rootRoute;
