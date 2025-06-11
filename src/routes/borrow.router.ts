import { Router } from "express";
import BorrowController from "../controllers/borrow.controller";
import authentication from "../middlewares/authentication.middleware";
import { premission } from "../middlewares/authorization.middleware";
import { Role } from "../helpers/constants.helper";

const router = Router();

router.post('/borrow/:id',authentication, BorrowController.borrowBook);

router.put('/return/:id',authentication, BorrowController.returnBook);

router.put('/approve-return/:id',authentication, premission([Role.ADMIN, Role.MANAGER]), BorrowController.approveReturn);

export default router;