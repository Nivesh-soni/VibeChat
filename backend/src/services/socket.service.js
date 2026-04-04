import { Server } from "socket.io";
import { ENV } from "../config/env.config.js";
import { socketAuthMiddleware } from "../middleware/socketAuth.middleware.js";

export const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [ENV.CLIENT_URL],
      credentials: true,
    },
  });

  io.use(socketAuthMiddleware);

  const usersocketMap = {}; 
  io.on("connection", (socket) => {
    console.log("New client connected:", socket?.user?.userName);
    const userId = socket.userId;
    usersocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(usersocketMap));

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket?.user?.userName);
      delete usersocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(usersocketMap));
    });
  });

  return io;
};
