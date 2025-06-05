import { User } from "../entities/user.entity";
import { UserInterface } from "../interfaces/user.interface";
import { hashPassword, comparePassword } from "../helpers/password.helper";
import { generateToken } from "../helpers/generateToken.helper";
import { Validate } from "../helpers/validate.helper";
import { Response } from "express";
import { Token } from "../entities/token.entity";

class AuthService {
    static async signup(payload : Partial<UserInterface>) {
        const {username, email, password, avatar, gender, birthday} = payload;
        const user = await User.findOne({ where: { email: email } });
        if(user) {
            return {
                code: 400,
                message: "Email đã tồn tại.",
            }
        }
        const count = await User.count();
        const role = count === 0 ? "admin" : "user"; 
        const newUser = await User.create({
            username,
            email,
            password,
            avatar,
            gender : gender as any,
            role,
            birthday : new Date(birthday as Date),
        })
        await Validate(newUser);
        if(!newUser) {
            return {
                code : 400,
                message : 'Đăng ký thất bại',
            }
        }
        newUser.password = await hashPassword(password as string) as string;
        await newUser.save();
        return {
            code : 201,
            message : 'Đăng ký thành công',
            data : newUser,
        }
    }
    static async login(res : Response, payload : Partial<UserInterface>) {
        const {email, password} = payload;
        const user = await User.findOne({where : {email : email}});
        if(!user) {
            return {
                code : 404,
                message : 'Không tìm thấy tài khoản',
            }
        }       
        const isMatch = await comparePassword(password as string, user.password);
        if(!isMatch) {
            return {
                code : 400,
                message : 'Mật khẩu không chính xác',
            }
        }
        const accessToken = await generateToken(user);
        res.cookie('jwt', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        await Token.create({
            userId: user.id,
            token: accessToken,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        }).save();
        return {
          code : 200,
          message : 'Đăng nhập thành công',
          accessToken : accessToken,
       }
    }
    static async logout(id : number, res : Response) {
        const user = await User.findOne({ where: { id : id } });
        await Token.delete({ userId: user?.id });
        res.clearCookie('jwt');
        return {
            code: 200,
            message: 'Đăng xuất thành công',
        }
    }
    static async changePass({id, password, newPassword, confirmPassword} : any) {
        const user = await User.findOne({where : { id : id }});
        if(!user) {
            return {
                code : 404,
                message : 'Không tìm thấy người dùng',
            }
        }
        const isMatch = await comparePassword(password, user.password);
        if(!isMatch) {
            return {
                code : 400,
                message : 'Sai mật khẩu cũ',
            }
        }
        if(newPassword !== confirmPassword) {
            return {
                code : 400,
                message : 'Mật khẩu không trùng khớp',
            }
        }
        user.password = newPassword;
        await Validate(user);
        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword as string;
        await user.save();
        await Token.delete({ userId: user.id });
    
        return {
            code : 200,
            message : 'Đổi mật khẩu thành công',
        }
    }
}

export default AuthService