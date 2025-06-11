"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authorization_middleware_1 = require("./../middlewares/authorization.middleware");
const express_1 = require("express");
const book_controller_1 = __importDefault(require("../controllers/book.controller"));
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication.middleware"));
const constants_helper_1 = require("../helpers/constants.helper");
const catchAsync_middleware_1 = __importDefault(require("../middlewares/catchAsync.middleware"));
const router = (0, express_1.Router)();
router.get('/books', (0, catchAsync_middleware_1.default)(book_controller_1.default.getBooks));
router.get('/books/:id', (0, catchAsync_middleware_1.default)(book_controller_1.default.getBookById));
router.post('/books', authentication_middleware_1.default, (0, authorization_middleware_1.premission)([constants_helper_1.Role.ADMIN, constants_helper_1.Role.MANAGER]), (0, catchAsync_middleware_1.default)(book_controller_1.default.createBook));
router.put('/books/:id', authentication_middleware_1.default, (0, authorization_middleware_1.premission)([constants_helper_1.Role.ADMIN, constants_helper_1.Role.MANAGER]), (0, catchAsync_middleware_1.default)(book_controller_1.default.updateBook));
router.delete('/books/:id', authentication_middleware_1.default, (0, authorization_middleware_1.premission)([constants_helper_1.Role.ADMIN, constants_helper_1.Role.MANAGER]), (0, catchAsync_middleware_1.default)(book_controller_1.default.deleteBook));
exports.default = router;
