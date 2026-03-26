import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const generateHash = async (password) => {
  return await argon2.hash(password);
};

export const verifyHash = async (storedPassword, enteredPassword) => {
  return await argon2.verify(storedPassword, enteredPassword);
};

export const generateToken = (payload, res) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("accessToken", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true, // prevent XSS attacks : cross site scripting
    sameSite: "strict", // prevent CSRF attacks
    // http://localhost = development : secure = false
    // https://xyz.com = production : secure = true
    secure: process.env.NODE_ENV === "development" ? false : true,
  });

  return token;
};
