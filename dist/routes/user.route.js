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
const router = (0, express_1.Router)();
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lấy danh sách người dùng
 *     description: Lấy danh sách người dùng theo quyền truy cập
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Lấy người dùng thành công"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       username:
 *                         type: string
 *                         example: "congtung"
 *                       email:
 *                         type: string
 *                         example: "tung@gmail.com"
 *                       password:
 *                         type: string
 *                         example: "123456"
 *                       avatar:
 *                         type: string
 *                         example: "tung.jpg"
 *                       gender:
 *                         type: string
 *                         enum: [male, female]
 *                         example: "male"
 *                       birthday:
 *                         type: string
 *                         format: date
 *                         example: "2002-02-01"
 *       404:
 *         description: Không tìm thấy người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Không tìm thấy người dùng"
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Đã xảy ra lỗi phía máy chủ"
 */
router.get('/users', authentication_middleware_1.default, (0, catchAsync_middleware_1.default)(user_controller_1.default.getUser));
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Xóa người dùng
 *     description: Xóa người dùng theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của người dùng cần xóa
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Xóa người dùng thành công"
 *       404:
 *         description: Không tìm thấy người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Không tìm thấy người dùng"
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Đã xảy ra lỗi phía máy chủ"
 */
router.delete('/users/:id', authentication_middleware_1.default, (0, authorization_middleware_1.premission)('admin'), (0, catchAsync_middleware_1.default)(user_controller_1.default.deleteUser));
exports.default = router;
