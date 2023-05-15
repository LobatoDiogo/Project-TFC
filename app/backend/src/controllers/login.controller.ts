import { Request, Response } from 'express';
import LoginService from '../services/login.service';

class LoginController {
  public static async userLogin(req: Request, res: Response) {
    const token = await LoginService.userLogin(req.body);
    return res.status(200).json({ token });
  }
}

export default LoginController;
