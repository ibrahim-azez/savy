import { Service } from 'typedi';
import { BaseRepository } from '../../core/bases/base.repository';

// import { BaseRepository } from '@core';

import { Cart } from './cart.entity';

@Service()
export class CartRepository extends BaseRepository<Cart> {
  constructor() {
    super(Cart);
  }
}
