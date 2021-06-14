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
  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // createBrand(@Body() payload: CreateBrandDto) {
  //   return {
  //     message: 'Brand Created',
  //     data: this.brandsService.create(payload),
  //   };
  // }
  // @Put(':id')
  // @HttpCode(HttpStatus.OK)
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() payload: UpdateBrandDto,
  // ) {
  //   return {
  //     message: `User updated`,
  //     data: this.brandsService.update(id, payload),
  //   };
  // }
  // @Delete(':id')
  // @HttpCode(HttpStatus.OK)
  // delete(@Param('id', ParseIntPipe) id: number) {
  //   return { data: this.brandsService.remove(id) };
  // }
}
