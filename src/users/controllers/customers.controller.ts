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
import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  getCustumers(@Query('limit') limit = 100, @Query('offset') offset = 5) {
    return {
      message: `Custumers: limit = ${limit} and offset = ${offset}`,
      data: this.customersService.findAll(),
    };
  }
  // dynamic routes after
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getCustumer(@Param('id', ParseIntPipe) id: number) {
    return { data: this.customersService.findOne(id) };
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCustomer(@Body() payload: CreateCustomerDto) {
    return {
      message: 'Customer Created',
      data: this.customersService.create(payload),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return {
      message: `Customer updated`,
      data: this.customersService.update(id, payload),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    return {
      message: `Customer deleted`,
      data: this.customersService.remove(id),
    };
  }
  // orders
  @Get(':id/orders')
  @HttpCode(HttpStatus.OK)
  getOrder(@Param('id', ParseIntPipe) id: number) {
    return { data: this.customersService.getOrderByCustomer(id) };
  }
}
