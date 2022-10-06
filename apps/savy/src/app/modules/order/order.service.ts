import { Service } from 'typedi';

import { User } from '@modules/user/user.entity';
import { HttpResponse } from '@core';

import { UserRepository } from '../user/user.repository';
import { ProductRepository } from '../../dump-modules/product/product.repository';
import { UpdateOrderDto } from './models/update-order-dto.model';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './models/create-order-dto.model';

@Service()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository
  ) {}

  async create(user: User, createOrder: CreateOrderDto) {
    const [products] = await Promise.all([
      this.productRepository.create(createOrder.products),
    ]);

    const order = await this.orderRepository.create([
      {
        quantity: createOrder.products.length,
        user: user,
        products: products,
      },
    ]);

    return order;
  }

  async update(cartId: number, user: User, cartToBeUpdated: Partial<Cart>) {
    // const updatedUser = await this.cartRepository
    //   .update(cartId, {
    //     quantity: cartToBeUpdated.products?.length,
    //     user: user,
    //     products: cartToBeUpdated.products,
    //   })
    //   .catch((err) => {
    //     throw createError(400, 'Check your credentials');
    //   });

    // if (!updatedUser) throw createError(404, 'product does not exist');

    return (await this.cartRepository.getBy({
      id: cartId,
    })) as unknown as Cart;
  }

  async getBy(order: GetByCartDto) {
    return await this.cartRepository.getBy(order);
  }

  async getAll() {
    return await this.cartRepository.getAll();
  }

  async delete(id: number): Promise<HttpResponse> {
    if (await this.cartRepository.delete(id))
      return {
        statusCode: 200,
        message: 'Product deleted successfully',
      };

    return {
      statusCode: 400,
      message: 'Product failed to be deleted',
    };
  }
}
