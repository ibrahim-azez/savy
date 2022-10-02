import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import { environment } from '@environment';

export class CreateProductDto {
  @IsString()
  @MinLength(environment.NAME_MIN_LENGTH)
  @MaxLength(environment.NAME_MAX_LENGTH)
  name: string;

  @IsString()
  @MinLength(environment.DESCRIPTION_MIN_LENGTH)
  @MaxLength(environment.DESCRIPTION_MAX_LENGTH)
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  picture?: string;

  @IsNumber()
  @Min(environment.RANKING_MIN)
  @Max(environment.RANKING_MAX)
  @IsOptional()
  ranking?: number;

  @IsString()
  @IsOptional()
  vendor?: string;

  constructor(createProductDto: CreateProductDto) {
    this.name = createProductDto.name;
    this.description = createProductDto.description;
    this.color = createProductDto.color;
    this.picture = createProductDto.picture;
    this.price = createProductDto.price;
    this.ranking = createProductDto.ranking;
    this.vendor = createProductDto.vendor;
  }
}
