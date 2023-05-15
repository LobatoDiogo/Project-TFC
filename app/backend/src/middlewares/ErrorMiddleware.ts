import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../utils/NotFoundError';
import ValidationError from '../utils/ValidationError';
import UnauthorizedError from '../utils/UnauthorizedError';

class ErrorMiddleware {
  static handleError(error: Error, _req: Request, res: Response, _next: NextFunction) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }

    if (error instanceof NotFoundError) {
      return res.status(404).json({ message: error.message });
    }

    if (error instanceof UnauthorizedError) {
      return res.status(401).json({ message: error.message });
    }

    console.error(error);
    res.status(500).end();
  }
}

export default ErrorMiddleware;
