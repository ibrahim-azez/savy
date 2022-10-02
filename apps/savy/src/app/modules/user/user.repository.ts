import { Service } from 'typedi';
import { BaseRepository } from '../../core/bases/base.repository';
// import { BaseRepository } from '@core';
import { User } from './user.entity';

@Service()
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }
}
