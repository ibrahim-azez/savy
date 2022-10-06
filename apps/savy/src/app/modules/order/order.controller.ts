import { Response, Request } from 'express';
import { Service } from 'typedi';

import { CreateOrderDto } from './models/create-order-dto.model';
import { UpdateOrderDto } from './models/update-order-dto.model';
import { GetByOrderDto } from './models/get-by-order-dto.model';
import { OrderService } from './order.service';

import { ValidateParamsId, TryCatchController, ValidateBody } from '@core';

import { User } from '../user/user.entity';

@Service()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ValidateBody(CreateOrderDto)
  @TryCatchController()
  async create(req: Request, res: Response) {
    return res
      .status(201)
      .send(await this.orderService.create(req.user as User, req.body));
  }

  @ValidateBody(UpdateOrderDto)
  @ValidateParamsId()
  @TryCatchController()
  async update(req: Request, res: Response) {
    return res
      .status(200)
      .send(
        await this.orderService.update(
          +req.params['id'],
          req.user as User,
          req.body
        )
      );
  }

  @ValidateBody(GetByOrderDto)
  @TryCatchController()
  async getBy(req: Request, res: Response) {
    return res.status(200).send(await this.orderService.getBy(req.body));
  }

  @TryCatchController()
  async getAll(req: Request, res: Response) {
    return res.status(200).send(await this.orderService.getAll());
  }

  @ValidateParamsId()
  @TryCatchController()
  async delete(req: Request, res: Response) {
    return res
      .status(200)
      .send(await this.orderService.delete(+req.params['id']));
  }
}
