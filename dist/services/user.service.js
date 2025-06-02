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
class UserService {
    static getUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, role }) {
            const users = yield user_entity_1.User.find();
            if (!users) {
                return {
                    code: 404,
                    message: 'Không tìm thấy',
                };
            }
            if (role == 'admin') {
                return {
                    code: 200,
                    message: 'Lấy thành công',
                    data: users,
                };
            }
            else if (role == 'manager') {
                return {
                    code: 200,
                    message: 'Lấy thành công',
                    data: users.filter((item) => item.role == 'user')
                };
            }
            return {
                code: 200,
                message: 'Lấy thành công',
                data: users.filter((item) => item.id == id),
            };
        });
    }
}
exports.default = UserService;
