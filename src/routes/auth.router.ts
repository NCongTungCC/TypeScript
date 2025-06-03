import { Router } from "express";
import AuthController from "../auth/auth.controller";
import catchAsync from "../middlewares/catchAsync.middleware";
import authentication from "../middlewares/authentication.middleware";
const router = Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Đăng ký
 *     description: Đăng ký tài khoản
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
 *         description: Đăng ký thành công
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
 *                   example: "Đăng ký thành công"
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
router.post('/signup', catchAsync(AuthController.signup));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Đăng nhập
 *     description: Đăng nhập tài khoản
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "tung@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
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
 *                   example: "Đăng nhập thành công"
 *                 accessToken:          
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6InVzZXIiLCJpYXQ
 *                             iOjE3NDg4MzAxODIsImV4cCI6MTc0ODgzMTk4Mn0.CCq45tW-6ND-c1Fafejj9C87q_wOBxCCZjr7EY0W_wo"
 *       400:
 *         description: Sai tài khoản mật khẩu
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
 *                   example: "Sai tài khoản mật khẩu"
 *       404:
 *         description: Không tìm thấy tài khoản
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
 *                   example: "Không tìm thấy email"
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
router.post('/login', catchAsync(AuthController.login));

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Đăng xuất
 *     description: Đăng xuất tài khoản
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
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
 *                   example: "Đăng xuất thành công"
 *       401:
 *         description: Bạn chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Bạn chưa đăng nhập"
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

router.get('/logout',authentication, catchAsync(AuthController.logout));

/**
 * @swagger
 * /changepass:
 *   put:
 *     summary: Đổi mật khẩu
 *     description: Đổi mật khẩu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "123456"
 *               newPassword:
 *                 type: string
 *                 example: "1234567"
 *               confirmPassword:
 *                 type: string
 *                 example: "1234567"
 *     responses:
 *       200:
 *         description: Đổi mật khẩu thành công
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
 *                   example: "Đổi mật khẩu thành công"
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
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
 *                   example: "Sai mật khẩu cũ hoặc mật khẩu mới không trùng khớp"
 *       404:
 *         description: Không tìm thấy tài khoản
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
 *                   example: "Không tìm thấy tài khoản"
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
router.put('/changepass', authentication, catchAsync(AuthController.changePasswod));

export default router;