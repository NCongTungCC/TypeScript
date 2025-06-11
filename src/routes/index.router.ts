import { Router } from "express";
import authRouter from './auth.router';
import userRouter from './user.route';
import bookRouter from './book.router';
import borrowRouter from './borrow.router';

const router = Router();

router.use('/library/api/v1', authRouter);

router.use('/library/api/v1', userRouter);

router.use('/library/api/v1', bookRouter);

router.use('/library/api/v1', borrowRouter);

export default router;
