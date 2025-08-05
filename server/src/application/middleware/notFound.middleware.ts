import { Request, Response, NextFunction } from 'express';

export class NotFoundHandler {
  public handle = (req: Request, res: Response, next: NextFunction): void => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    (error as any).statusCode = 404;
    next(error);
  };
} 