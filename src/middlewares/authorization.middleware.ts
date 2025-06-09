import { Response, Request, NextFunction } from "express";

export const premission = (roles : string | string[]) => {
  return (req : Request, res : Response, next : NextFunction) : void => {

    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    if (!req.user || !allowedRoles.includes(req.user?.role)) {
      res.status(403).json({ 
        code : 403,
        message: 'Forbidden' 
      });
      return;
    }
    next();
  }
}