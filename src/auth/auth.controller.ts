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
}

export default AuthController;