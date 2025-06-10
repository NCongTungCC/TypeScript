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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../entities/user.entity");
const password_helper_1 = require("../helpers/password.helper");
const generateToken_helper_1 = require("../helpers/generateToken.helper");
const validate_helper_1 = require("../helpers/validate.helper");
const token_entity_1 = require("../entities/token.entity");
const crypto_1 = __importDefault(require("crypto"));
const sendEmail_helper_1 = require("../helpers/sendEmail.helper");
const constants_helper_1 = require("../helpers/constants.helper");
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
            const role = count === 0 ? constants_helper_1.Role.ADMIN : constants_helper_1.Role.USER;
            const newUser = yield user_entity_1.User.create({
                username,
                email,
                password,
                avatar,
                gender: gender,
                role,
                birthday: new Date(birthday),
            });
            const validationResult = yield (0, validate_helper_1.Validate)(newUser);
            if (validationResult && validationResult.code !== 200) {
                return validationResult;
            }
            newUser.password = (yield (0, password_helper_1.hashPassword)(password));
            yield newUser.save();
            return {
                code: 201,
                message: 'Signup successfully',
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
    static changePass(_b) {
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
            const validationResult = yield (0, validate_helper_1.Validate)(user);
            if (validationResult && validationResult.code !== 200) {
                return validationResult;
            }
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
    static forgotPassword(_b) {
        return __awaiter(this, arguments, void 0, function* ({ email }) {
            const user = yield user_entity_1.User.findOne({ where: { email: email } });
            if (!user) {
                return {
                    code: 404,
                    message: 'Not found email',
                };
            }
            const otp = crypto_1.default.randomInt(100000, 999999).toString();
            const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
            yield token_entity_1.Token.create({
                userId: user.id,
                token: otp,
                expiresAt: expiresAt
            }).save();
            yield (0, sendEmail_helper_1.sendOTPEmail)(email, otp);
            return {
                code: 200,
                message: 'OTP sent to email',
            };
        });
    }
    static verifyOTP(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.User.findOne({ where: { email: email } });
            if (!user) {
                return {
                    code: 404,
                    message: 'User not found',
                };
            }
            const token = yield token_entity_1.Token.findOne({ where: { userId: user.id, token: otp } });
            if (!token || !token.expiresAt || token.expiresAt < new Date()) {
                return {
                    code: 401,
                    message: 'Invalid or expired OTP',
                };
            }
            yield token_entity_1.Token.delete({ userId: user.id, token: otp });
            return {
                code: 200,
                message: 'OTP verified successfully',
            };
        });
    }
}
_a = AuthService;
AuthService.resetPassword = (email, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_entity_1.User.findOne({ where: { email: email } });
    if (!user) {
        return {
            code: 404,
            message: 'User not found',
        };
    }
    user.password = (yield (0, password_helper_1.hashPassword)(newPassword));
    yield user.save();
    return {
        code: 200,
        message: 'Password reset successfully',
    };
});
exports.default = AuthService;
