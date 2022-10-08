import { Service } from 'typedi';
import { BaseRepository } from '../../core/bases/base.repository';

import { Payment } from './payment.entity';

@Service()
export class PaymentRepository extends BaseRepository<Payment> {
  constructor() {
    super(Payment);
  }
}
