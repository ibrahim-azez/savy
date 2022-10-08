import { IsNumber, IsString } from 'class-validator';
import * as createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

export class CreatePaymentDto {
  @IsNumber()
  amount!: number;

  @IsString()
  description!: string;

  constructor(createPaymentDto: CreatePaymentDto) {
    try {
      this.amount = createPaymentDto.amount;
      this.description = createPaymentDto.description;
    } catch (err) {
      return;
    }
  }
}
