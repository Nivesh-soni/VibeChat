import { userModel } from "../models/user.model.js";
import { messageModel } from "../models/message.model.js";

export const findContacts = async (loggedInUserId) => {
  return await userModel
    .find({ _id: { $ne: loggedInUserId } })
    .select("-password");
};

export const findMessages = async (myId, userToChatId) => {
  return await messageModel.find({
    $or: [
      { senderId: myId, receiverId: userToChatId },
      { senderId: userToChatId, receiverId: myId },
    ],
  });
};

export const createMessage = async (payload) => {
  return await messageModel.create(payload);
};

export const findPartnersMessage = async (loggedInUserId) => {
  return await messageModel.find({
    $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
  });
};

export const findPartners = async (chatPartnerIds) => {
  return await userModel
    .find({ _id: { $in: chatPartnerIds } })
    .select("-password");
};
