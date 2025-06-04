import UserService from "../services/user.service";
import { Response, Request } from "express";
import sendResponse from "../helpers/response.helper";

class UserController {
    static getUser = async (req: Request, res: Response) => {
        const role = req.user?.role;
        const id = req.user?.id;
        const result = await UserService.getUser({ role, id });
        sendResponse(res, { code: result?.code, message: result?.message, data: result?.data });
    }

    static createUser = async (req : Request, res :Response) => {
        const result = await UserService.createUser(req.body);
        sendResponse(res, { code: result?.code, message: result?.message, data: result?.data });
    }

    static deleteUser = async (req : Request, res : Response) => {
        const {id} = req.params;
        const userId = Number(id);
        const result = await UserService.deleteUser({id : userId});
        sendResponse(res, { code: result?.code, message: result?.message});
    }

    static updateUser = async (req : Request, res : Response) => {
        const {id} = req.params;
        const userId = Number(id)
        const result = await UserService.updateUser(userId, req.body);
        sendResponse(res, { code: result?.code, message: result?.message});
    }
}

export default UserController;