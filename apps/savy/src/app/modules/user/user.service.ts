import { Service } from 'typedi';
import * as createError from 'http-errors';

import { User } from './user.entity';
import { UserRepository } from './user.repository';

import { CrudService, HttpResponse } from '@core';
import { GetByUserDto } from './models/get-by-user-dto.model';

@Service()
export class UserService implements CrudService<User> {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: User) {
    return await this.userRepository.createOne(user);
  }

  async getBy(user: GetByUserDto) {
    return await this.userRepository.getBy(user);
  }

  async getAll(): Promise<Array<User>> {
    return await this.userRepository.getAll();
  }

  async update(id: number, userToBeUpdated: Partial<User>) {
    await this.userRepository.update(id, userToBeUpdated).catch((err) => {
      throw createError(400, 'Check your credentials');
    });

    return (await this.userRepository.getBy({ id: id })) as User | null;
  }

  async delete(id: number): Promise<HttpResponse> {
    if (await this.userRepository.delete(id))
      return {
        statusCode: 200,
        message: 'User deleted successfully',
      };

    return {
      statusCode: 400,
      message: 'User failed to be deleted',
    };
  }
}
