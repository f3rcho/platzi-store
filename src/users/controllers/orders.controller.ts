import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { OrdersService } from '../services/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersSerive: OrdersService) {}
  logger = new Logger('OrdersController');

  @ApiResponse({ status: HttpStatus.OK, description: 'OK!' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Data undefined',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error',
  })
  @ApiOperation({ summary: 'List all orders' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getOrders() {
    this.logger.log(`[getOrders]: Resquest`);
    return this.ordersSerive.findAll();
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'OK!' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Data undefined' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error',
  })
  @ApiOperation({ summary: 'List an order by ID' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOrder(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`[getOrderById]: Resquest`);
    return this.ordersSerive.findOne(id);
  }

  @ApiResponse({ status: HttpStatus.CREATED, description: 'Product created!' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Data undefined' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error',
  })
  @ApiBody({ description: 'Data info required', type: CreateOrderDto })
  @ApiOperation({ summary: 'Create an order' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createOrder(@Body() payload: CreateOrderDto) {
    this.logger.log(
      `[createOrder]: Resquest with payload:${JSON.stringify(payload)}`,
    );
    return this.ordersSerive.create(payload);
  }

  @ApiOperation({ summary: 'Update order' })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderDto,
  ) {
    this.logger.log(
      `[updateOrder]: Resquest id:${id} and payload:${JSON.stringify(payload)}`,
    );
    return this.ordersSerive.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete an order by ID' })
  @Delete(':id')
  deleteOrder(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`[deleteOrderById]: Resquest id:${id} `);
    return this.ordersSerive.remove(id);
  }
}
