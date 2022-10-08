import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNumber,
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

export class CreateOrderDto {
  @IsString()
  name!: string;

  @IsNumber()
  cartId!: number;

  @ValidateNested({ each: true, always: true })
  @Type(() => CreatePaymentDto)
  payment!: CreatePaymentDto;

  constructor(createOrderDto: CreateOrderDto) {
    try {
      this.name = createOrderDto.name;
      this.cartId = createOrderDto.cartId;
      this.payment = new CreatePaymentDto(createOrderDto.payment);
    } catch (err) {
      return;
    }

    // this.payment = createOrderDto.payment;
  }
}
