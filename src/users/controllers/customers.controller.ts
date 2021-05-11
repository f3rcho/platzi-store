import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CustomersService } from '../services/customers.service';
import { MongoidPipe } from '../../common/mongoid.pipe';
import {
  CreateCustomerDto,
  FilterCustomerDto,
  UpdateCustomerDto,
} from '../dtos/customers.dto';

@ApiTags('Customer')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  getCustumers(@Query() params: FilterCustomerDto) {
    return this.customersService.findAll(params);
  }
  // dynamic routes after
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getCustumer(@Param('id', MongoidPipe) id: string) {
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
    @Param('id', MongoidPipe) id: string,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', MongoidPipe) id: string) {
    return this.customersService.remove(id);
  }
  // orders
  @Get(':id/orders')
  @HttpCode(HttpStatus.OK)
  getOrder(@Param('id', MongoidPipe) id: string) {
    return this.customersService.getOrderByCustomer(id);
  }
}
