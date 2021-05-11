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
import { ApiTags } from '@nestjs/swagger';

import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';

@ApiTags('Customer')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  getCustumers() {
    return this.customersService.findAll();
  }
  // dynamic routes after
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getCustumer(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCustomer(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() payload: UpdateCustomerDto) {
    return this.customersService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
  // orders
  @Get(':id/orders')
  @HttpCode(HttpStatus.OK)
  getOrder(@Param('id') id: string) {
    return this.customersService.getOrderByCustomer(id);
  }
}
