import {
  findContacts,
  findMessages,
  createMessage,
  findPartners,
  findPartnersMessage,
} from "../Db/messages.mongo.js";
import { sendImage } from "../services/storage.service.js";

const getAllContacts = async (req, res, next) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await findContacts(loggedInUserId);
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getAllContacts:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getMessagesByUserId = async (req, res, next) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;
    const messages = await findMessages(myId, userToChatId);

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessagesByUserId:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const sendMessage = async (req, res, next) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      imageUrl = await sendImage(image);
    }

    const newMessage = await createMessage({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getChatPartners = async (req, res, next) => {
  try {
    const loggedInUserId = req.user._id;
    const messages = await findPartnersMessage(loggedInUserId);

    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString(),
        ),
      ),
    ];

    const chatPartners = await findPartners(chatPartnerIds);

    res.status(200).json(chatPartners);
  } catch (error) {
    console.error("Error in getChatPartners:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const messageController = {
  getAllContacts,
  getChatPartners,
  getMessagesByUserId,
  sendMessage,
};
