import { User } from "../entities/user.entity";
import { UserInterface } from "../interfaces/user.interface";

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
}

export default UserService