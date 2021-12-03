import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import {createCategoryDto, updateCategoryDto} from './category.dto';
import {DeleteResult, FindCondition, Repository} from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async get(filter?: FindCondition<Category>): Promise<Category[]> {
    return await this.categoryRepo.find({ where: filter, relations: ['products'] });
  }

  async create(data: createCategoryDto): Promise<Category> {
    const category: Category = this.categoryRepo.create(data);
    return await this.categoryRepo.save(category);
  }

  async update(data: updateCategoryDto): Promise<Category> {
    const category = await this.categoryRepo.findOne(data.id);

    if (!category) {
      throw new HttpException('Categoria no encotnrada', HttpStatus.BAD_REQUEST);
    }

    this.categoryRepo.merge(category, data);
    return await this.categoryRepo.save(category);
  }

  async delete(idArray: Array<number>): Promise<DeleteResult> {
    return await this.categoryRepo.delete(idArray);
  }
}
