import {Response, Request} from 'express';
import sendResponse from '../helpers/response.helper';
import AuthService from '../services/auth.service';

class AuthController {
    static signup = async (req : Request, res : Response) => {
        const result = await AuthService.signup(req.body);
        sendResponse(res, {code : result.code, message : result.message, data : result.data});
    }

    static login = async (req : Request, res : Response) => {
        const result = await AuthService.login(res, req.body);
        sendResponse(res, {code : result.code, message : result.message, accessToken : result.accessToken});
    }

    static logout = async (req: Request, res: Response) => {
        const id = req.user?.id;
        const userId = Number(id);
        const result = await AuthService.logout(userId, res);
        sendResponse(res, {code: result?.code, message: result?.message});
    }

    static changePasswod = async (req : Request, res : Response) => {
        const id = req.user?.id;
        const { password, newPassword, confirmPassword } = req.body;
        const result = await AuthService.changePass({id, password, newPassword, confirmPassword});
        sendResponse(res, {code: result?.code, message: result?.message});
    }

    static forgotPassword = async (req: Request, res: Response) => {
        const { email } = req.body;
        const result = await AuthService.forgotPassword({email});
        sendResponse(res, { code: result.code, message: result.message });
    }

    static verifyOTP = async (req: Request, res: Response) => {   
        const { email, otp } = req.body;
        const result = await AuthService.verifyOTP(email, otp);
        sendResponse(res, { code: result.code, message: result.message });
    }

    static resetPassword = async (req: Request, res: Response) => {
        const { email, newPassword } = req.body;
        const result = await AuthService.resetPassword(email, newPassword);
        sendResponse(res, { code: result.code, message: result.message });
    }
}

export default AuthController;