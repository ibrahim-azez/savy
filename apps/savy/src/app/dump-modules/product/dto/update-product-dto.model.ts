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

export class UpdateProductDto {
  @IsString()
  @MinLength(environment.NAME_MIN_LENGTH)
  @MaxLength(environment.NAME_MAX_LENGTH)
  @IsOptional()
  name?: string;

  @IsString()
  @MinLength(environment.DESCRIPTION_MIN_LENGTH)
  @MaxLength(environment.DESCRIPTION_MAX_LENGTH)
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  picture?: string;

  @IsNumber()
  @IsOptional()
  @Min(environment.RANKING_MIN)
  @Max(environment.RANKING_MAX)
  ranking?: number;

  @IsString()
  @IsOptional()
  vendor?: string;

  constructor(updateProductDto: UpdateProductDto) {
    this.name = updateProductDto.name;
    this.description = updateProductDto.description;
    this.color = updateProductDto.color;
    this.picture = updateProductDto.picture;
    this.price = updateProductDto.price;
    this.ranking = updateProductDto.ranking;
    this.vendor = updateProductDto.vendor;
  }
}
