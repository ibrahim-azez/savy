import { NextFunction, Request, Response } from 'express';
import * as passport from 'passport';

export const loginMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('local', function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(401)
        .json({ statusCode: 401, message: 'Wrong email or password' });
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return next();
    });
  })(req, res);
};
