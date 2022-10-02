import { Service } from 'typedi';
import { BaseRepository } from '../../core/bases/base.repository';

import { Product } from './product.entity';

@Service()
export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super(Product);
  }
}
