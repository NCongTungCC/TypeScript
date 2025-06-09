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
    static findUser = async (req : Request, res: Response) => {
        const controller = new UserController();
        const username = req.query.username as string;
        const page = Number(req.query.page) || 0;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        await controller.handleRequest(res, req, (req) => UserService.searchUser(username, limit, skip));
    }
}

export default UserController;