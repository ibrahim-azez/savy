import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

import { arrayOfObjectsToInstance } from '@core';
// import { CreateProductDto } from '@dump-modules';
import { environment } from '@environment';
import { CreateProductDto } from '../../../dump-modules/product/dto/create-product-dto.model';

export class CreateCartDto {
  @IsArray()
  @ValidateNested({ each: true, always: true })
  @ArrayMinSize(environment.CART_QUANTITY_MIN)
  @ArrayMaxSize(environment.CART_QUANTITY_MAX)
  @Type(() => CreateProductDto)
  products: Array<CreateProductDto>;

  constructor(createCartDto: CreateCartDto) {
    this.products = arrayOfObjectsToInstance(
      CreateProductDto,
      createCartDto.products
    );
  }
}
