import express from "express"
import { loginValidation, signupValidation, otpValidation } from "../middlewares/authValidation.js";
import { login, signup, verifyOTP } from "../controllers/authController.js";

const router = express.Router();

router.post('/signup', signupValidation, signup);

router.post('/login', loginValidation, login);

router.post('/verify-otp', otpValidation, verifyOTP);

export default router