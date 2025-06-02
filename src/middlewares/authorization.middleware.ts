import { Response, Request, NextFunction } from "express";

export const premission = (roles : string) => {
  return (req : Request, res : Response, next : NextFunction) => {
    if (!req.user || req.user.role !== roles) {
        return res.status(403).json({ message: 'Không có quyền truy cập' });
    }
    next();
  };
};