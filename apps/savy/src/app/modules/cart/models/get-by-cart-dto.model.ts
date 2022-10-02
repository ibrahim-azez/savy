import { IsNumber, IsOptional } from 'class-validator';

export class GetByCartDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  constructor(getByCartDto: GetByCartDto) {
    this.id = getByCartDto.id;
  }
}
