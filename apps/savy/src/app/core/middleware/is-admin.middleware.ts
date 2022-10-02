import { User } from '@modules/user/user.entity';
import { NextFunction, Request, Response } from 'express';

import { HttpResponse } from '../models/http-response.model';

export async function isAdminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if ((req.user as Partial<User>).role !== 'ADMIN')
    return res.status(401).json({
      statusCode: 401,
      message: 'You are not authorized',
    } as HttpResponse);

  return next();
}
