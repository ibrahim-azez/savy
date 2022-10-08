import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail()
  email!: string;

  constructor(forgotPassword: ForgotPasswordDto) {
    try {
      this.email = forgotPassword.email;
    } catch (err) {
      return;
    }
  }
}
