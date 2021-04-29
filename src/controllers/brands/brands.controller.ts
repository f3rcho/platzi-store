import { Controller, Query, Get, Param } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get()
  getBrands(@Query('limit') limit = 100, @Query('offset') offset: number) {
    return `Brands: limit = ${limit} and offset = ${offset}. `;
  }
  // static route go first
  @Get('filter')
  getBrandFilter() {
    return `my static filter`;
  }
  // dynamic routes after
  @Get(':id')
  getBrand(@Param('id') id: string) {
    return `Brand: ${id}`;
  }
}
