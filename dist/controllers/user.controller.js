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
const user_service_1 = __importDefault(require("../services/user.service"));
const response_middleware_1 = __importDefault(require("../middlewares/response.middleware"));
class UserController {
}
_a = UserController;
UserController.getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
    const id = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
    const result = yield user_service_1.default.getUser({ role, id });
    (0, response_middleware_1.default)(res, { code: result === null || result === void 0 ? void 0 : result.code, message: result === null || result === void 0 ? void 0 : result.message, data: result === null || result === void 0 ? void 0 : result.data });
});
UserController.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = Number(id);
    const result = yield user_service_1.default.deleteUser({ id: userId });
    (0, response_middleware_1.default)(res, { code: result === null || result === void 0 ? void 0 : result.code, message: result === null || result === void 0 ? void 0 : result.message });
});
exports.default = UserController;
