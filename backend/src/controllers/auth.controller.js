import { createUser, findByEmail } from "../services/auth.mongo.js";
import { generateHash, generateToken } from "../utility/helper.js";

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
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.log(`Error in signup controller: ${err}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res, next) => {
  res.send("Endpoint of Login");
};

const logoutUser = async (req, res, next) => {
  res.send("Endpoint of Logout");
};

export const authController = { signupUser, loginUser, logoutUser };
