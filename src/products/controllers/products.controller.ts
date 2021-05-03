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
  // ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getProducts() {
    return { data: this.productsService.findAll() };
  }
  // dynamic routes after
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return { data: this.productsService.findOne(id) };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createProduct(@Body() payload: CreateProductDto) {
    return { data: this.productsService.create(payload) };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() paylaod: UpdateProductDto,
  ) {
    return { data: this.productsService.update(id, paylaod) };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    return { data: this.productsService.remove(id) };
  }
}
