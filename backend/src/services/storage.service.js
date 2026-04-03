import cloudinary from "../config/storage.config.js";
import { findUserById, updateProfilePic } from "../Db/auth.mongo.js";

export const uploadFile = async (profilePic, userId) => {
  const user = await findUserById(userId);

  if (user?.profilePic) {
    try {
      const publicId = user.profilePic.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
      console.log("Old image deleted from Cloudinary");
    } catch (error) {
      console.error("Error deleting old image:", error);
    }
  }
  const result = await cloudinary.uploader.upload(profilePic);
  const updatedUser = await updateProfilePic(userId, result.secure_url);
  // console.log(result);
  return updatedUser;
};

export const sendImage = async (image) => {
  const result = await cloudinary.uploader.upload(image);
  return result.secure_url;
};
