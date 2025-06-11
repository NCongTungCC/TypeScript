import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import catchAsync from "../middlewares/catchAsync.middleware";
import authentication from "../middlewares/authentication.middleware";
const router = Router();

router.post('/signup', catchAsync(AuthController.signup));

router.post('/login', catchAsync(AuthController.login));

router.get('/logout', authentication, catchAsync(AuthController.logout));

router.put('/change-password', authentication, catchAsync(AuthController.changePassword));

router.post('/forgot-password', catchAsync(AuthController.forgotPassword));

router.post('/verify-otp', catchAsync(AuthController.verifyOTP));

router.put('/reset-password', catchAsync(AuthController.resetPassword));

export default router;