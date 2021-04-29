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
import { ProductsService } from '../../services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getProducts() {
    return this.productsService.findAll();
  }
  // static route go first
  @Get('filter')
  @HttpCode(HttpStatus.OK)
  getFilter() {
    return `my static filter`;
  }
  // dynamic routes after
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProduct(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createProduct(@Body() payload: any) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() paylaod: any) {
    return this.productsService.update(id, paylaod);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
