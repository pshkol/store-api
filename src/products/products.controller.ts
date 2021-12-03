import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { createProductDto, updateProductDto } from './product.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { DeleteResult, FindCondition } from 'typeorm';
import { JwtGuard } from '../auth/guards/jwt.guard';
import {RolesGuard} from "../auth/guards/roles.guard";
import {Public} from "../auth/decorators/public.decorator";
import { Roles} from "../auth/decorators/role.decorator";
import { Role} from "../auth/models/role.model";

@UseGuards(JwtGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get()
  get(@Body() filter?: FindCondition<Product>): Promise<Product[]> {
    return this.productsService.get(filter);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() data: createProductDto): Promise<Product> {
    return this.productsService.create(data);
  }

  @Roles(Role.ADMIN)
  @Patch()
  update(@Body() data: updateProductDto): Promise<Product> {
    return this.productsService.update(data);
  }

  @Roles(Role.ADMIN)
  @Delete()
  delete(@Body() idArray: Array<number>): Promise<DeleteResult> {
    return this.productsService.delete(idArray);
  }
}
