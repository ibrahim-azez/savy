import { Service } from 'typedi';

import { HttpResponse } from '@core';
// import { User } from '@modules';
// import { ProductRepository } from '@dump-modules';

import { Cart } from './cart.entity';
import { CartRepository } from './cart.repository';
import { GetByCartDto } from './models/get-by-cart-dto.model';
import { CreateCartDto } from './models/create-cart-dto.model';
import { UserRepository } from '../user/user.repository';
import { User } from '@modules/user/user.entity';
import { ProductRepository } from '../../dump-modules/product/product.repository';

@Service()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository
  ) {}

  async create(user: User, createCart: CreateCartDto) {
    const [products] = await Promise.all([
      this.productRepository.create(createCart.products),
    ]);

    const cart = await this.cartRepository.create([
      {
        quantity: createCart.products.length,
        user: user,
        products: products,
      },
    ]);

    return cart;
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

  async getBy(cart: GetByCartDto) {
    return await this.cartRepository.getBy(cart);
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
