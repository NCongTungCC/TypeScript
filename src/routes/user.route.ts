import { Router } from "express";
import UserController from "../controllers/user.controller";
import authentication from "../middlewares/authentication.middleware";
import catchAsync from "../middlewares/catchAsync.middleware";
import { premission } from "../middlewares/authorization.middleware";

const router = Router();
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
router.get('/users', authentication, catchAsync(UserController.getUser));

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

router.delete('/users/:id', authentication, premission('admin'), catchAsync(UserController.deleteUser));

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Admin tạo tài khoản
 *     description: Admin tạo tài khoản
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
router.post('/users',authentication, premission('admin'), catchAsync(UserController.createUser));

export default router;