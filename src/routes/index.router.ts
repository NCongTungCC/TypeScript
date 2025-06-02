import { Router } from "express";
import authRouter from './auth.router';
import userRouter from './user.route';

const router = Router();

router.use('/library/api/v1', authRouter);

router.use('/library/api/v1', userRouter);

export default router;
