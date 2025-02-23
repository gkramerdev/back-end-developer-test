import UserService from '../services/user.service';
import { Request, Response } from 'express';
import { generateToken } from '../../infrastructure/configuration/jwt/jwt.config';
import UserRepository from '../../domain/repositories/user.repository';
import { sendWelcomeEmail } from '../../infrastructure/utils/nodemailer';

const userRepository = new UserRepository();

const userService = new UserService(userRepository);

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const existingUser = await userRepository.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      const user = await userService.createUser(name, email, password);
      const token = generateToken(user._id.toString());

      await sendWelcomeEmail(email, name);

      return res.status(201).json({ user, token });
    } catch (error) {
      return res.status(500).json({ message: 'Error registering user', error });
    }
  }

  async getAllUser(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Error finding all users', error });
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const user = await userService.getUserByEmail(email);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Error finding user', error });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const user = await userService.updateUser(id, name, email, password);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating user', error });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting user', error });
    }
  }
}

export default new UserController();
