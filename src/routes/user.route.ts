import { Router } from "express";
import UserController from "../controllers/user.controller";
import authentication from "../middlewares/authentication.middleware";
import catchAsync from "../middlewares/catchAsync.middleware";
import { premission } from "../middlewares/authorization.middleware";
import { Role } from "../helpers/constants.helper";

const router = Router();

router.delete('/users/:id', authentication, premission(Role.ADMIN), catchAsync(UserController.deleteUser));

router.post('/users', authentication, premission(Role.ADMIN), catchAsync(UserController.createUser));

router.put('/users/:id', authentication, premission(Role.ADMIN), catchAsync(UserController.updateUser));

router.get('/users', authentication, premission([Role.ADMIN, Role.MANAGER]), catchAsync(UserController.getUser));

router.get('/users/:id', authentication, catchAsync(UserController.getUserById));

export default router;