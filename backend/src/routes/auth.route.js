import express from "express";
import { authController } from "../controllers/auth.controller.js";
import { signupRules } from "../validators/auth.validator.js";
const router = express.Router();

router.post('/signup',signupRules, authController.signupUser)
router.post('/login', authController.loginUser)
router.post('/logout', authController.logoutUser)

export const authRoutes = router;