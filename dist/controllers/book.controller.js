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
const book_service_1 = __importDefault(require("../services/book.service"));
const base_controller_1 = __importDefault(require("./base.controller"));
const constants_helper_1 = require("../helpers/constants.helper");
class BookController extends base_controller_1.default {
    constructor() {
        super('BookController');
    }
}
_a = BookController;
BookController.getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new _a();
    const title = req.query.title || '';
    const page = Number(req.query.page) || constants_helper_1.DEFAULT_PAGE;
    const limit = Number(req.query.limit) || constants_helper_1.DEFAULT_LIMIT;
    const skip = (page - 1) * limit;
    yield controller.handleRequest(res, req, (req) => book_service_1.default.getBooks(title, skip, limit));
});
BookController.getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new _a();
    yield controller.handleRequest(res, req, (req) => book_service_1.default.getBookById(Number(req.params.id)));
});
BookController.createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new _a();
    yield controller.handleRequest(res, req, (req) => book_service_1.default.createBook(req.body));
});
BookController.updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new _a();
    yield controller.handleRequest(res, req, (req) => book_service_1.default.updateBook(Number(req.params.id), req.body));
});
BookController.deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new _a();
    yield controller.handleRequest(res, req, (req) => book_service_1.default.deleteBook(Number(req.params.id)));
});
exports.default = BookController;
