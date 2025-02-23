import UserRepository from '../../domain/repositories/user.repository';

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(name: string, email: string, password: string) {
    return await this.userRepository.createUser(name, email, password);
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email);
  }

  async getAllUsers() {
    return await this.userRepository.findAllUsers();
  }

  async updateUser(id: string, name?: string, email?: string, password?: string) {
    return await this.userRepository.updateUser(id, name, email, password);
  }

  async deleteUser(id: string) {
    return await this.userRepository.deleteUser(id);
  }
}

export default UserService;
