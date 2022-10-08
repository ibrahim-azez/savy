import { IsNumber, IsOptional } from 'class-validator';

export class GetByCartDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  constructor(getByCartDto: GetByCartDto) {
    try {
      this.id = getByCartDto.id;
    } catch (err) {
      return;
    }
  }
}
