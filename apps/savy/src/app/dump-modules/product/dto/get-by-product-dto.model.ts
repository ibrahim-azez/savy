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

export class GetByProductDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @MinLength(environment.NAME_MIN_LENGTH)
  @MaxLength(environment.NAME_MAX_LENGTH)
  @IsOptional()
  name?: string;

  constructor(getByProductDto: GetByProductDto) {
    this.id = getByProductDto.id;
    this.name = getByProductDto.name;
  }
}
