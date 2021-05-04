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
import { ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  /**
   *
   * @returns All the elements from products
   */
  @ApiResponse({ status: HttpStatus.OK, description: 'OK!' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Data undefined',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  getProducts() {
    return { data: this.productsService.findAll() };
  }
  /**
   *
   * @returns one elements from products
   */
  // dynamic routes after
  @ApiResponse({ status: HttpStatus.OK, description: 'OK!' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Data undefined' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error',
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return { data: this.productsService.findOne(id) };
  }
  /**
   *
   * @returns creates a product
   */
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Product created!' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Data undefined' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error',
  })
  @ApiBody({ description: 'Data info required', type: CreateProductDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createProduct(@Body() payload: CreateProductDto) {
    return { data: this.productsService.create(payload) };
  }
  /**
   *
   * @returns update a product
   */
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() paylaod: UpdateProductDto,
  ) {
    return { data: this.productsService.update(id, paylaod) };
  }
  /**
   *
   * @returns delete a product
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    return { data: this.productsService.remove(id) };
  }
}
