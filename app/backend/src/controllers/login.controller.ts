import { Request, Response } from 'express';
import LoginService from '../services/login.service';

class LoginController {
  public static async userLogin(req: Request, res: Response) {
    const token = await LoginService.userLogin(req.body);
    return res.status(200).json({ token });
  }

  public static async getByRole(req: Request, res: Response) {
    const { tokenAuth } = req.body;
    const role = await LoginService.getByRole(tokenAuth.payload);
    return res.status(200).json({ role });
  }
}

export default LoginController;
