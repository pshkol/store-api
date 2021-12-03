import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { createOrderDto, updateOrderDto } from './dtos/order.dto';
import { Order } from './entities/order.entity';
import { DeleteResult, FindCondition } from 'typeorm';
import { OrderProduct } from './entities/order-product.entity';
import { OrderProductsService } from './services/order-products.service';
import { JwtGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('orders')
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    private orderProductsService: OrderProductsService,
  ) {}

  @Get()
  getOrders(@Body() filter?: FindCondition<Order>): Promise<Order[]> {
    return this.ordersService.getOrders(filter);
  }

  @Post()
  createOrder(@Body() data: createOrderDto): Promise<Order> {
    return this.ordersService.createOrder(data);
  }

  @Patch()
  updateOrder(@Body() data: updateOrderDto): Promise<Order> {
    return this.ordersService.updateOrder(data);
  }

  @Delete()
  deleteOrder(@Body() idArray: Array<number>): Promise<DeleteResult> {
    return this.ordersService.deleteOrder(idArray);
  }

  @Get('order_products')
  getOrderProducts(
    @Body() filter?: FindCondition<OrderProduct>,
  ): Promise<OrderProduct[]> {
    return this.orderProductsService.getOrderProducts(filter);
  }

  @Delete('order_products')
  deleteOrderProducts(@Body() idArray: Array<number>): Promise<DeleteResult> {
    return this.orderProductsService.deleteOrderProducts(idArray);
  }
}
