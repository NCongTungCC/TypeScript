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
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_entity_1 = require("../entities/token.entity");
const secret = process.env.JWT_SECRET_KEY || 'key';
const authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];
    if (!accessToken) {
        res.status(200).json({
            code: 404,
            status: "Error",
            message: "No access token provided",
        });
        return;
    }
    const tokenExists = yield token_entity_1.Token.findOne({ where: { token: accessToken } });
    if (!tokenExists) {
        res.status(200).json({
            code: 404,
            status: "Error",
            message: "Token not found",
        });
        return;
    }
    if (!tokenExists.expiresAt || tokenExists.expiresAt < new Date()) {
        res.status(200).json({
            code: 403,
            status: "Error",
            message: "Token expired",
        });
        return;
    }
    jsonwebtoken_1.default.verify(accessToken, secret, (err, user) => {
        if (err) {
            res.status(200).json({
                code: 403,
                status: "Error",
                message: "Invalid token",
            });
            return;
        }
        req.user = user;
        next();
    });
});
exports.default = authentication;
