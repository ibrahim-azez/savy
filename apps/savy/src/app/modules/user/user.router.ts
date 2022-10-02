import { Router } from 'express';

import Container from 'typedi';

import { isAdminMiddleware } from '@core';

import { UserController } from './user.controller';

export const userRouter = Router();
const userController = Container.get(UserController);

/**
 *  ----------------- ONLY ADMIN IS AUTHORIZED -------------------
 */
userRouter.post(
  '/create',
  isAdminMiddleware,
  userController.create.bind(userController)
);
userRouter.patch(
  '/update/:id',
  isAdminMiddleware,
  userController.update.bind(userController)
);

userRouter.get(
  '/get-all',
  isAdminMiddleware,
  userController.getAll.bind(userController)
);

userRouter.delete(
  '/delete/:id',
  isAdminMiddleware,
  userController.delete.bind(userController)
);

/**
 *  ----------------- Authenticated user and ADMIN IS AUTHORIZED -------------------
 */

userRouter.patch(
  '/update-account',
  userController.updateAccount.bind(userController)
);
userRouter.get('/get-by', userController.getBy.bind(userController));
userRouter.delete(
  '/delete-account',
  userController.deleteAccount.bind(userController)
);
