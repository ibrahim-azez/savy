import { Response, Request } from 'express';
import { Service } from 'typedi';

import { CreateCartDto } from './models/create-cart-dto.model';
import { UpdateCartDto } from './models/update-cart-dto.model';
import { GetByCartDto } from './models/get-by-cart-dto.model';
import { CartService } from './cart.service';

import { ValidateParamsId, TryCatchController, ValidateBody } from '@core';

import { User } from '../user/user.entity';


@Service()
export class CartController {
  constructor(private cartService: CartService) {}

  @ValidateBody(CreateCartDto)
  @TryCatchController()
  async create(req: Request, res: Response) {
    return res
      .status(201)
      .send(await this.cartService.create(req.user as User, req.body));
  }

  @ValidateBody(UpdateCartDto)
  @ValidateParamsId()
  @TryCatchController()
  async update(req: Request, res: Response) {
    return res
      .status(200)
      .send(
        await this.cartService.update(
          +req.params['id'],
          req.user as User,
          req.body
        )
      );
  }

  @ValidateBody(GetByCartDto)
  @TryCatchController()
  async getBy(req: Request, res: Response) {
    return res.status(200).send(await this.cartService.getBy(req.body));
  }

  @TryCatchController()
  async getAll(req: Request, res: Response) {
    return res.status(200).send(await this.cartService.getAll());
  }

  @ValidateParamsId()
  @TryCatchController()
  async delete(req: Request, res: Response) {
    return res
      .status(200)
      .send(await this.cartService.delete(+req.params['id']));
  }
}
