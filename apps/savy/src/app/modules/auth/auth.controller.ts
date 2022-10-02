import { Response, Request } from 'express';
import { Service } from 'typedi';

import { HttpResponse, ValidateBody, TryCatchController } from '@core';

import { AuthService } from './auth.service';
import { SignupDto } from './models/dto/signup-dto.model';
import { LoginDto } from './models/dto/login-dto.model';
import { ForgotPasswordDto } from './models/dto/forgot-password-dto.model';
import { Auth } from './models/auth.model';
import { User } from '../user/user.entity';

@Service()
export class AuthController implements Auth {

  constructor(private authService: AuthService) {}

  @ValidateBody(SignupDto)
  @TryCatchController()
  async signup(req: Request, res: Response) {
    res.status(201).json(await this.authService.signup(req.body));
  }

  @ValidateBody(LoginDto)
  @TryCatchController()
  async login(req: Request, res: Response) {
    res
      .status(200)
      .json(await this.authService.login(req.user as Partial<User>));
  }

  @ValidateBody(ForgotPasswordDto)
  @TryCatchController()
  async forgotPassword(req: Request, res: Response) {
    const origin = req.headers?.['origin'];

    if (origin)
      return res
        .status(200)
        .send(
          await this.authService.forgotPassword(req.body, origin as string)
        );

    return res.status(500).json({
      statsCode: 500,
      message: 'Something went wrong',
    } as unknown as HttpResponse);
  }

  @ValidateBody(ForgotPasswordDto)
  @TryCatchController()
  async confirmNewPassword(req: Request, res: Response) {
    res
      .status(200)
      .send(
        await this.authService.confirmNewPassword(req.body, req.cookies['auth'])
      );
  }
}
