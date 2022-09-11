import { Response, Request } from 'express';
import { Service } from 'typedi';
import { TryCatchController } from '../../core/decorators/try-catch-controller';
import { UserService } from './user.service';

@Service()
export class UserController {
  constructor(private userService: UserService) {}

  @TryCatchController()
  async create(req: Request, res: Response) {
    res.send(await this.userService.create(req.body));
  }

  @TryCatchController()
  async update(req: Request, res: Response) {
    res.send(await this.userService.getAll());
  }

  @TryCatchController()
  async getBy(req: Request, res: Response) {
    res.send(await this.userService.getBy(req.body));
  }

  @TryCatchController()
  async getAll(req: Request, res: Response) {
    res.send(await this.userService.getAll());
  }

  @TryCatchController()
  async delete(req: Request, res: Response) {
    res.send(await this.userService.delete(req.params['id']));
  }
}
