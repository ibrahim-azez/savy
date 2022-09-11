import { environment } from '@environment';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(environment.PASSWORD_MIN_LENGTH)
  @MaxLength(environment.PASSWORD_MAX_LENGTH)
  @IsNotEmpty()
  password: string;

  @IsString()
  @MinLength(environment.PASSWORD_MIN_LENGTH)
  @MaxLength(environment.PASSWORD_MAX_LENGTH)
  @IsNotEmpty()
  confirmPassword: string;

  constructor(signup: SignupDto) {
    this.email = signup.email;
    this.password = signup.password;
    this.confirmPassword = signup.confirmPassword;
  }
}
