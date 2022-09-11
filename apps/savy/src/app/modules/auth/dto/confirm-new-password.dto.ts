import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { environment } from '@environment';

export class ConfirmNewPasswordDto {
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

  constructor(confirmNewPassword: ConfirmNewPasswordDto) {
    this.password = confirmNewPassword.password;
    this.confirmPassword = confirmNewPassword.confirmPassword;
  }
}
