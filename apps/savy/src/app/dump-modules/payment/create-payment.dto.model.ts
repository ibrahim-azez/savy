import { IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  constructor(createPaymentDto: CreatePaymentDto) {
    this.amount = createPaymentDto.amount;
    this.description = createPaymentDto.description;
  }
}
