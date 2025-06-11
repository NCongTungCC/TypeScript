"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("./auth.router"));
const user_route_1 = __importDefault(require("./user.route"));
const book_router_1 = __importDefault(require("./book.router"));
const borrow_router_1 = __importDefault(require("./borrow.router"));
const router = (0, express_1.Router)();
router.use('/library/api/v1', auth_router_1.default);
router.use('/library/api/v1', user_route_1.default);
router.use('/library/api/v1', book_router_1.default);
router.use('library.v1', borrow_router_1.default);
exports.default = router;
