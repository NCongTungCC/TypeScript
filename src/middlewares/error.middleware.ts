import { StatusCodes } from 'http-status-codes';
import { Response, Request, NextFunction } from 'express';

export class NotFoundError extends Error {
  public statusCode: number;
  constructor(message : string) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
export class BadRequestError extends Error {
  public statusCode: number;
  constructor(message : string) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
export class UnauthenticatedError extends Error {
  public statusCode: number;
  constructor(message : string) {
    super(message);
    this.name = 'UnauthenticatedError';
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
export class UnauthorizedError extends Error {
  public statusCode: number;
  constructor(message : string) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

const errorHandlerMiddleware = (err : Error, req : Request, res : Response, next : NextFunction) => {
  const statusCode = (err as any).statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || 'something went wrong, try again later';
  res.status(statusCode).json({ message : msg });
};

export default errorHandlerMiddleware;