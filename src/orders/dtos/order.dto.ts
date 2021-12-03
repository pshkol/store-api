import { IsArray, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { createOrderProductDto } from './order-product.dto';

export class createOrderDto {
  @IsNumber()
  userId: number;

  @IsArray()
  orderProducts: createOrderProductDto[];
}

export class updateOrderDto extends PartialType(createOrderDto) {
  @IsNumber()
  id: number;
}
