import { Request, Response, NextFunction } from 'express';

// Error handler middleware will create human readable messages from validators middlewares

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({ message });
}
