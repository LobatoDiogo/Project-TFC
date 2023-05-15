import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import verifyLogin from '../middlewares/UserMiddleware';

const loginRouter = Router();

loginRouter
  .post('/', verifyLogin, LoginController.userLogin);

export default loginRouter;
