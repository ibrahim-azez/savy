import { Router } from 'express';

import { CartController } from './cart.controller';
import Container from 'typedi';

export const cartRouter = Router();
const cartController = Container.get(CartController);

cartRouter.post('/create', cartController.create.bind(cartController));
cartRouter.patch('/update/:id', cartController.update.bind(cartController));
cartRouter.get('/get-by', cartController.getBy.bind(cartController));
cartRouter.get('/get-all', cartController.getAll.bind(cartController));
cartRouter.delete('/delete/:id', cartController.delete.bind(cartController));
