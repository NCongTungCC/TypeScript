import { Router } from "express";
import UserController from "../controllers/user.controller";
import authentication from "../middlewares/authentication.middleware";
import catchAsync from "../middlewares/catchAsync.middleware";
import { premission } from "../middlewares/authorization.middleware";

const router = Router();

router.get('/users', authentication, catchAsync(UserController.getUser));

router.delete('/users/:id', authentication, premission('admin'), catchAsync(UserController.deleteUser));

router.post('/users', authentication, premission('admin'), catchAsync(UserController.createUser));

router.put('/users/:id', authentication, premission('admin'), catchAsync(UserController.updateUser));

export default router;