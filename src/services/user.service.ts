import { User } from "../entities/user.entity";
import { UserInterface } from "../interfaces/user.interface";
class UserService {
    static async getUser({id, role} : Partial<UserInterface>) {
        const users = await User.find();
        if(!users) {
            return {
                code : 404,
                message : 'Không tìm thấy',
            }
        }
        if(role == 'admin') {
            return {
                code : 200,
                message : 'Lấy thành công',
                data : users,
            }
        } else if(role == 'manager') {
            return {
                code : 200,
                message : 'Lấy thành công',
                data : users.filter((item) => item.role == 'user')
            }
        } 
          return {
            code: 200,
            message: 'Lấy thành công',
            data : users.filter((item) => item.id == id),
        }
    }
}

export default UserService