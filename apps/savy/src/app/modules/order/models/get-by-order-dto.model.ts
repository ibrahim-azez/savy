import { IsNumber, IsOptional } from 'class-validator';

export class GetByOrderDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  constructor(getByOrderDto: GetByOrderDto) {
    this.id = getByOrderDto.id;
  }
}
