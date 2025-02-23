import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);

      res.status(200).json({ user, token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
}

export default new AuthController();
