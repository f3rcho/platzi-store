import { Controller, Query, Get, Param, Post, Body } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getOrders(@Query('limit') limit = 100, @Query('offset') offset: number) {
    return `orders: limit = ${limit} and offset = ${offset}.`;
  }
  // static route go first
  @Get('filter')
  getOrderFilter() {
    return `my static filter`;
  }
  // dynamic routes after
  @Get(':id')
  getOrder(@Param('id') id: string) {
    return `order ${id}`;
  }
  @Post()
  createCustomer(@Body() body: any) {
    return {
      message: 'Customer Created',
      body,
    };
  }
}
