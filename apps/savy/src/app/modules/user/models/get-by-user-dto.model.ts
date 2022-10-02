import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsOptional,
} from 'class-validator';

import { environment } from '@environment';

export class GetByUserDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(environment.USERNAME_MIN_LENGTH)
  @MaxLength(environment.USERNAME_MAX_LENGTH)
  @IsOptional()
  username?: string;

  constructor(getByUserDto: GetByUserDto) {
    this.id = getByUserDto.id;
    this.email = getByUserDto.email;
    this.username = getByUserDto.username;
  }
}
