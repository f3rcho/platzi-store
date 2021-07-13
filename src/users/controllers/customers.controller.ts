import {
  Controller,
  Query,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@ApiTags('Customer')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'OK!' })
  getCustumers(@Query('limit') limit = 100, @Query('offset') offset = 5) {
    return this.customersService.findAll();
  }

  // dynamic routes after
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'OK!' })
  getCustumer(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCustomer(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(id);
  }
  // orders
  // @Get(':id/orders')
  // @HttpCode(HttpStatus.OK)
  // getOrder(@Param('id', ParseIntPipe) id: number) {
  //   return { data: this.customersService.getOrderByCustomer(id) };
  // }
}
