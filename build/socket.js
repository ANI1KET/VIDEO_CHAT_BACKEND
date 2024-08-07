"use strict";
// import { Server as SocketIOServer, Socket } from "socket.io";
// import { Server as SockethttpServer } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocketIO = void 0;
// export const setupSocketIO = (httpServer: SockethttpServer) => {
//   const io = new SocketIOServer(httpServer, {
//     cors: {
//       origin: "http://localhost:3000",
//       methods: ["GET", "POST"],
//       // credentials: true,
//     },
//     // transports: ["websocket"],
//   });
//   // const connectedUser: { userName: string; socketId: string }[] = [];
//   io.on("connection", (socket: Socket) => {
//     console.log("User Connected ", socket.id);
//     const { meetingId } = socket.handshake.query as {
//       meetingId?: string;
//     };
//     if (!meetingId) {
//       return socket.disconnect(true);
//     }
//     const room = io.sockets.adapter.rooms.get(meetingId);
//     if (!room) {
//       socket.join(meetingId);
//     } else if (room?.size == 1) {
//       socket.join(meetingId);
//       socket.broadcast.to(meetingId).emit("User_Joined");
//     }
//     socket.on(
//       "WebRTCSetUp",
//       ({ message, meetingId }: { message: string; meetingId: string }) => {
//         socket
//           .to(meetingId)
//           .emit("WebRTCSetUp", { message: message, meetingId });
//       }
//     );
//     socket.on("disconnect", () => {
//       console.log("User disconnected:", socket.id);
//     });
//   });
//   return io;
// };
const socket_io_1 = require("socket.io");
const setupSocketIO = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            // credentials: true,
        },
        // transports: ["websocket"],
    });
    io.on("connection", (socket) => {
        console.log("User Connected ", socket.id);
        const { username, meetingId } = socket.handshake.query;
        if (!username || !meetingId) {
            return socket.disconnect(true);
        }
        // console.log(socket.rooms.size);
        const room = io.sockets.adapter.rooms.get(meetingId);
        if (!room) {
            socket.join(meetingId);
        }
        else {
            // const roomSize = room?.size;
            socket.join(meetingId);
            socket.broadcast.to(meetingId).emit("Notify_User", {
                userName: username,
                socketId: socket.id,
            });
            const roomInfo = Array.from(room);
            const connectedUser = [];
            for (const socketId of roomInfo) {
                if (socketId !== socket.id)
                    connectedUser.push({
                        userName: io.sockets.sockets.get(socketId)?.handshake.query
                            .username,
                        socketId: socketId,
                    });
            }
            // roomInfo.forEach((roomUserInfo) => {
            //   if (roomUserInfo !== socket.id)
            //     connectedUser.push({
            //       userName: io.sockets.sockets.get(roomUserInfo)?.handshake.query
            //         .username as string,
            //       socketId: roomUserInfo,
            //     });
            // });
            socket.emit("Connected_User", connectedUser);
            connectedUser.length = 0;
        }
        socket.on("SDPSetUp", ({ message, socketId }) => {
            console.log(Object.keys(JSON.parse(message))[0]);
            socket
                .to(socketId)
                .emit("SDPSetUp", { message: message, from: socket.id });
        });
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
            socket.broadcast.to(meetingId).emit("Notify_User_Disconnect", socket.id);
            socket.leave(meetingId);
        });
    });
    return io;
};
exports.setupSocketIO = setupSocketIO;
