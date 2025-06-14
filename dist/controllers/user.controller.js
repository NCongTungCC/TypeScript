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
const base_controller_1 = __importDefault(require("./base.controller"));
const constants_helper_1 = require("../helpers/constants.helper");
class UserController extends base_controller_1.default {
    constructor() {
        super('UserController');
    }
}
_a = UserController;
UserController.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new _a();
    yield controller.handleRequest(res, req, (req) => user_service_1.default.createUser(req.body));
});
UserController.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new _a();
    yield controller.handleRequest(res, req, (req) => user_service_1.default.deleteUser({ id: Number(req.params.id) }));
});
UserController.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new _a();
    yield controller.handleRequest(res, req, (req) => user_service_1.default.updateUser(Number(req.params.id), req.body));
});
UserController.getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new _a();
    const username = req.query.username || '';
    const page = Number(req.query.page) || constants_helper_1.DEFAULT_PAGE;
    const limit = Number(req.query.limit) || constants_helper_1.DEFAULT_LIMIT;
    const skip = (page - 1) * limit;
    yield controller.handleRequest(res, req, (req) => user_service_1.default.getUser(username, limit, skip));
});
UserController.getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new _a();
    yield controller.handleRequest(res, req, (req) => user_service_1.default.getUserById(Number(req.params.id)));
});
exports.default = UserController;
