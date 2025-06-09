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
const token_entity_1 = require("../entities/token.entity");
const constants_helper_1 = require("../helpers/constants.helper");
class UserService {
    static getUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, role }) {
            const users = yield user_entity_1.User.createQueryBuilder('user')
                .where(role === constants_helper_1.Role.ADMIN ? '1=1' : role === constants_helper_1.Role.MANAGER ? 'user.role = :filterRole' : 'user.id = :id', role === constants_helper_1.Role.ADMIN ? {}
                : role === constants_helper_1.Role.MANAGER
                    ? { filterRole: constants_helper_1.Role.USER }
                    : { id: id })
                .getMany();
            if (!users) {
                return {
                    code: 404,
                    message: 'Not found user',
                };
            }
            return {
                code: 200,
                message: 'Get user successfully',
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
                    code: 409,
                    message: 'Email is already in use'
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
            newUser.password = (yield (0, password_helper_1.hashPassword)(password));
            yield newUser.save();
            return {
                code: 201,
                message: 'Create user successful',
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
                    message: 'Not found user',
                };
            }
            yield user_entity_1.User.delete({ id: id });
            yield token_entity_1.Token.delete({ userId: id });
            return {
                code: 200,
                message: 'Delete user successfully'
            };
        });
    }
    static updateUser(id, bodyData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.User.findOne({ where: { id: id } });
            if (!user) {
                return {
                    code: 404,
                    message: 'Not found user',
                };
            }
            const updateData = Object.assign(Object.assign({}, bodyData), { gender: bodyData.gender });
            yield user_entity_1.User.update({ id: id }, updateData);
            return {
                code: 200,
                message: 'Update user successfully',
            };
        });
    }
    static searchUser(username, limit, skip) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.User.createQueryBuilder('user')
                .where('user.username LIKE :username', { username: `%${username}%` })
                .skip(skip)
                .limit(limit)
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
        });
    }
}
exports.default = UserService;
