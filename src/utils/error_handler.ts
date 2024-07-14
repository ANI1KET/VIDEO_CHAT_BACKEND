import { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpException } from "../exceptions/errorhandler";
import { InternalException } from "../exceptions/internal_exception";
import { ZodError } from "zod";
import { BadRequestsException } from "../exceptions/bad_requests";

export const errorHandler = (func: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error: any) {
      let exception: HttpException;
      if (error instanceof HttpException) exception = error;
      else if (error instanceof ZodError)
        exception = new BadRequestsException(
          "Unprocessable Entity",
          ErrorCode.UNPROCESSABLE_ENTITY,
          error
        );
      else
        exception = new InternalException(
          "Something went wrong!",
          error,
          ErrorCode.INTERNAL_EXCEPTION
        );
      next(exception);
    }
  };
};
