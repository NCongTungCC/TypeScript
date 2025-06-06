import { Router } from "express";
import AuthController from "../auth/auth.controller";
import catchAsync from "../middlewares/catchAsync.middleware";
import authentication from "../middlewares/authentication.middleware";
const router = Router();

router.post('/signup', catchAsync(AuthController.signup));

router.post('/login', catchAsync(AuthController.login));

router.get('/logout', authentication, catchAsync(AuthController.logout));

router.put('/changepass', authentication, catchAsync(AuthController.changePasswod));

router.post('/forgotpassword', catchAsync(AuthController.forgotPassword));

router.post('/verifyotp', catchAsync(AuthController.verifyOTP));

router.post('/resetpassword', catchAsync(AuthController.resetPassword));

export default router;