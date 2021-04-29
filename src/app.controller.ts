import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('new')
  getNew(): string {
    return 'New route';
  }
  @Get('products')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset: number,
    @Query('brand') brand: string,
  ) {
    return `products: limit = ${limit} and offset = ${offset}. The brand ${brand}`;
  }
  // static route go first
  @Get('products/filter')
  getFilter() {
    return `my static filter`;
  }
  // dynamic routes after
  @Get('products/:id')
  getProduct(@Param('id') id: string) {
    return `product ${id}`;
  }
  @Get('categories/:id/products/:productId')
  getCategory(@Param('productId') productId: string, @Param('id') id: string) {
    return `product ${productId} and category ${id}`;
  }
}
