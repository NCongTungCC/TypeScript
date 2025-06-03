import {Response, Request} from 'express';
import sendResponse from '../middlewares/response.middleware';
import AuthService from '../services/auth.service';

class AuthController {
    static signup = async (req : Request, res : Response) => {
        const {username, email, password, avatar, gender, birthday} = req.body;
        const result = await AuthService.signup({username, email, password, avatar, gender, birthday});
        sendResponse(res, {code : result.code, message : result.message, data : result.data});
    }

    static login = async (req : Request, res : Response) => {
        const {email, password} = req.body;
        const result = await AuthService.login({email, password});
        sendResponse(res, {code : result.code, message : result.message, accessToken : result.accessToken});
    }

    static logout = async (req: Request, res: Response) => {
        const token = req.headers.authorization?.split(' ')[1] as string;
        const result = await AuthService.logout({token});
        res.clearCookie('accessToken');
        sendResponse(res, {code: result?.code, message: result?.message});
    }

    static changePasswod = async (req : Request, res : Response) => {
        const id = req.user?.id;
        const { password, newPassword, confirmPassword } = req.body;
        const result = await AuthService.changePass({id, password, newPassword, confirmPassword});
        sendResponse(res, {code: result?.code, message: result?.message });
    }
}

export default AuthController;