import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/categories.dtos';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  getCategories() {
    return { data: this.categoriesService.findAll() };
  }

  @Get(':id')
  getCategory(@Param('id', ParseIntPipe) id: number) {
    return { data: this.categoriesService.findOne(id) };
  }
  @Post()
  createCategory(@Body() payload: CreateCategoryDto) {
    return {
      message: 'Category Created',
      data: this.categoriesService.create(payload),
    };
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return {
      message: 'Category Updated',
      data: this.categoriesService.update(id, payload),
    };
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return {
      message: `Category deleted`,
      data: this.categoriesService.remove(id),
    };
  }
}
