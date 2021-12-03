import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { DeleteResult, FindCondition, Repository } from 'typeorm';
import { createProductDto, updateProductDto } from './product.dto';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,
    private categoryService: CategoriesService,
  ) {}

  async get(filter?: FindCondition<Product>): Promise<Product[]> {
    return await this.productsRepo.find({
      where: filter,
      relations: ['category', 'orderProducts'],
    });
  }

  async create(data: createProductDto): Promise<Product> {
    let findCategory: Category = await this.categoryService
      .get({ id: data.categoryId })
      .then((data) => data[0]);
    let product = this.productsRepo.create({
      name: data.name,
      category: findCategory,
    });
    return await this.productsRepo.save(product);
  }

  async update(data: updateProductDto): Promise<Product> {
    let product = await this.productsRepo
      .find({ id: data.id })
      .then((data) => data[0]);

    if (!product) {
      throw new HttpException('Producto no entontrado', HttpStatus.BAD_REQUEST);
    }

    if (data.categoryId) {
      let category = await this.categoryService
        .get({ id: data.categoryId })
        .then((data) => data[0]);

      if (!category) {
        throw new HttpException(
          'Categoria no entontrada',
          HttpStatus.BAD_REQUEST,
        );
      }

      product.category = category;
    }

    product.name = data.name;

    return await this.productsRepo.save(product);
  }

  async delete(idArray: Array<number>): Promise<DeleteResult> {
    return await this.productsRepo.delete(idArray);
  }
}
