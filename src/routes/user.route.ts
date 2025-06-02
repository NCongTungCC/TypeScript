import { Router } from "express";
import UserController from "../controllers/user.controller";
import authentication from "../middlewares/authentication.middleware";

const router = Router();

router.get('/users', authentication, UserController.getUser);

export default router;