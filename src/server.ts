import express, { Express } from "express";
import { PrismaClient } from "@prisma/client";
import { createServer } from "http";
import cors from "cors";

import { PORT } from "./env_variable";
import rootRoute from "./routers/rootRouter";
import { errorMiddleware } from "./middlewares/errors";
import { setupSocketIO } from "./socket";

const app: Express = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    // credentials: true,
  })
);

const sockethttpServer = createServer(app);
setupSocketIO(sockethttpServer);

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", rootRoute);
app.use(errorMiddleware);

sockethttpServer.listen(PORT, () => {
  console.log(`Server Running on Port : ${PORT}`);
});
