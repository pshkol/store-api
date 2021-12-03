import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/product.entity';
import { Order } from './order.entity';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (products) => products.orderProducts)
  product: Product;

  @Column({ nullable: true })
  quantity: number;

  @ManyToOne(() => Order, (orders) => orders.orderProducts)
  order: Order;
}
