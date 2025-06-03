import {Response, Request} from 'express';
import sendResponse from '../middlewares/response.middleware';
import AuthService from '../services/auth.service';

class AuthController {
    static signup = async (req : Request, res : Response) => {
        const result = await AuthService.signup(req.body);
        sendResponse(res, {code : result.code, message : result.message, data : result.data});
    }

    static login = async (req : Request, res : Response) => {
        const result = await AuthService.login(req.body);
        res.cookie('jwt', result.accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });
        sendResponse(res, {code : result.code, message : result.message, accessToken : result.accessToken});
    }

    static logout = async (req: Request, res: Response) => {
        const result = await AuthService.logout();
        res.clearCookie('jwt');
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