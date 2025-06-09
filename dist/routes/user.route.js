"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication.middleware"));
const catchAsync_middleware_1 = __importDefault(require("../middlewares/catchAsync.middleware"));
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
const constants_helper_1 = require("../helpers/constants.helper");
const router = (0, express_1.Router)();
router.get('/users', authentication_middleware_1.default, (0, catchAsync_middleware_1.default)(user_controller_1.default.getUser));
router.delete('/users/:id', authentication_middleware_1.default, (0, authorization_middleware_1.premission)(constants_helper_1.Role.ADMIN), (0, catchAsync_middleware_1.default)(user_controller_1.default.deleteUser));
router.post('/users', authentication_middleware_1.default, (0, authorization_middleware_1.premission)(constants_helper_1.Role.ADMIN), (0, catchAsync_middleware_1.default)(user_controller_1.default.createUser));
router.put('/users/:id', authentication_middleware_1.default, (0, authorization_middleware_1.premission)(constants_helper_1.Role.ADMIN), (0, catchAsync_middleware_1.default)(user_controller_1.default.updateUser));
router.get('/users/search', authentication_middleware_1.default, (0, authorization_middleware_1.premission)(constants_helper_1.Role.ADMIN), (0, catchAsync_middleware_1.default)(user_controller_1.default.findUser));
exports.default = router;
