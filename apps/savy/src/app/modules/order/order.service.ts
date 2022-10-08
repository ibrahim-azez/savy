import { Service } from 'typedi';

import { User } from '@modules/user/user.entity';
import { HttpResponse } from '@core';

import { UserRepository } from '../user/user.repository';
import { ProductRepository } from '../../dump-modules/product/product.repository';
import { UpdateOrderDto } from './models/update-order-dto.model';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './models/create-order-dto.model';
import { Entity } from 'typeorm';
import { GetByOrderDto } from './models/get-by-order-dto.model';
import { Order } from './order.entity';
import { CartRepository } from '../cart/cart.repository';
import * as createError from 'http-errors';
import { PaymentRepository } from '../../dump-modules/payment/payment.repository';

@Service()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly cartRepository: CartRepository,
    private readonly paymentRepository: PaymentRepository
  ) {}

  async create(user: User, createOrder: CreateOrderDto) {
    const payment = await this.paymentRepository.createOne(createOrder.payment);
    const cart = await this.cartRepository.get({
      where: {
        id: createOrder.cartId as number,
      },
      relations: {
        products: true,
      },
    });
    console.log(cart, payment);

    if (!cart || !payment)
      throw createError(
        404,
        'cart either failed to be deleted or does not exist'
      );

    const order = await this.orderRepository.createOne({
      name: createOrder.name,
      quantity: cart.quantity,
      user: user,
      products: cart.products,
      payment: payment,
    });

    return order;
  }

  async update(cartId: number, user: User, cartToBeUpdated: Partial<Order>) {
    // const updatedUser = await this.orderRepository
    //   .update(cartId, {
    //     quantity: cartToBeUpdated.products?.length,
    //     user: user,
    //     products: cartToBeUpdated.products,
    //   })
    //   .catch((err) => {
    //     throw createError(400, 'Check your credentials');
    //   });

    // if (!updatedUser) throw createError(404, 'product does not exist');

    return (await this.orderRepository.getBy({
      id: cartId,
    })) as unknown as Order;
  }

  async getBy(order: GetByOrderDto) {
    return await this.orderRepository.getBy(order);
  }

  async getAll() {
    return await this.orderRepository.getAll();
  }

  async delete(id: number): Promise<HttpResponse> {
    if (await this.orderRepository.delete(id))
      return {
        statusCode: 200,
        message: 'Order deleted successfully',
      };

    return {
      statusCode: 400,
      message: 'Order either failed to be deleted or does not exist',
    };
  }
}
