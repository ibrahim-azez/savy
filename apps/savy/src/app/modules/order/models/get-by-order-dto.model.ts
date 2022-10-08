import { IsNumber, IsOptional } from 'class-validator';

export class GetByOrderDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  constructor(getByOrderDto: GetByOrderDto) {
    try {
      this.id = getByOrderDto.id;
    } catch (err) {
      return;
    }
  }
}
