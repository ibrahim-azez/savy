import { Service } from 'typedi';
import { BaseRepository } from '../../core/bases/base.repository';

// import { BaseRepository } from '@core';

import { Order } from '../order/order.entity';

@Service()
export class OrderRepository extends BaseRepository<Order> {
  constructor() {
    super(Order);
  }
}
