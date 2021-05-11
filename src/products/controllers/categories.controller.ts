import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MongoidPipe } from '../../common/mongoid.pipe';
import {
  CreateCategoryDto,
  FilterCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/categories.dto';
import { CategoriesService } from '../services/categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  getCategories(@Query() params: FilterCategoryDto) {
    return this.categoriesService.findAll(params);
  }

  @Get(':id')
  getCategory(@Param('id', MongoidPipe) id: string) {
    return this.categoriesService.findOne(id);
  }
  @Post()
  createCategory(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }
  @Put(':id')
  update(
    @Param('id', MongoidPipe) id: string,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, payload);
  }
  @Delete(':id')
  delete(@Param('id', MongoidPipe) id: string) {
    return this.categoriesService.remove(id);
  }
}
