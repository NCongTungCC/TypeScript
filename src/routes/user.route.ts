import { Router } from "express";
import UserController from "../controllers/user.controller";
import authentication from "../middlewares/authentication.middleware";
import catchAsync from "../middlewares/catchAsync.middleware";
import { premission } from "../middlewares/authorization.middleware";
import { Role } from "../helpers/constants.helper";

const router = Router();

router.get('/users', authentication, catchAsync(UserController.getUser));

router.delete('/users/:id', authentication, premission(Role.ADMIN), catchAsync(UserController.deleteUser));

router.post('/users', authentication, premission(Role.ADMIN), catchAsync(UserController.createUser));

router.put('/users/:id', authentication, premission(Role.ADMIN), catchAsync(UserController.updateUser));

router.get('/users/search', authentication, premission(Role.ADMIN), catchAsync(UserController.searchUser));

router.get('/users/:id', authentication, catchAsync(UserController.getUserById));

export default router;