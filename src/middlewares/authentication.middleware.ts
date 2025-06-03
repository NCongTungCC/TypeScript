import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET_KEY || 'key';

const authentication = (req: Request, res: Response, next: NextFunction): void => {
      const authHeader = req.headers.authorization;
      const accessToken = authHeader && authHeader.split(" ")[1];

      if (!accessToken) {
        res.status(200).json({
          code: 404,
          status: "Error",
          message: "Không tìm thấy token",
        });
        return; 
      }
      jwt.verify(accessToken, secret, (err, user: any) => {
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

export default authentication;
