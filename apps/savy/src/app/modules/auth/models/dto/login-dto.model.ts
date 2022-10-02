import { environment } from '@environment';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(environment.PASSWORD_MIN_LENGTH)
  @MaxLength(environment.PASSWORD_MAX_LENGTH)
  password: string;

  constructor(login: LoginDto) {
    this.email = login.email;
    this.password = login.password;
  }
}
