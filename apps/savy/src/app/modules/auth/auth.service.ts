import { Service } from 'typedi';
import { UserRepository } from '../user/user.repository';
import { SignupDto } from './dto/signup.dto';
import * as createError from 'http-errors';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from '../user/user.entity';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ConfirmNewPasswordDto } from './dto/confirm-new-password.dto';

const scrypt = promisify(_scrypt);

@Service()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async hashingPassword(password: string): Promise<string> {
    // Hash the users password
    // Generate a salt
    const salt: string = randomBytes(32).toString('hex');
    // Hash the salt and the password together
    const hash: Buffer = (await scrypt(password, salt, 32)) as Buffer;
    // Join the hashed result and the salt together
    return salt + '.' + hash.toString('hex');
  }

  // @TryCatchWrapper(400, 'password')
  async signup(signup: SignupDto) {
    const { email, password, confirmPassword } = signup;

    // const res = new Response().clone();

    const user = await this.userRepository.getBy({ email });
    console.log(user);
    if (user) throw createError(409, 'User does exist  ');

    if (password !== confirmPassword)
      throw createError(400, 'passwords do not match');

    const hashedPassword = await this.hashingPassword(password);

    return this.userRepository.create({ email, password: hashedPassword });
  }

  async login(login: LoginDto): Promise<User> {
    const { email, password } = login;

    const user = await this.userRepository.getBy({
      email,
    });
    if (!user) throw createError(400, 'Wrong Username or Password');

    const [salt, storedHashedPassword] = user.password.split('.');

    const hashedPassword: Buffer = (await scrypt(
      password,
      salt,
      32
    )) as unknown as Buffer;

    if (storedHashedPassword !== hashedPassword.toString('hex'))
      throw createError(400, 'Wrong password');

    // const authToken: string = await this.myJWTService.signToken({
    //   id: user._id.toString(),
    //   email,
    // });

    return user;
  }

  async forgotPassword(
    forgotPassword: ForgotPasswordDto,
    requestHeadersOrigin: string
  ): Promise<{ status: string }> {
    const { email } = forgotPassword;

    const user = await this.userRepository.getBy({ email });

    if (!user) throw createError(400, 'Wrong Username or Password');

    // const authToken: string = await this.myJWTService.signToken(
    // 	{ id: user._id.toString(), email: user.email },
    // 	{
    // 		expiresIn: '1h',
    // 	}
    // );

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

    return { status: 'Email has ben send' };
  }

  async confirmNewPassword(
    confirmNewPassword: ConfirmNewPasswordDto,
    authToken: string
  ): Promise<any> {
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
  }
}
