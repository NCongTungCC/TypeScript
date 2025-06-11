import { Router } from "express";
import BorrowController from "../controllers/borrow.controller";
import authentication from "../middlewares/authentication.middleware";
import { premission } from "../middlewares/authorization.middleware";
import { Role } from "../helpers/constants.helper";
import catchAsync from "../middlewares/catchAsync.middleware";

const router = Router();

router.post('/books/:id/borrow',authentication, catchAsync(BorrowController.borrowBook));

router.put('/books/:id/return',authentication, catchAsync(BorrowController.returnBook));

router.put('/books/:id/approve-return',authentication, premission([Role.ADMIN, Role.MANAGER]), catchAsync(BorrowController.approveReturn));

router.get('/my-books', authentication, catchAsync(BorrowController.getBorrowedBooks));

export default router;