import { environment } from '@environment';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(environment.PASSWORD_MIN_LENGTH)
  @MaxLength(environment.PASSWORD_MAX_LENGTH)
  @IsNotEmpty()
  password: string;


  constructor(login: LoginDto) {
    this.email = login.email;
    this.password = login.password;

  }
}
