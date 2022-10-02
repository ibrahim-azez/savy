import { NextFunction, Request, Response } from 'express';

export async function isAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.isAuthenticated())
    return res.status(401).json({
      statusCode: 401,
      message: 'NOT_AUTHENTICATED',
      authenticated: false,
    });

  return next();
}
