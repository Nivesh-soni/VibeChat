import express from "express";
// import multer from "multer";
import { authController } from "../controllers/auth.controller.js";
import { loginRules, signupRules } from "../validators/auth.validator.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
const router = express.Router();

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

router.use(arcjetProtection);

router.post("/signup", signupRules, authController.signupUser);
router.post("/login", loginRules, authController.loginUser);
router.post("/logout", authController.logoutUser);

router.get("/getProfile", protectRoute, (req, res) =>
  res.status(200).json(req.user),
);

router.put(
  "/update-profile",
  protectRoute,
  //   upload.single("profilePic"),
  authController.updateProfile,
);

export const authRoutes = router;
