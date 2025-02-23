import bcrypt from 'bcryptjs';
import UserRepository from '../../domain/repositories/user.repository';
import { generateToken } from '../../infrastructure/configuration/jwt/jwt.config';

class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('invalid credentials');
    }

    const token = generateToken(user._id.toString());
    return { user, token };
  }
}

export default new AuthService();
