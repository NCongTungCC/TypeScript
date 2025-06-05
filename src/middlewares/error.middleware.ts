import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
      console.error('Lỗi', err.message);
      res.status(500).json({
          code: 500,
          message: 'Internal Server Error',
          error : err.message,
      })
}

export default errorHandler;