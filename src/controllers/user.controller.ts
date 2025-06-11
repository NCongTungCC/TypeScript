import UserService from "../services/user.service";
import { Response, Request } from "express";
import BaseController from "./base.controller";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '../helpers/constants.helper';

class UserController extends BaseController {
    constructor() {
        super('UserController');
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
    static getUser = async (req : Request, res: Response) => {
        const controller = new UserController();
        const username = req.query.username as string || '';
        const page = Number(req.query.page) || DEFAULT_PAGE;
        const limit = Number(req.query.limit) || DEFAULT_LIMIT;
        const skip = (page - 1) * limit;
        await controller.handleRequest(res, req, (req) => UserService.getUser(username, limit, skip));
    }
    static getUserById = async (req : Request, res : Response) => {
        const controller = new UserController();
        await controller.handleRequest(res, req, (req) => UserService.getUserById(Number(req.params.id)));
    }
}

export default UserController;