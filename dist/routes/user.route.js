"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication.middleware"));
const router = (0, express_1.Router)();
router.get('/users', authentication_middleware_1.default, user_controller_1.default.getUser);
exports.default = router;
