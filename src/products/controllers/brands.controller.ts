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
  getBrands() {
    const brands = this.brandsService.findAll();
    return brands;
  }
  // dynamic routes after
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getBrand(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createBrand(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() payload: UpdateBrandDto) {
    return this.brandsService.update(id, payload);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string) {
    return this.brandsService.remove(id);
  }
}
