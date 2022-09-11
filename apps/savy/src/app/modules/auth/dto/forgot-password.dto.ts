import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  constructor(forgotPassword: ForgotPasswordDto) {
    this.email = forgotPassword.email;
  }
}
