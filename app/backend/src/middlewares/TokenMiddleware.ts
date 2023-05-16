import { NextFunction, Request, Response } from 'express';
import UnauthorizedError from '../utils/UnauthorizedError';
import { validateToken } from '../utils/Auth';

const tokenVerify = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) throw new UnauthorizedError('Token not found');

  try {
    const tokenAuth = validateToken(authorization);
    req.body.tokenAuth = tokenAuth;
    return next();
  } catch (err) {
    throw new UnauthorizedError('Token must be a valid token');
  }
};
export default tokenVerify;
