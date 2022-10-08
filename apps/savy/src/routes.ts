import * as express from 'express';
import { app } from './app';
import { ErrorHandlerMiddleware } from './app/core/middleware/error-handler.middleware';
import { isAdminMiddleware } from './app/core/middleware/is-admin.middleware';
import { isAuthMiddleware } from './app/core/middleware/is-auth-middleware';
import { authRouter } from './app/modules/auth/auth.router';
import { cartRouter } from './app/modules/cart/cart.router';
import { userRouter } from './app/modules/user/user.router';

// import { authRouter, productRouter, userRouter } from '@modules';
// import { isAdminMiddleware, isAuthMiddleware } from '@core';
import { orderRouter } from './app/modules/order/order.router';

export const routes = app;

//            ------- ROUTES -------
const rootUrl = '/api/v1';
routes.use(`${rootUrl}/auth`, authRouter);
routes.use(`${rootUrl}/user`, isAuthMiddleware, userRouter);
routes.use(`${rootUrl}/cart`, isAuthMiddleware, cartRouter);
routes.use(`${rootUrl}/order`, isAuthMiddleware, orderRouter);

routes.get(
  `${rootUrl}/protected-route`,
  isAuthMiddleware,
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('authenticated');
  }
);
routes.get(
  `${rootUrl}/admin-route`,
  isAdminMiddleware,
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('authenticated');
  }
);
