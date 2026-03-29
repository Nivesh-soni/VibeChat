import { ENV } from "../config/env.config.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { generateToken } from "../services/jwt.service.js";
import { createUser, findByEmail } from "../Db/auth.mongo.js";
import { generateHash, verifyHash } from "../utility/helper.js";
import { uploadFile } from "../services/storage.service.js";

const signupUser = async (req, res, next) => {
  const { userName, email, password } = req.body;
  try {
    const isUserExist = await findByEmail(email);

    if (isUserExist) {
      return res.status(409).json({ message: "User Already Exist" });
    }
    const hashedPassword = await generateHash(password);
    const newUser = await createUser({
      userName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const token = generateToken({ id: newUser._id }, res);
      res.status(201).json({
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });

      try {
        await sendWelcomeEmail(newUser.email, newUser.userName, ENV.CLIENT_URL);
      } catch (error) {
        console.log("Failed to send welcome email:", error);
      }
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.error(`Error in signup controller: ${err}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await verifyHash(user.password, password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ id: user._id }, res);
    res.status(201).json({
      id: user._id,
      userName: user.userName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.error(`Error in login controller: ${err}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logoutUser = async (_, res, next) => {
  const { NODE_ENV } = ENV;
  res.clearCookie("accessToken", {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: NODE_ENV === "development" ? false : true,
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }
    const userId = req.user._id;
    const updatedUser = await uploadFile(profilePic, userId);

    res
      .status(200)
      .json({ message: "profile pic updated successfully" }, updatedUser);
  } catch (error) {
    console.error("Error in update peofile pic:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const authController = {
  signupUser,
  loginUser,
  logoutUser,
  updateProfile,
};
