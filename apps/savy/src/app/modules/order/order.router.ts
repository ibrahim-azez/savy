import { Router } from 'express';

import { OrderController } from './order.controller';
import Container from 'typedi';

export const orderRouter = Router();
const orderController = Container.get(OrderController);

orderRouter.post('/create', orderController.create.bind(orderController));
orderRouter.patch('/update/:id', orderController.update.bind(orderController));
orderRouter.get('/get-by', orderController.getBy.bind(orderController));
orderRouter.get('/get-all', orderController.getAll.bind(orderController));
orderRouter.delete('/delete/:id', orderController.delete.bind(orderController));
