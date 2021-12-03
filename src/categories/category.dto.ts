import { IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class createCategoryDto {
  @IsString()
  name: string;
}

export class updateCategoryDto extends PartialType(createCategoryDto) {
  @IsNumber()
  id: number;
}
