import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import verifyLogin from '../middlewares/UserMiddleware';
import tokenVerify from '../middlewares/TokenMiddleware';

const loginRouter = Router();

loginRouter
  .post('/', verifyLogin, LoginController.userLogin)
  .get('/role', tokenVerify, LoginController.getByRole);

export default loginRouter;
