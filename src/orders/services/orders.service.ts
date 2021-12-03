import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createOrderDto, updateOrderDto } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindCondition, Repository } from 'typeorm';
import { UsersService } from '../../users/users.service';
import { OrderProductsService } from './order-products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private orderProductsService: OrderProductsService,
    private usersService: UsersService,
  ) {}

  async getOrders(filter?: FindCondition<Order>): Promise<Order[]> {
    return await this.orderRepo.find({
      where: filter,
      relations: ['user', 'orderProducts', 'orderProducts.product'],
    });
  }

  async createOrder(data: createOrderDto): Promise<Order> {
    const order = {
      user: await this.usersService
        .getUsers({ id: data.userId })
        .then((data) => data[0]),
      orderProducts: await this.orderProductsService.createOrderProductsArray(
        data.orderProducts,
      ),
    };

    return await this.orderRepo.save(this.orderRepo.create(order));
  }

  async updateOrder(data: updateOrderDto): Promise<Order> {
    const order: Order = await this.orderRepo.findOne(data.id, {
      relations: ['orderProducts', 'user'],
    });

    if (!order) {
      throw new HttpException('Orden no encontrada', HttpStatus.BAD_REQUEST);
    }

    await this.orderProductsService.deleteOrderProducts(
      order.orderProducts.map((item) => item.id),
    );

    if (data.userId) {
      order.user = await this.usersService
        .getUsers({ id: data.userId })
        .then((data) => data[0]);
    }

    if (data.orderProducts.length > 0) {
      order.orderProducts =
        await this.orderProductsService.createOrderProductsArray(
          data.orderProducts,
        );
    }

    return await this.orderRepo.save(order);
  }

  async deleteOrder(idArray: Array<number>): Promise<DeleteResult> {
    await Promise.all(
      idArray.map(async (id) => {
        let order = await this.orderRepo.findOne(id, {
          relations: ['orderProducts'],
        });

        if (!order) {
          throw new HttpException(
            'Order no encontrada',
            HttpStatus.BAD_REQUEST,
          );
        }

        await this.orderProductsService.deleteOrderProducts(
          order.orderProducts.map((item) => item.id),
        );
      }),
    );

    return this.orderRepo.delete(idArray);
  }
}
