import express from "express";
import path from "path";

import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/auth.route.js";
import { messageRoutes } from "./routes/message.route.js";
import { ENV } from "./config/env.config.js";

export const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// console.log(path.join(__dirname, "../Frontend", "dist", "index.html"));
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend", "dist")));
  app.get(/^(?!\/api).+/, (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
