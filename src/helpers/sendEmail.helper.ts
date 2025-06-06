import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendOTPEmail = async (to : string, otp : string) => {
    const mailOptions = {
        from: `"ADMIN" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Reset Password OTP',
        text: `OTP của bạn để đặt lại mật khẩu là: ${otp}. Nó có hiệu lực trong 15 phút.`,
        html: `<p>OTP của bạn để đặt lại mật khẩu là: <b>${otp}</b>. Nó có hiệu lực trong 15 phút.</p>`,
    };

    await transporter.sendMail(mailOptions);
};
 