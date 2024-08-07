"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meeting = void 0;
const uers_1 = require("../schemas/uers");
const meeting = async (req, res, next) => {
    uers_1.MeetingSchema.parse(req.query.meetingId);
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
exports.meeting = meeting;
