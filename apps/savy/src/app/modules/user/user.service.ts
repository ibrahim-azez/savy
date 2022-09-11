import { Service } from 'typedi';
import { BaseService } from '../../core/bases/base.service';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Service()
export class UserService extends BaseService<User> {
  constructor(private readonly userRepository: UserRepository) {
    super(User);
  }

  async create(user: User) {
    return await this.userRepository.create(user);
  }

  async update(user: Partial<User>) {
    return await this.userRepository.create(user);
  }

  async getAll() {
    return await this.userRepository.getAll();
  }

  async getBy(user: Partial<User>) {
    return await this.userRepository.getBy(user);
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }
}
