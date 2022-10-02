import { Response, Request } from 'express';
import { Service } from 'typedi';

import { UserService } from './user.service';
import { CreateUserDto } from './models/create-user-dto.model';
import { UpdateUserDto } from './models/update-user-dto.model';
import { User } from './user.entity';
import { GetByUserDto } from './models/get-by-user-dto.model';

import { ValidateBody, ValidateParamsId, TryCatchController } from '@core';

// import { TryCatchController, ValidateBody } from '@core';

@Service()
export class UserController {
  constructor(private userService: UserService) {}

  @ValidateBody(CreateUserDto)
  @TryCatchController()
  async create(req: Request, res: Response) {
    return res.status(201).send(await this.userService.create(req.body));
  }

  @ValidateBody(GetByUserDto)
  @TryCatchController()
  async getBy(req: Request, res: Response) {
    return res.status(200).send(await this.userService.getBy(req.body));
  }

  @TryCatchController()
  async getAll(req: Request, res: Response) {
    return res.status(200).send(await this.userService.getAll());
  }

  @ValidateBody(UpdateUserDto)
  @ValidateParamsId()
  @TryCatchController()
  async update(req: Request, res: Response) {
    return res
      .status(200)
      .send(await this.userService.update(+req.params['id'], req.body));
  }

  @ValidateParamsId()
  @TryCatchController()
  async delete(req: Request, res: Response) {
    return res
      .status(200)
      .send(await this.userService.delete(+req.params['id']));
  }

  @ValidateBody(UpdateUserDto)
  @TryCatchController()
  async updateAccount(req: Request, res: Response) {
    return res
      .status(200)
      .send(
        await this.userService.update(
          (req.user as Partial<User>).id as number,
          req.body
        )
      );
  }

  @TryCatchController()
  async deleteAccount(req: Request, res: Response) {
    return res
      .status(200)
      .send(
        await this.userService.delete((req.user as Partial<User>).id as number)
      );
  }
}
