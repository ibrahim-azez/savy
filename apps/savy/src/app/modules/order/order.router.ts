import { Router } from 'express';

import { OrderController } from './order.controller';
import Container from 'typedi';

export const cartRouter = Router();
const orderController = Container.get(OrderController);

cartRouter.post('/create', orderController.create.bind(orderController));
cartRouter.patch('/update/:id', orderController.update.bind(orderController));
cartRouter.get('/get-by', orderController.getBy.bind(orderController));
cartRouter.get('/get-all', orderController.getAll.bind(orderController));
cartRouter.delete('/delete/:id', orderController.delete.bind(orderController));
