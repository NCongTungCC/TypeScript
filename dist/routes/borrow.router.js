"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrow_controller_1 = __importDefault(require("../controllers/borrow.controller"));
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication.middleware"));
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
const constants_helper_1 = require("../helpers/constants.helper");
const catchAsync_middleware_1 = __importDefault(require("../middlewares/catchAsync.middleware"));
const router = (0, express_1.Router)();
router.post('/books/:id/borrow', authentication_middleware_1.default, (0, catchAsync_middleware_1.default)(borrow_controller_1.default.borrowBook));
router.put('/books/:id/return', authentication_middleware_1.default, (0, catchAsync_middleware_1.default)(borrow_controller_1.default.returnBook));
router.put('/books/:id/approve-return', authentication_middleware_1.default, (0, authorization_middleware_1.premission)([constants_helper_1.Role.ADMIN, constants_helper_1.Role.MANAGER]), (0, catchAsync_middleware_1.default)(borrow_controller_1.default.approveReturn));
router.get('/my-books', authentication_middleware_1.default, (0, catchAsync_middleware_1.default)(borrow_controller_1.default.getBorrowedBooks));
exports.default = router;
