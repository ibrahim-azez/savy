import { Router } from 'express';
import Container from 'typedi';

import { loginMiddleware } from '@core';

import { AuthController } from './auth.controller';

export const authRouter = Router();
const authController = Container.get(AuthController);

authRouter.post('/signup', authController.signup.bind(authController));
authRouter.post(
  '/login',
  loginMiddleware,
  authController.login.bind(authController)
);
authRouter.post(
  '/forgot-password',
  authController.forgotPassword.bind(authController)
);
authRouter.delete(
  '/confirm-new-password',
  authController.confirmNewPassword.bind(authController)
);
