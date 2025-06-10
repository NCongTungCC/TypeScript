import { validate } from 'class-validator';
import { UserInterface } from './../interfaces/user.interface';
import { User } from "../entities/user.entity";
import { hashPassword } from '../helpers/password.helper';
import { Validate } from '../helpers/validate.helper';
import { Token } from '../entities/token.entity';
import { Role } from '../helpers/constants.helper';

class UserService {
    static async getUser({id, role} : Partial<UserInterface>) {
        const users = await User.createQueryBuilder('user')
            .where( role === Role.ADMIN ? '1=1' : role === Role.MANAGER ? 'user.role = :filterRole' : 'user.id = :id', role === Role.ADMIN ? {} 
                    : role === Role.MANAGER
                    ? { filterRole: Role.USER }
                    : { id: id })
            .getMany();
        if(!users) {
            return {
                code : 404,
                message : 'Not found user',
            }
        }
        return {
            code: 200,
            message: 'Get user successfully',
            data : users,
        }
    }
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
                gender : gender as any,
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

    static async searchUser(username : string, limit : number, skip : number) {
        const user = await User.createQueryBuilder('user')
            .where('user.username LIKE :username', { username: `%${username}%` })
            .skip(skip)
            .limit(limit)
            .select(['user.id', 'user.username', 'user.email', 'user.role', 'user.avatar', 'user.gender', 'user.birthday'])
            .getMany();
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