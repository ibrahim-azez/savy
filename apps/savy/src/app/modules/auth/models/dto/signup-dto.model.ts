import { environment } from '@environment';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(environment.USERNAME_MIN_LENGTH)
  @MaxLength(environment.USERNAME_MAX_LENGTH)
  username!: string;

  @IsString()
  @MinLength(environment.PASSWORD_MIN_LENGTH)
  @MaxLength(environment.PASSWORD_MAX_LENGTH)
  password!: string;

  @IsString()
  @MinLength(environment.PASSWORD_MIN_LENGTH)
  @MaxLength(environment.PASSWORD_MAX_LENGTH)
  confirmPassword!: string;

  constructor(signup: SignupDto) {
    try {
      this.email = signup.email;
      this.username = signup.username;
      this.password = signup.password;
      this.confirmPassword = signup.confirmPassword;
    } catch (err) {
      return;
    }
  }
}
