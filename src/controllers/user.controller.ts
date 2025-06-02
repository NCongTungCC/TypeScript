import UserService from "../services/user.service";
import { Response, Request } from "express";
import sendResponse from "../middlewares/response.middleware";

class UserController {
    static getUser = async (req: Request, res: Response) => {
        const role = req.user?.role;
        const id = req.user?.id;
        const result = await UserService.getUser({ role, id });
        sendResponse(res, { code: result?.code, message: result?.message, data: result?.data });
    };
}

export default UserController;