import cloudunary from "../config/storage.config.js";
import { updateProfilePic } from "../Db/auth.mongo.js";

export const uploadFile = async (profilePic, userId) => {
  const result = await cloudunary.uploader.upload(profilePic);
  const user = await updateProfilePic(userId, result.secure_url);
  return user;
};

export const sendImage = async (image) => {
  const result = await cloudunary.uploader.upload(image);
  return result.secure_url;
};
