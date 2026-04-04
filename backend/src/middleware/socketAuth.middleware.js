import { ENV } from "../config/env.config.js";
import { findUserById } from "../Db/auth.mongo.js";
import { verifyToken } from "../services/jwt.service.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const accessToken = socket.handshake.headers.cookie
      ?.split("; ")
      .find((cookie) => cookie.startsWith("accessToken="))
      ?.split("=")[1];

      if(!accessToken){
        console.log("No token provided");
        return next(new Error("Authentication error: No token provided"));
      }

      const decoded = verifyToken(accessToken);
      if (!decoded) {
        console.log("Invalid token");
        return next(new Error("Authentication error: Invalid token"));
      }

      const user = await findUserById(decoded.id);
      if (!user) {
        console.log("User not found");
        return next(new Error("Authentication error: User not found"));
      }

      socket.user = user
      socket.userId = user._id.toString();
      next();

  } catch (error) {
    console.error("Authentication error:", error);
    return next(new Error("Authentication error: Internal server error"));
  }
};
