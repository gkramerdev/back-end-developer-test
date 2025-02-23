import bcrypt from 'bcryptjs';
import User, { IUser } from '../../domain/entities/user.entity';

class UserRepository {
  async createUser(name: string, email: string, password: string): Promise<IUser> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    return user;
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).exec();
  }

  async findAllUsers(): Promise<IUser[]> {
    return await User.find().exec();
  }

  async updateUser(id: string, name?: string, email?: string, password?: string): Promise<IUser | null> {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }

    return await User.findByIdAndUpdate(id, { name, email, password }, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<void> {
    await User.findByIdAndDelete(id).exec();
  }
}

export default UserRepository;
