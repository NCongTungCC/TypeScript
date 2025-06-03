import { User } from "../entities/user.entity";
import { UserInterface } from "../interfaces/user.interface";
import { hashPassword, comparePassword } from "../helpers/password.helper";
import { generateToken } from "../helpers/generateToken.helper";
import { validateAndThrowIfInvalid } from "../ultis/validate.ulti";

class AuthService {
    static async signup(payload : Partial<UserInterface>) {
        const {username, email, password, avatar, gender, birthday} = payload;
        const users = await User.findOne({ where: { email: email } });
        if(users) {
            return {
                code: 400,
                message: "Email đã tồn tại.",
            };
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
        await validateAndThrowIfInvalid(newUser);
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
    static async login(payload : Partial<UserInterface>) {
        const {email, password} = payload;
        const users = await User.findOne({where : {email : email}});
        if(!users) {
            return {
                code : 404,
                message : 'Không tìm thấy tài khoản',
            }
        }       
        const isMatch = await comparePassword(password as string, users.password);
        if(!isMatch) {
            return {
                code : 400,
                message : 'Mật khẩu không chính xác',
            }
        }
       const accessToken = await generateToken(users);
       return {
          code : 200,
          message : 'Đăng nhập thành công',
          accessToken : accessToken,
       }
    }
    static async logout({token} : {token: string}) {
        if (!token) {
            return {
                code: 401,
                message: 'Bạn chưa đăng nhập',
            }
        }
        return {
            code: 200,
            message: 'Đăng xuất thành công',
        }
    }
    static async changePass({id, password, newPassword, confirmPassword} : any) {
        const users = await User.findOne({where : { id : id }});
        if(!users) {
            return {
                code : 404,
                message : 'Không tìm thấy người dùng',
            }
        }
        const isMatch = await comparePassword(password, users.password);
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
        users.password = newPassword;
        await validateAndThrowIfInvalid(users);
        const hashedPassword = await hashPassword(newPassword);
        users.password = hashedPassword as string;
        await users.save();
        return {
            code : 200,
            message : 'Đổi mật khẩu thành công',
        }
    }
}

export default AuthService