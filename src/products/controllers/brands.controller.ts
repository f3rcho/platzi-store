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
import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  getBrands(@Query('limit') limit = 100, @Query('offset') offset = 5) {
    const brands = this.brandsService.findAll();
    return {
      message: `Brands: limit = ${limit} and offset = ${offset}. `,
      data: brands,
    };
  }
  // dynamic routes after
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getBrand(@Param('id') id: string) {
    return { data: this.brandsService.findOne(+id) };
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createBrand(@Body() payload: CreateBrandDto) {
    return {
      message: 'Brand Created',
      data: this.brandsService.create(payload),
    };
  }
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return {
      message: `User updated`,
      data: this.brandsService.update(id, payload),
    };
  }
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    return { data: this.brandsService.remove(id) };
  }
}
