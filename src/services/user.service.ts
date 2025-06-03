import { UserInterface } from './../interfaces/user.interface';
import { User } from "../entities/user.entity";
import { hashPassword } from '../helpers/password.helper';
import { Validate } from '../helpers/validate.helper';

class UserService {
    static async getUser({id, role} : Partial<UserInterface>) {
        const users = await User.createQueryBuilder('user')
            .where( role === 'admin' ? '1=1' : role === 'manager' ? 'user.role = :filterRole' : 'user.id = :id', role === 'admin' ? {} 
                    : role === 'manager'
                    ? { filterRole: 'user' }
                    : { id: id })
            .getMany();
        if(!users) {
            return {
                code : 404,
                message : 'Không tìm thấy người dùng',
            }
        }
        return {
            code: 200,
            message: 'Lấy thành công',
            data : users,
        }
    }
    static async createUser(payload : Partial<UserInterface>) {
        const {username, email, password, avatar, role, gender, birthday} = payload;
        const user = await User.findOne({where : {email : email}});
        if(user) {
            return {
                code : 400,
                message : 'Email đã tồn tại'
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

    static async deleteUser({id} : Partial<UserInterface>) {
        const users = await User.findOne({where : {id : id}});
        if(!users) { 
            return {
                code : 404,
                message : 'Không tìm thấy người dùng',
            }
        }
        await User.delete({id : id});
        return {
            code : 200,
            message : 'Xóa thành công'
        }
    }

    static async updateUser(id : number , bodyData : Partial<UserInterface>) {
        const user = await User.findOne({where : { id : id}});
        if(!user) {
            return {
                code : 404,
                message : 'Không tìm thấy người dùng',
            }
        }
        const updateData = {
            ...bodyData,
            gender: bodyData.gender as any
        };
        await User.update({id : id}, updateData);
        return {
            code : 200,
            message : 'Cập nhật thành công',
        }
    }
}

export default UserService