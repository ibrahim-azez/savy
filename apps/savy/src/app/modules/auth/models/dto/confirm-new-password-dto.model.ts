import { IsString, MaxLength, MinLength } from 'class-validator';

import { environment } from '@environment';

export class ConfirmNewPasswordDto {
  @IsString()
  @MinLength(environment.PASSWORD_MIN_LENGTH)
  @MaxLength(environment.PASSWORD_MAX_LENGTH)
  password!: string;

  @IsString()
  @MinLength(environment.PASSWORD_MIN_LENGTH)
  @MaxLength(environment.PASSWORD_MAX_LENGTH)
  confirmPassword!: string;

  constructor(confirmNewPassword: ConfirmNewPasswordDto) {
    try {
      this.password = confirmNewPassword.password;
      this.confirmPassword = confirmNewPassword.confirmPassword;
    } catch (err) {
      return;
    }
  }
}
