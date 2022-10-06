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
import { CreatePaymentDto } from '../../../dump-modules/payment/create-payment.dto.model';
import { Payment } from '../../../core/entities/payment.entity';

export class CreateOrderDto {
  @IsString()
  name: string;

  @Type(() => CreatePaymentDto)
  payment: CreatePaymentDto;

  @IsArray()
  @ValidateNested({ each: true, always: true })
  @ArrayMinSize(environment.CART_QUANTITY_MIN)
  @ArrayMaxSize(environment.CART_QUANTITY_MAX)
  @Type(() => CreateProductDto)
  products: Array<CreateProductDto>;

  constructor(createOrderDto: CreateOrderDto) {
    this.name = createOrderDto.name;
    this.products = arrayOfObjectsToInstance(
      CreateProductDto,
      createOrderDto.products
    );
    this.payment = new CreatePaymentDto(createOrderDto.payment);
  }
}
