import { Router } from 'express';
import { UserController } from './user.controller';
import Container from 'typedi';

export const userRouter = Router();
const userController = Container.get(UserController);

userRouter.post('create', userController.create.bind(userController));
userRouter.post('update', userController.update.bind(userController));
userRouter.get('get-all', userController.getAll.bind(userController));
userRouter.get('get-by', userController.getBy.bind(userController));
userRouter.get('delete/:id', userController.delete.bind(userController));
