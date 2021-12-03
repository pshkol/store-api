import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { createCategoryDto, updateCategoryDto } from './category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { DeleteResult, FindCondition } from 'typeorm';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Public } from '../auth/decorators/public.decorator';
import { Role } from '../auth/models/role.model';
import { Roles } from '../auth/decorators/role.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Public()
  @Get()
  getAll(
    @Body() filter?: FindCondition<Category>,
  ): Promise<Category[]> {
    return this.categoriesService.get(filter);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() data: createCategoryDto): Promise<Category> {
    return this.categoriesService.create(data);
  }

  @Roles(Role.ADMIN)
  @Patch()
  update(@Body() data: updateCategoryDto): Promise<Category> {
    return this.categoriesService.update(data);
  }

  @Roles(Role.ADMIN)
  @Delete()
  delete(@Body() idArray: Array<number>): Promise<DeleteResult> {
    return this.categoriesService.delete(idArray);
  }
}
