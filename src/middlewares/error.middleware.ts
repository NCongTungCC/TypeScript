import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Lỗi', err.message);
  res.status(500).json({
    code: 500,
    message: 'Đã xảy ra lỗi phía máy chủ',
  });
};

export default errorHandler;
