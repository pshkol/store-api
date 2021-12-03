import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './services/orders.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Order} from "./entities/order.entity";
import {OrderProduct} from "./entities/order-product.entity";
import {UsersModule} from "../users/users.module";
import {ProductsModule} from "../products/products.module";
import {OrderProductsService} from "./services/order-products.service";

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderProduct]), UsersModule, ProductsModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrderProductsService]
})
export class OrdersModule {}
