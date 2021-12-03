import { IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class createProductDto {
  @IsString()
  name: string;

  @IsNumber()
  categoryId: number;
}

export class updateProductDto extends PartialType(createProductDto) {
  @IsNumber()
  id: number;
}
