"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET_KEY || 'key';
const authentication = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];
    if (!accessToken) {
        res.status(200).json({
            code: 401,
            status: "Error",
            message: "Token không hợp lệ.",
        });
        return;
    }
    jsonwebtoken_1.default.verify(accessToken, secret, (err, user) => {
        if (err) {
            res.status(200).json({
                code: 403,
                status: "Error",
                message: "Token không hợp lệ",
            });
            return;
        }
        req.user = user;
        next();
    });
};
exports.default = authentication;
