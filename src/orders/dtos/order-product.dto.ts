import { IsNumber } from 'class-validator';

export class createOrderProductDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  orderId: number;
}
