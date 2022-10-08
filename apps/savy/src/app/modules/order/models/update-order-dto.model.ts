import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

import { arrayOfObjectsToInstance } from '@core';
import { environment } from '@environment';
import { CreateProductDto } from '../../../dump-modules/product/dto/create-product-dto.model';
import { User } from '../../user/user.entity';
import { CreateUserDto } from '../../user/models/create-user-dto.model';
import { CreatePaymentDto } from '../../../dump-modules/payment/dto/create-payment.dto.model';
import { Payment } from '../../../dump-modules/payment/payment.entity';
import { CreateOrderDto } from './create-order-dto.model';

export class UpdateOrderDto {
  @IsString()
  name!: string;

  @Type(() => CreatePaymentDto)
  payment!: CreatePaymentDto;

  @IsArray()
  @ValidateNested({ each: true, always: true })
  @ArrayMinSize(environment.CART_QUANTITY_MIN)
  @ArrayMaxSize(environment.CART_QUANTITY_MAX)
  @Type(() => CreateProductDto)
  products!: Array<CreateProductDto>;

  constructor(updateOrderDto: UpdateOrderDto) {
    try {
      this.name = updateOrderDto.name;
      this.products = arrayOfObjectsToInstance(
        CreateProductDto,
        updateOrderDto.products
      );
      this.payment = new CreatePaymentDto(updateOrderDto.payment);
    } catch (err) {
      return;
    }
  }
}
