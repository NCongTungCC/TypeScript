import { UserInterface } from './../interfaces/user.interface';
import { User } from "../entities/user.entity";
import { hashPassword } from '../helpers/password.helper';
import { Validate } from '../helpers/validate.helper';
import { Token } from '../entities/token.entity';
import { Role, Gender } from '../helpers/constants.helper';
import { Like } from 'typeorm';

class UserService {
    static async createUser(payload : Partial<UserInterface>) {
        const {username, email, password, avatar, role, gender, birthday} = payload;
        const user = await User.findOne({where : {email : email}});
        if(user) {
            return {
                code : 409,
                message : 'Email is already in use'
            }
        }
        const newUser = await User.create({
                username,
                email,
                password,
                avatar,
                gender : gender as Gender,
                role,
                birthday : new Date(birthday as Date),
        })
        const validationResult = await Validate(newUser);
        if (validationResult && validationResult.code !== 200) {
            return validationResult;
        }
        newUser.password = await hashPassword(password as string) as string;
        await newUser.save();
        return {
            code : 201,
            message : 'Create user successful',
            data : newUser,
        }
    }

    static async deleteUser({id} : Partial<UserInterface>) {
        const users = await User.findOne({where : {id : id}});
        if(!users) { 
            return {
                code : 404,
                message : 'Not found user',
            }
        }
        await User.delete({id : id});
        await Token.delete({userId : id});
        return {
            code : 200,
            message : 'Delete user successfully'
        }
    }

    static async updateUser(id : number , bodyData : Partial<UserInterface>) {
        const user = await User.findOne({where : { id : id}});
        if(!user) {
            return {
                code : 404,
                message : 'Not found user',
            }
        }
        const updateData = {
            ...bodyData,
            gender: bodyData.gender as any
        };
        await User.update({id : id}, updateData);
        return {
            code : 200,
            message : 'Update user successfully',
        }
    }

    static async getUser(username : string, limit : number, skip : number) {
        const user = await User.find({
            where: { username: Like(`%${username}%`) },
            select : ['id', 'username', 'email', 'role', 'avatar', 'gender', 'birthday'],
            take: limit,
            skip: skip,
            order: { id: 'ASC' }
        });
        if (!user || user.length === 0) {
            return {
                code: 404,
                message: 'User not found',
            };
        }
        return {
            code: 200,
            message: 'User found',
            data: user,
        };
    }

    static async getUserById(id : number) {
        const user = await User.findOne({
            where : {id : id}, 
            select: ['id', 'username', 'email', 'role', 'avatar', 'gender', 'birthday']
        });
        if(!user) {
            return {
                code : 404,
                message : 'User not found'
            }
        }
        return {
            code : 200, 
            message : 'User found',
            data : user,
        }
    }
}

export default UserService