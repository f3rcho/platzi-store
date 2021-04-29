import { Controller, Query, Get, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset: number,
    @Query('brand') brand: string,
  ) {
    return `products: limit = ${limit} and offset = ${offset}. The brand ${brand}`;
  }
  // static route go first
  @Get('filter')
  getFilter() {
    return `my static filter`;
  }
  // dynamic routes after
  @Get(':id')
  getProduct(@Param('id') id: string) {
    return `product ${id}`;
  }
}
