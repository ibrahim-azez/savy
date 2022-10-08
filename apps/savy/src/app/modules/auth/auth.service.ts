import { Service } from 'typedi';
import { UserRepository } from '../user/user.repository';
import * as createError from 'http-errors';

import { User } from '../user/user.entity';
import { SignupDto } from './models/dto/signup-dto.model';
import { ForgotPasswordDto } from './models/dto/forgot-password-dto.model';
import { ConfirmNewPasswordDto } from './models/dto/confirm-new-password-dto.model';
import { HttpResponse, hashingPassword } from '@core';

// import { hashingPassword, isPasswordValid, HttpResponse } from '@core';

@Service()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signup(signup: SignupDto): Promise<User> {
    const { email, username, password, confirmPassword } = signup;

    const user = await this.userRepository.getBy([{ email }, { username }]);

    if (user) throw createError(409, 'User does exist');

    if (password !== confirmPassword)
      throw createError(400, 'passwords do not match');

    const { salt, hashedPassword } = await hashingPassword(password);

    return (await this.userRepository.createOne({
      email,
      username,
      password: salt + '.' + hashedPassword,
    })) as User;
  }

  async login(user: Partial<User>): Promise<Partial<User>> {
    const { role, password, ...loggedInUser } = user;

    return loggedInUser;
  }

  async forgotPassword(
    forgotPassword: ForgotPasswordDto,
    requestHeadersOrigin: string
  ): Promise<HttpResponse> {
    const { email } = forgotPassword;

    const user = await this.userRepository.getBy({ email });

    if (!user) throw createError(400, 'Wrong Username or Password');

    // const authTokenURL = `${requestHeadersOrigin}/auth/confirm-new-password/${authToken}`;

    // this.nodemailerService.sendEmail({
    // 	to: email,
    // 	subject: 'Forgot Your Password',
    // 	additionalInfo: {
    // 		bodyText: 'Reset your password by clicking on the button bellow.',
    // 		expiresDate: '1 hour',
    // 		buttonText: 'Reset your password',
    // 	},
    // 	authTokenURL: authTokenURL,
    // });

    return { statusCode: 200, message: 'Email has ben send' };
  }

  async confirmNewPassword(
    confirmNewPassword: ConfirmNewPasswordDto,
    authToken: string
  ): Promise<HttpResponse> {
    const { password, confirmPassword } = confirmNewPassword;

    if (password !== confirmPassword)
      throw createError(400, 'Passwords do not match');

    // const verifyToken = await this.myJWTService.verifyToken(authToken);

    // const user = await this.userRepository.get(
    // 	verifyToken.id
    // );

    // if (!user) throw  createError(404,'User does not exist');

    // const [newAuthToken, hashedPassword] = await Promise.all([
    // 	this.myJWTService.signToken({
    // 		email: user.email,
    // 	}),
    // 	HashingService.hashingPassword(password),
    // ]);
    return { statusCode: 200, message: '' };
  }
}
