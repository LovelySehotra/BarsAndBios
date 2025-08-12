import { NextFunction, Request, Response } from "express";

class AppError extends Error {
  statusCode: number;
  code: string;
  isOperational: boolean;

  /**
   * @param {string} message - Human-readable error message
   * @param {number} statusCode - HTTP status code
   * @param {string} [code] - Optional internal error code
   */
  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode || 500;
    this.code = code || "INTERNAL_ERROR";
    this.isOperational = true; // Marks known handled errors
    Error.captureStackTrace(this, this.constructor);
  }
}

function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let { statusCode, message, code } = err;

  // If not an operational error, hide sensitive details in production
  if (!err.isOperational) {
    console.error("💥 Unexpected Error:", err);
    statusCode = 500;
    message = "Something went wrong!";
    code = "INTERNAL_ERROR";
  }

  res.status(statusCode || 500).json({
    success: false,
    error: {
      code,
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
}

export { errorHandler, AppError };
