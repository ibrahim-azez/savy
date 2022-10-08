import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

import { arrayOfObjectsToInstance } from '@core';
// import { UpdateProductDto } from '@dump-modules';
import { environment } from '@environment';
import { UpdateProductDto } from '../../../dump-modules/product/dto/update-product-dto.model';

export class UpdateCartDto {
  @IsArray()
  @ArrayMinSize(environment.CART_QUANTITY_MIN)
  @ArrayMaxSize(environment.CART_QUANTITY_MAX)
  @ValidateNested({ each: true, always: true })
  @Type(() => UpdateProductDto)
  products!: Array<UpdateProductDto>;

  constructor(updateCartDto: UpdateCartDto) {
    try {
      this.products = arrayOfObjectsToInstance(
        UpdateProductDto,
        updateCartDto.products
      );
    } catch (err) {
      return;
    }
  }
}
