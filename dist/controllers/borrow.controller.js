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
const borrow_service_1 = __importDefault(require("../services/borrow.service"));
const base_controller_1 = __importDefault(require("./base.controller"));
class BorrowController extends base_controller_1.default {
    constructor() {
        super('BorrowController');
    }
}
_a = BorrowController;
BorrowController.borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new _a();
    yield controller.handleRequest(res, req, (req) => { var _b; return borrow_service_1.default.borrowBook(Number(req.params.id), Number((_b = req.user) === null || _b === void 0 ? void 0 : _b.id)); });
});
BorrowController.returnBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new _a();
    yield controller.handleRequest(res, req, (req) => borrow_service_1.default.returnBook(Number(req.params.id)));
});
BorrowController.approveReturn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new _a();
    yield controller.handleRequest(res, req, (req) => borrow_service_1.default.approveReturn(Number(req.params.id)));
});
exports.default = BorrowController;
