import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Token } from "../entities/token.entity";

const secret = process.env.JWT_SECRET_KEY || 'key';

const authentication = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const authHeader = req.headers.authorization;
        const accessToken = authHeader && authHeader.split(" ")[1];

        if (!accessToken) {
            res.status(200).json({
              code: 404,
              status: "Error",
              message: "Không tìm thấy token",
            })
            return
        }
        const tokenExists = await Token.findOne({ where: { token: accessToken} });
        if(!tokenExists) {
            res.status(200).json({
              code: 404,
              status: "Error",
              message: "Token không tồn tại hoặc hết hạn",
            })
            return
        }
        if (!tokenExists.expiresAt || tokenExists.expiresAt < new Date()) {
            res.status(200).json({
              code: 403,
              status: "Error",
              message: "Token đã hết hạn",
            });
            return
        }
        jwt.verify(accessToken, secret, (err, user: any) => {
          if (err) {
            res.status(200).json({
              code: 403,
              status: "Error",
              message: "Token không hợp lệ",
            });
            return
          }
          req.user = user;
          next();
        });
};

export default authentication;
