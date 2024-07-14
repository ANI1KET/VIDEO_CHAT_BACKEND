import { Request, NextFunction, Response } from "express";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";

import { prismaClient } from "../server";
import { JWT_SECRET } from "../env_variable";
import { BadRequestsException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/errorhandler";
import { LoginSchema, SignupSchema } from "../schemas/uers";
import { NotFoundException } from "../exceptions/not_found";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // try {
  SignupSchema.parse(req.body);
  const { email, name, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (user)
    throw new BadRequestsException(
      "User already exist",
      ErrorCode.USER_ALREADY_EXIST
    );

  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  LoginSchema.parse(req.body);
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (!user)
    throw new NotFoundException(
      "User does not exist",
      ErrorCode.USER_NOT_FOUND
    );

  if (!compareSync(password, user.password))
    throw new NotFoundException(
      "Incorrect email or password",
      ErrorCode.INCORRECT_EMAIL_PASSWORD
    );

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  res.status(201).json({ user, token });
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(req.user);
};
