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
exports.sendOTPEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendOTPEmail = (to, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: `"ADMIN" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Reset Password OTP',
        text: `OTP của bạn để đặt lại mật khẩu là: ${otp}. Nó có hiệu lực trong 15 phút.`,
        html: `<p>OTP của bạn để đặt lại mật khẩu là: <b>${otp}</b>. Nó có hiệu lực trong 15 phút.</p>`,
    };
    yield transporter.sendMail(mailOptions);
});
exports.sendOTPEmail = sendOTPEmail;
