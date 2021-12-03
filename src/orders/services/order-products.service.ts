import { Injectable } from '@nestjs/common';
import { createOrderProductDto } from '../dtos/order-product.dto';
import { OrderProduct } from '../entities/order-product.entity';
import { ProductsService } from '../../products/products.service';
import { DeleteResult, FindCondition, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderProductsService {
  constructor(
    private productsRepo: ProductsService,
    @InjectRepository(OrderProduct)
    private orderProductsRepo: Repository<OrderProduct>,
  ) {}

  async createOrderProducts(
    data: createOrderProductDto,
  ): Promise<OrderProduct> {
    const orderProduct = {
      quantity: data.quantity,
      product: await this.productsRepo
        .get({ id: data.productId })
        .then((data) => data[0]),
    };

    return await this.orderProductsRepo.save(
      this.orderProductsRepo.create(orderProduct),
    );
  }

  async createOrderProductsArray(
    data: createOrderProductDto[],
  ): Promise<OrderProduct[]> {
    return await Promise.all(
      data.map(async (item) => {
        return await this.createOrderProducts(item);
      }),
    );
  }

  async deleteOrderProducts(idArray: Array<number>): Promise<DeleteResult> {
    return await this.orderProductsRepo.delete(idArray);
  }

  async getOrderProducts(
    filter?: FindCondition<OrderProduct>,
  ): Promise<OrderProduct[]> {
    return await this.orderProductsRepo.find({
      where: filter,
      relations: ['product', 'order'],
    });
  }
}
