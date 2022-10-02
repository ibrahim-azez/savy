import { DataSource } from 'typeorm';

// import { Product, User } from '@modules';
import { Session, Order, Payment, Discount } from '@core';
// import { Product } from '@dump-modules';
import { User } from '@modules/user/user.entity';
import { Cart } from '@modules/cart/cart.entity';
import { Product } from '../../dump-modules/product/product.entity';
// import { User, Cart } from '@modules';

export const myDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  database: 'savy',
  username: 'root',
  password: 'password',
  port: 3306,
  entities: [User, Session, Product, Discount, Cart, Order, Payment],
  cache: true,
  synchronize: true,
});
