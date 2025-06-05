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
const token_entity_1 = require("../entities/token.entity");
class AuthService {
    static signup(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, avatar, gender, birthday } = payload;
            const user = yield user_entity_1.User.findOne({ where: { email: email } });
            if (user) {
                return {
                    code: 409,
                    message: "Email is already in use",
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
            newUser.password = (yield (0, password_helper_1.hashPassword)(password));
            yield newUser.save();
            return {
                code: 201,
                message: 'Signup successful',
                data: newUser,
            };
        });
    }
    static login(res, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield user_entity_1.User.findOne({ where: { email: email } });
            if (!user) {
                return {
                    code: 404,
                    message: 'Account not found',
                };
            }
            const isMatch = yield (0, password_helper_1.comparePassword)(password, user.password);
            if (!isMatch) {
                return {
                    code: 401,
                    message: 'Incorrect password',
                };
            }
            const accessToken = yield (0, generateToken_helper_1.generateToken)(user);
            res.cookie('jwt', accessToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            yield token_entity_1.Token.create({
                userId: user.id,
                token: accessToken.token,
                expiresAt: new Date(Date.now() + Number(accessToken.expiresIn) * 1000)
            }).save();
            return {
                code: 200,
                message: 'Login successful',
                accessToken: accessToken.token,
            };
        });
    }
    static logout(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.User.findOne({ where: { id: id } });
            yield token_entity_1.Token.delete({ userId: user === null || user === void 0 ? void 0 : user.id });
            res.clearCookie('jwt');
            return {
                code: 200,
                message: 'Logout successful',
            };
        });
    }
    static changePass(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, password, newPassword, confirmPassword }) {
            const user = yield user_entity_1.User.findOne({ where: { id: id } });
            if (!user) {
                return {
                    code: 404,
                    message: 'User not found',
                };
            }
            const isMatch = yield (0, password_helper_1.comparePassword)(password, user.password);
            if (!isMatch) {
                return {
                    code: 401,
                    message: 'Incorrect old password',
                };
            }
            if (newPassword !== confirmPassword) {
                return {
                    code: 422,
                    message: 'Passwords do not match',
                };
            }
            user.password = newPassword;
            yield (0, validate_helper_1.Validate)(user);
            const hashedPassword = yield (0, password_helper_1.hashPassword)(newPassword);
            user.password = hashedPassword;
            yield user.save();
            yield token_entity_1.Token.delete({ userId: user.id });
            return {
                code: 200,
                message: 'Password changed successfully',
            };
        });
    }
}
exports.default = AuthService;
