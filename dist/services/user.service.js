"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../entities/user.entity");
const password_helper_1 = require("../helpers/password.helper");
const validate_helper_1 = require("../helpers/validate.helper");
class UserService {
    static getUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, role }) {
            const users = yield user_entity_1.User.createQueryBuilder('user')
                .where(role === 'admin' ? '1=1' : role === 'manager' ? 'user.role = :filterRole' : 'user.id = :id', role === 'admin' ? {}
                : role === 'manager'
                    ? { filterRole: 'user' }
                    : { id: id })
                .getMany();
            if (!users) {
                return {
                    code: 404,
                    message: 'Không tìm thấy người dùng',
                };
            }
            return {
                code: 200,
                message: 'Lấy thành công',
                data: users,
            };
        });
    }
    static createUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, avatar, role, gender, birthday } = payload;
            const user = yield user_entity_1.User.findOne({ where: { email: email } });
            if (user) {
                return {
                    code: 400,
                    message: 'Email đã tồn tại'
                };
            }
            const newUser = yield user_entity_1.User.create({
                username,
                email,
                password,
                avatar,
                gender: gender,
                role,
                birthday: new Date(birthday),
            });
            yield (0, validate_helper_1.Validate)(newUser);
            if (!newUser) {
                return {
                    code: 400,
                    message: 'Đăng ký thất bại',
                };
            }
            newUser.password = (yield (0, password_helper_1.hashPassword)(password));
            yield newUser.save();
            return {
                code: 201,
                message: 'Đăng ký thành công',
                data: newUser,
            };
        });
    }
    static deleteUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const users = yield user_entity_1.User.findOne({ where: { id: id } });
            if (!users) {
                return {
                    code: 404,
                    message: 'Không tìm thấy người dùng',
                };
            }
            yield user_entity_1.User.delete({ id: id });
            return {
                code: 200,
                message: 'Xóa thành công'
            };
        });
    }
}
exports.default = UserService;
