import { userModel } from "../models/user.model.js";

export const findByEmail = async (email) => {
  return await userModel.findOne({ email });
};

export const createUser = async (payload) => {
  return await userModel.create(payload);
};

export const findUserById = async (id) => {
  return await userModel.findById(id).select("-password");
};

export const updateProfilePic = async (id, profilePic) => {
  return await userModel.findByIdAndUpdate(id, profilePic, { new: true });
};
