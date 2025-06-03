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
const generateToken_helper_1 = require("../helpers/generateToken.helper");
const validate_helper_1 = require("../helpers/validate.helper");
class AuthService {
    static signup(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, avatar, gender, birthday } = payload;
            const user = yield user_entity_1.User.findOne({ where: { email: email } });
            if (user) {
                return {
                    code: 400,
                    message: "Email đã tồn tại.",
                };
            }
            const count = yield user_entity_1.User.count();
            const role = count === 0 ? "admin" : "user";
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
    static login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield user_entity_1.User.findOne({ where: { email: email } });
            if (!user) {
                return {
                    code: 404,
                    message: 'Không tìm thấy tài khoản',
                };
            }
            const isMatch = yield (0, password_helper_1.comparePassword)(password, user.password);
            if (!isMatch) {
                return {
                    code: 400,
                    message: 'Mật khẩu không chính xác',
                };
            }
            const accessToken = yield (0, generateToken_helper_1.generateToken)(user);
            return {
                code: 200,
                message: 'Đăng nhập thành công',
                accessToken: accessToken,
            };
        });
    }
    static logout(_a) {
        return __awaiter(this, arguments, void 0, function* ({ token }) {
            if (!token) {
                return {
                    code: 401,
                    message: 'Bạn chưa đăng nhập',
                };
            }
            return {
                code: 200,
                message: 'Đăng xuất thành công',
            };
        });
    }
    static changePass(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, password, newPassword, confirmPassword }) {
            const user = yield user_entity_1.User.findOne({ where: { id: id } });
            if (!user) {
                return {
                    code: 404,
                    message: 'Không tìm thấy người dùng',
                };
            }
            const isMatch = yield (0, password_helper_1.comparePassword)(password, user.password);
            if (!isMatch) {
                return {
                    code: 400,
                    message: 'Sai mật khẩu cũ',
                };
            }
            if (newPassword !== confirmPassword) {
                return {
                    code: 400,
                    message: 'Mật khẩu không trùng khớp',
                };
            }
            user.password = newPassword;
            yield (0, validate_helper_1.Validate)(user);
            const hashedPassword = yield (0, password_helper_1.hashPassword)(newPassword);
            user.password = hashedPassword;
            yield user.save();
            return {
                code: 200,
                message: 'Đổi mật khẩu thành công',
            };
        });
    }
}
exports.default = AuthService;
