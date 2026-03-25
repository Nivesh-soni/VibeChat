import express from "express";
import { authController } from "../controllers/auth.controller.js";
const router = express.Router();

router.get('/signup', authController.signupUser)
router.post('/login', authController.loginUser)
router.post('/logout', authController.logoutUser)

export const authRoutes = router;