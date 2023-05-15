import * as jwt from 'jsonwebtoken';

const secretKey: jwt.Secret = process.env.JWT_SECRET || 'secret';
const configJWT: jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (payload: number) => {
  const clonedPayload = { payload };

  const myToken = jwt.sign(clonedPayload, secretKey, configJWT);

  return myToken;
};

const validateToken = (token: string) => {
  const isValidToken = jwt.verify(token, secretKey);
  return isValidToken;
};

export {
  generateToken,
  validateToken,
};
