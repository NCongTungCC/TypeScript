import { User } from "../entities/user.entity";
import { UserInterface } from "../interfaces/user.interface";
import { hashPassword, comparePassword } from "../helpers/password.helper";
import { generateToken } from "../helpers/generateToken.helper";
import { Validate } from "../helpers/validate.helper";
import { Response } from "express";
import { Token } from "../entities/token.entity";
import crypto from "crypto";
import { sendOTPEmail } from "../helpers/sendEmail.helper";

class AuthService {
    static async signup(payload : Partial<UserInterface>) {
        const {username, email, password, avatar, gender, birthday} = payload;
        const user = await User.findOne({ where: { email: email } });
        if(user) {
            return {
                code: 409,
                message: "Email is already in use",
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
        newUser.password = await hashPassword(password as string) as string;
        await newUser.save();
        return {
            code : 201,
            message : 'Signup successful',
            data : newUser,
        }
    }
    static async login(res : Response, payload : Partial<UserInterface>) {
        const {email, password} = payload;
        const user = await User.findOne({where : {email : email}});
        if(!user) {
            return {
                code : 404,
                message : 'Account not found',
            }
        }       
        const isMatch = await comparePassword(password as string, user.password);
        if(!isMatch) {
            return {
                code : 401,
                message : 'Incorrect password',
            }
        }
        await Token.delete({ userId: user.id });
        const accessToken = await generateToken(user);
        res.cookie('jwt', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        await Token.create({
            userId: user.id,
            token: accessToken.token,
            expiresAt: new Date(Date.now() + Number(accessToken.expiresIn) * 1000)
        }).save();
        return {
          code : 200,
          message : 'Login successful',
          accessToken : accessToken.token,
       }
    }
    static async logout(id : number, res : Response) {
        const user = await User.findOne({ where: { id : id } });
        await Token.delete({ userId: user?.id });
        res.clearCookie('jwt');
        return {
            code: 200,
            message: 'Logout successful',
        }
    }
    static async changePass({id, password, newPassword, confirmPassword} : any) {
        const user = await User.findOne({where : { id : id }});
        if(!user) {
            return {
                code : 404,
                message : 'User not found',
            }
        }
        const isMatch = await comparePassword(password, user.password);
        if(!isMatch) {
            return {
                code : 401,
                message : 'Incorrect old password',
            }
        }
        if(newPassword !== confirmPassword) {
            return {
                code : 422,
                message : 'Passwords do not match',
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
            message : 'Password changed successfully',
        }
    }
    static async forgotPassword({email} : Partial<UserInterface>) {
        const user = await User.findOne({where : {email : email}});
        if(!user) {
            return {
                code : 404,
                message : 'Not found email',
            }
        }
        const otp = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
        await Token.create({
            userId: user.id,
            token: otp,
            expiresAt: expiresAt
        }).save();
        await sendOTPEmail(email as string, otp);
        return {
            code : 200,
            message : 'OTP sent to email',
        }
    }

    static async verifyOTP(email: string, otp: string) {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return {
                code: 404,
                message: 'User not found',
            }
        }
        const token = await Token.findOne({ where: { userId: user.id, token: otp } });
        if (!token || !token.expiresAt || token.expiresAt < new Date()) {
            return {
                code: 401,
                message: 'Invalid or expired OTP',
            }
        }
        await Token.delete({ userId: user.id, token: otp });
        return {
            code: 200,
            message: 'OTP verified successfully',
        }
    }

    static resetPassword = async (email : string, newPassword: string) => {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return {
                code: 404,
                message: 'User not found',
            }
        }
        user.password = await hashPassword(newPassword) as string;
        return {
            code: 200,
            message: 'Password reset successfully',
        }
    }

}

export default AuthService