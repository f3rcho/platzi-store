import {
  Controller,
  Query,
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
import { ApiTags } from '@nestjs/swagger';

import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  getBrands(@Query('limit') limit = 100, @Query('offset') offset = 5) {
    return this.brandsService.findAll();
  }
  // dynamic routes after
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getBrand(@Param('id') id: string) {
    return this.brandsService.findOne(+id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBrand(@Body() payload: CreateBrandDto) {
    return {
      message: 'Brand Created',
      data: await this.brandsService.create(payload),
    };
  }
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return {
      message: `User updated`,
      data: await this.brandsService.update(id, payload),
    };
  }
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return {
      message: `Brand with id:${id} deleted`,
      data: await this.brandsService.remove(id),
    };
  }
}
