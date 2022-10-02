import { IsEmail, IsString, IsEnum, IsOptional } from 'class-validator';

import { IsOnlyDate } from '@core';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  fullName?: string;

  @IsOnlyDate()
  @IsOptional()
  dateOfBirth?: string;

  @IsEnum({ ADMIN: 'ADMIN', USER: 'USER', GUEST: 'GUEST' })
  @IsOptional()
  role?: 'ADMIN' | 'USER' | 'GUEST';

  constructor(updateUserDto: UpdateUserDto) {
    this.email = updateUserDto.email;
    this.username = updateUserDto.username;
    this.fullName = updateUserDto.fullName;
    this.dateOfBirth = updateUserDto.dateOfBirth;
    this.role = updateUserDto.role;
  }
}
