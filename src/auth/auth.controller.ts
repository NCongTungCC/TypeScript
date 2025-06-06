import {Response, Request} from 'express';
import AuthService from '../services/auth.service';
import BaseController from '../controllers/base.controller';

class AuthController extends BaseController {
    constructor() {
        super('AuthController');
    }
    static signup = async (req : Request, res : Response) => {
        const controller = new AuthController();
        await controller.handleRequest(res, req, (req) => AuthService.signup(req.body));
    }

    static login = async (req : Request, res : Response) => {
        const controller = new AuthController();
        await controller.handleRequest(res, req, (req) => AuthService.login(res, req.body));
    }

    static logout = async (req: Request, res: Response) => {
        const controller = new AuthController();
        const userId = Number(req.user?.id);
        await controller.handleRequest(res, req, (req) => AuthService.logout(userId, res));
    }

    static changePasswod = async (req : Request, res : Response) => {
        const controller = new AuthController();
        const { password, newPassword, confirmPassword } = req.body;
        await controller.handleRequest(res, req, (req) => AuthService.changePass({id: req.user?.id, password, newPassword, confirmPassword}));
    }

    static forgotPassword = async (req: Request, res: Response) => {
        const controller = new AuthController();
        const { email } = req.body;
        await controller.handleRequest(res, req, (req) => AuthService.forgotPassword({ email }));
    }

    static verifyOTP = async (req: Request, res: Response) => {
        const controller = new AuthController();
        const { email, otp } = req.body;
        await controller.handleRequest(res, req, (req) => AuthService.verifyOTP(email, otp));
    }

    static resetPassword = async (req: Request, res: Response) => {
        const { email, newPassword } = req.body;
        const controller = new AuthController();
        await controller.handleRequest(res, req, (req) => AuthService.resetPassword(email, newPassword));
    }
}

export default AuthController;