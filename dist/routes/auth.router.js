"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../auth/auth.controller"));
const catchAsync_middleware_1 = __importDefault(require("../middlewares/catchAsync.middleware"));
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication.middleware"));
const router = (0, express_1.Router)();
router.post('/signup', (0, catchAsync_middleware_1.default)(auth_controller_1.default.signup));
router.post('/login', (0, catchAsync_middleware_1.default)(auth_controller_1.default.login));
router.get('/logout', authentication_middleware_1.default, (0, catchAsync_middleware_1.default)(auth_controller_1.default.logout));
router.put('/changepass', authentication_middleware_1.default, (0, catchAsync_middleware_1.default)(auth_controller_1.default.changePasswod));
exports.default = router;
