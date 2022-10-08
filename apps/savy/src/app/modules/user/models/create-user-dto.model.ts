import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';

import { environment } from '@environment';
import { IsOnlyDate } from '@core';
// import { IsOnlyDate } from '@core';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  username!: string;

  @IsString()
  fullName!: string;

  @IsOnlyDate()
  dateOfBirth!: string;

  @IsEnum({ ADMIN: 'ADMIN', USER: 'USER', GUEST: 'GUEST' })
  role!: 'ADMIN' | 'USER' | 'GUEST';

  @IsString()
  @MinLength(environment.PASSWORD_MIN_LENGTH)
  @MaxLength(environment.PASSWORD_MAX_LENGTH)
  password!: string;

  @IsString()
  @MinLength(environment.PASSWORD_MIN_LENGTH)
  @MaxLength(environment.PASSWORD_MAX_LENGTH)
  confirmPassword!: string;

  constructor(createUserDto: CreateUserDto) {
    try {
      this.email = createUserDto.email;
      this.username = createUserDto.username;
      this.fullName = createUserDto.fullName;
      this.dateOfBirth = createUserDto.dateOfBirth;
      this.role = createUserDto.role;
      this.password = createUserDto.password;
      this.confirmPassword = createUserDto.confirmPassword;
    } catch (err) {
      return;
    }
  }
}
