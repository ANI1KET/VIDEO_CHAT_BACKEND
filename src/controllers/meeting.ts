import { Request, NextFunction, Response } from "express";

import { prismaClient } from "../server";
import { MeetingSchema } from "../schemas/uers";
import { BadRequestsException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/errorhandler";
import { NotFoundException } from "../exceptions/not_found";

export const meeting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  MeetingSchema.parse(req.query.meetingId);
  //   const data = req.query.meetingId;
  //   console.log(data)
  //   const { email, name, password } = req.body;

  //   let user = await prismaClient.user.findFirst({ where: { email } });

  //   if (user)
  //     throw new BadRequestsException(
  //       "User already exist",
  //       ErrorCode.USER_ALREADY_EXIST
  //     );

  //   user = await prismaClient.user.create({
  //     data: {
  //       name,
  //       email,
  //       password: hashSync(password, 10),
  //     },
  //   });

  //   res.status(201).json(user);
};
