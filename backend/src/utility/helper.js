import argon2 from "argon2";

export const generateHash = async (password) => {
  return await argon2.hash(password);
};

export const verifyHash = async (storedPassword, enteredPassword) => {
  return await argon2.verify(storedPassword, enteredPassword);
};