import { compare } from 'bcryptjs';
import UserModel from '../database/models/user.model';
import UnauthorizedError from '../utils/UnauthorizedError';
import { generateToken } from '../utils/Auth';

export type LoginAtributes = {
  email: string;
  password: string;
};

class LoginService {
  public static async userLogin(login: LoginAtributes): Promise<string> {
    const { email, password } = login;

    const user = await UserModel.findOne({ where: { email } });
    if (!user) throw new UnauthorizedError('Invalid email or password');

    const verifyPassword = await compare(password, user.password);
    if (!verifyPassword) throw new UnauthorizedError('Invalid email or password');

    const token = generateToken(user.id);
    return token;
  }

  public static async getByRole(id: number) {
    const user = await UserModel.findOne({ where: { id } });
    if (!user) throw new UnauthorizedError('User does not exists');
    return user.role;
  }
}

export default LoginService;
