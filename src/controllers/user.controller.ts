import UserService from "../services/user.service";
import { Response, Request } from "express";
import BaseController from "./base.controller";

class UserController extends BaseController {
    constructor() {
        super('UserController');
    }
    static getUser = async (req: Request, res: Response) => {
        const controller = new UserController();
        await controller.handleRequest(res, req, (req) => UserService.getUser({ id: req.user?.id, role: req.user?.role }));
    }
    static createUser = async (req : Request, res :Response) => {
        const controller = new UserController();
        await controller.handleRequest(res, req, (req) => UserService.createUser(req.body));
    }

    static deleteUser = async (req : Request, res : Response) => {
        const controller = new UserController();
        await controller.handleRequest(res, req, (req) => UserService.deleteUser({ id: Number(req.params.id) }));
    }

    static updateUser = async (req : Request, res : Response) => {
        const controller = new UserController();
        await controller.handleRequest(res, req, (req) => UserService.updateUser(Number(req.params.id), req.body));
    }
}

export default UserController;