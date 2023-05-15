import { NextFunction, Request, Response } from 'express';
import ValidationError from '../utils/ValidationError';
import { LoginAtributes } from '../services/login.service';
import UnauthorizedError from '../utils/UnauthorizedError';

const verifyUser = (body: LoginAtributes) => {
  const { email, password } = body;
  const emailRegex = /\S+@\S+\.\S+/;

  if (!emailRegex.test(email)) throw new UnauthorizedError('Invalid email or password');
  if (password.length < 6) throw new UnauthorizedError('Invalid email or password');
};

const verifyLogin = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ValidationError('All fields must be filled');
  }

  verifyUser({ email, password });

  next();
};

export default verifyLogin;
