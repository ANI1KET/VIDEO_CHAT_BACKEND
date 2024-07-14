import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/errorhandler";

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode).json({
    message: error.message,
    error: error.errors,
    errorCode: error.errorCode,
  });
};
