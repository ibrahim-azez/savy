import { Response, Request, NextFunction } from 'express';
import { Service } from 'typedi';
import { ValidateBody } from '../../core/decorators/validate-body';

import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import Container from 'typedi';

import { TryCatchController } from '../../core/decorators/try-catch-controller';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Service()
export class AuthController {
  // authService = Container.get(AuthService);
  constructor(private authService: AuthService) {}

  @ValidateBody(SignupDto)
  @TryCatchController()
  async signup(req: Request, res: Response) {
    res.status(201).json(await this.authService.signup(req.body));
  }

  @ValidateBody(LoginDto)
  @TryCatchController()
  async login(req: Request, res: Response) {
    res.status(200).json(await this.authService.login(req.body));
  }

  @ValidateBody(ForgotPasswordDto)
  @TryCatchController()
  async forgotPassword(req: Request, res: Response) {
    res
      .status(200)
      .send(await this.authService.forgotPassword(req.body, req.originalUrl));
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
