import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../config/logger';

export interface CustomError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export class ErrorHandler {
  private logger: Logger;

  constructor() {
    this.logger = Logger.getInstance();
  }

  public handle = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    let error = { ...err };
    error.message = err.message;

    // Log error
    this.logger.error({
      message: err.message,
      stack: err.stack,
      url: req.url,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
      const message = 'Resource not found';
      error = new Error(message) as CustomError;
      error.statusCode = 404;
    }

    // Mongoose duplicate key
    if (err.name === 'MongoError' && (err as any).code === 11000) {
      const message = 'Duplicate field value entered';
      error = new Error(message) as CustomError;
      error.statusCode = 400;
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const message = Object.values((err as any).errors)
        .map((val: any) => val.message)
        .join(', ');
      error = new Error(message) as CustomError;
      error.statusCode = 400;
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
      const message = 'Invalid token';
      error = new Error(message) as CustomError;
      error.statusCode = 401;
    }

    if (err.name === 'TokenExpiredError') {
      const message = 'Token expired';
      error = new Error(message) as CustomError;
      error.statusCode = 401;
    }

    // Multer errors
    if (err.name === 'MulterError') {
      let message = 'File upload error';
      if ((err as any).code === 'LIMIT_FILE_SIZE') {
        message = 'File too large';
      } else if ((err as any).code === 'LIMIT_UNEXPECTED_FILE') {
        message = 'Unexpected file field';
      }
      error = new Error(message) as CustomError;
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || 'Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  };
} 