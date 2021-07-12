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
  Logger,
  // ParseIntPipe,
} from '@nestjs/common';
import { ApiResponse, ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  logger = new Logger('ProductsController');
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
  @ApiOperation({ summary: 'List all products' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getProducts() {
    this.logger.log(`[getProducts]: Resquest`);
    return this.productsService.findAll();
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
  @ApiOperation({ summary: 'List a product by ID' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProduct(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`[getProductById]: Resquest`);
    return this.productsService.findOne(id);
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
  @ApiOperation({ summary: 'Create a product' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createProduct(@Body() payload: CreateProductDto) {
    this.logger.log(
      `[createProduct]: Resquest with payload:${JSON.stringify(payload)}`,
    );
    return this.productsService.create(payload);
  }
  /**
   *
   * @returns update a product
   */
  @ApiOperation({ summary: 'Update a product by ID' })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    this.logger.log(
      `[updateProduct]: Resquest id:${id} and payload:${JSON.stringify(
        payload,
      )}`,
    );
    return this.productsService.update(id, payload);
  }
  /**
   *
   * @returns update category to product
   */
  @ApiOperation({ summary: 'Update category to product' })
  @Put(':id/category/:categoryId')
  @HttpCode(HttpStatus.OK)
  updateCategoryToProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    this.logger.log(
      `[addCategoryToProduct]: Resquest ID:${id} and category ID:${categoryId}`,
    );
    return this.productsService.addCategoryToProduct(id, categoryId);
  }
  /**
   *
   * @returns delete a category from a product
   */
  @ApiOperation({ summary: 'Delete a category from a product by ids' })
  @Delete(':id/category/:categoryId')
  @HttpCode(HttpStatus.OK)
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    this.logger.log(
      `[removeCategoryByProduct]: Resquest productId:${id} and categoryId:${categoryId} `,
    );
    return this.productsService.removeCategoryByProduct(id, categoryId);
  }
  /**
   *
   * @returns delete a product
   */
  @ApiOperation({ summary: 'Delete a product by ID' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`[deleteProductById]: Resquest id:${id} `);
    return this.productsService.remove(id);
  }
}
