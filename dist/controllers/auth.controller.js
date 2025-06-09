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
const auth_service_1 = __importDefault(require("../services/auth.service"));
const base_controller_1 = __importDefault(require("./base.controller"));
class AuthController extends base_controller_1.default {
    constructor() {
        super('AuthController');
    }
}
_a = AuthController;
AuthController.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new _a();
    yield controller.handleRequest(res, req, (req) => auth_service_1.default.signup(req.body));
});
AuthController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new _a();
    yield controller.handleRequest(res, req, (req) => auth_service_1.default.login(res, req.body));
});
AuthController.logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const controller = new _a();
    const userId = Number((_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
    yield controller.handleRequest(res, req, (req) => auth_service_1.default.logout(userId, res));
});
AuthController.changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new _a();
    const { password, newPassword, confirmPassword } = req.body;
    yield controller.handleRequest(res, req, (req) => { var _b; return auth_service_1.default.changePass({ id: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id, password, newPassword, confirmPassword }); });
});
AuthController.forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new _a();
    const { email } = req.body;
    yield controller.handleRequest(res, req, (req) => auth_service_1.default.forgotPassword({ email }));
});
AuthController.verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new _a();
    const { email, otp } = req.body;
    yield controller.handleRequest(res, req, (req) => auth_service_1.default.verifyOTP(email, otp));
});
AuthController.resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword } = req.body;
    const controller = new _a();
    yield controller.handleRequest(res, req, (req) => auth_service_1.default.resetPassword(email, newPassword));
});
exports.default = AuthController;
