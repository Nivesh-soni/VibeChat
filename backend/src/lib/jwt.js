import jwt from "jsonwebtoken";
import { ENV } from "../config/env.config.js";

export const generateToken = (payload, res) => {
  const { JWT_SECRET, NODE_ENV } = ENV;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("accessToken", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true, // prevent XSS attacks : cross site scripting
    sameSite: "strict", // prevent CSRF attacks
    // http://localhost = development : secure = false
    // https://xyz.com = production : secure = true
    secure: NODE_ENV === "development" ? false : true,
  });

  return token;
};
