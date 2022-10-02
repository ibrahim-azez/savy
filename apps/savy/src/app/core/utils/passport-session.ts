import {
  IStrategyOptionsWithRequest,
  IVerifyOptions,
  Strategy as LocalStrategy,
  VerifyFunctionWithRequest,
} from 'passport-local';
import * as passport from 'passport';
import Container from 'typedi';
import { Request } from 'express';

// import { UserRepository, User } from '@modules';
import { ExtractStringKeys } from '@core';

import { isPasswordValid } from './is-password-valid';
import { UserRepository } from '@modules/user/user.repository';
import { User } from '@modules/user/user.entity';

const userRepository = Container.get(UserRepository);

const customFields: IStrategyOptionsWithRequest = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

export const verifyPassportSession: VerifyFunctionWithRequest = async (
  req: Request,
  username: string,
  password: string,
  done: (error: any, user?: any, options?: IVerifyOptions) => void
) => {
  try {
    const user = await userRepository.get({
      where: { email: req.body.email },
      select: [
        'id',
        'email',
        'fullName',
        'dateOfBirth',
        'profilePicture',
        'role',
        'password',
        'createdAt',
      ] as Array<ExtractStringKeys<User>>,
    });

    if (!user) return done(null, false, { message: 'User does not exist' });

    if (!(await isPasswordValid(user as unknown as User, password)))
      return done(null, false, { message: 'Wrong email or password' });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

export const localStrategy = new LocalStrategy(
  customFields,
  verifyPassportSession
);

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user.id);
});

passport.deserializeUser(
  (userId: any, done: (err: any, user?: any | false | null) => void) => {
    const user = userRepository.getBy({ id: userId });
    user
      .then((user: any) => {
        done(null, user);
      })
      .catch((err: any) => done(err));
  }
);

passport.use(localStrategy);
