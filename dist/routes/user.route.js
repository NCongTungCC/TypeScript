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
 *     tags: ['User']
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
 *     tags: ['User']
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
/**
 * @swagger
 * /users:
 *   post:
 *     tags: ['User']
 *     summary: ADMIN thêm người dùng
 *     description: ADMIN thêm người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "congtung"
 *               email:
 *                 type: string
 *                 example: "tung@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               avatar:
 *                 type: string
 *                 example: "tung.jpg"
 *               gender:
 *                 type: string
 *                 example: "male"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "2002-02-01"
 *     responses:
 *       201:
 *         description: Tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Tạo thành công"
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "congtung"
 *                     email:
 *                       type: string
 *                       example: "tung@gmail.com"
 *                     password:
 *                       type: string
 *                       example: "123456"
 *                     avatar:
 *                       type: string
 *                       example: "tung.jpg"
 *                     role:
 *                       type: string
 *                       example: "manager"
 *                       enum : [admin, manager, user]
 *                     gender:
 *                       type: string
 *                       example: "male"
 *                     birthday:
 *                       type: string
 *                       format: date
 *                       example: "2002-02-01"
 *       404:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Dữ liệu đầu vào không hợp lệ"
 *       400:
 *         description: Email đã tồn tại
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Email đã được sử dụng"
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Đã xảy ra lỗi phía máy chủ"
 */
router.post('/users', authentication_middleware_1.default, (0, authorization_middleware_1.premission)('admin'), (0, catchAsync_middleware_1.default)(user_controller_1.default.createUser));
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: ['User']
 *     summary: Sửa thông tin người dùng
 *     description: Cho phép admin sửa thông tin người dùng (trừ mật khẩu)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của người dùng cần sửa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "congtung"
 *               email:
 *                 type: string
 *                 example: "tung@gmail.com"
 *               avatar:
 *                 type: string
 *                 example: "https://example.com/avatar.jpg"
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Sửa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Sửa thành công"
 *       404:
 *         description: Không tìm thấy người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Không tìm thấy người dùng"
 *       400:
 *         description: Email đã tồn tại
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Email đã được sử dụng"
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Đã xảy ra lỗi phía máy chủ"
 */
router.put('/users/:id', authentication_middleware_1.default, (0, authorization_middleware_1.premission)('admin'), (0, catchAsync_middleware_1.default)(user_controller_1.default.updateUser));
exports.default = router;
