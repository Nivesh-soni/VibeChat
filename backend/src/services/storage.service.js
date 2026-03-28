import cloudunary from "../config/storage.config.js";
import { updateProfilePic } from "./auth.mongo.js";

export const uploadFile = async (profilePic, userId) => {
  const result = await cloudunary.uploader.upload(profilePic);
  const user = await updateProfilePic(userId, result.secure_url);
  return user
};
