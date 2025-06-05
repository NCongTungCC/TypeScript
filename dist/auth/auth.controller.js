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
const response_helper_1 = __importDefault(require("../helpers/response.helper"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
class AuthController {
}
_a = AuthController;
AuthController.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.default.signup(req.body);
    (0, response_helper_1.default)(res, { code: result.code, message: result.message, data: result.data });
});
AuthController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.default.login(res, req.body);
    (0, response_helper_1.default)(res, { code: result.code, message: result.message, accessToken: result.accessToken });
});
AuthController.logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    const userId = Number(id);
    const result = yield auth_service_1.default.logout(userId, res);
    (0, response_helper_1.default)(res, { code: result === null || result === void 0 ? void 0 : result.code, message: result === null || result === void 0 ? void 0 : result.message });
});
AuthController.changePasswod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    const { password, newPassword, confirmPassword } = req.body;
    const result = yield auth_service_1.default.changePass({ id, password, newPassword, confirmPassword });
    (0, response_helper_1.default)(res, { code: result === null || result === void 0 ? void 0 : result.code, message: result === null || result === void 0 ? void 0 : result.message });
});
exports.default = AuthController;
