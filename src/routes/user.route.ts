import { Router } from "express";
import UserController from "../controllers/user.controller";
import authentication from "../middlewares/authentication.middleware";
import catchAsync from "../middlewares/catchAsync.middleware";

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

export default router;