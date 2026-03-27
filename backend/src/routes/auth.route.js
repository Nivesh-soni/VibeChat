import express from "express";
import { authController } from "../controllers/auth.controller.js";
import { loginRules, signupRules } from "../validators/auth.validator.js";
const router = express.Router();

router.post("/signup", signupRules, authController.signupUser);
router.post("/login", loginRules, authController.loginUser);
router.post("/logout", authController.logoutUser);

export const authRoutes = router;
