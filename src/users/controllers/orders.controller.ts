import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { MongoidPipe } from 'src/common/mongoid.pipe';
import {
  CreateOrderDto,
  FilterOrderDto,
  UpdateOrderDto,
  AddProductToOrderDto,
} from '../dtos/orders.dto';
import { OrdersService } from '../services/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  getOrders(@Query() params: FilterOrderDto) {
    return this.ordersService.findAll(params);
  }

  @Get(':id')
  getOrder(@Param('id', MongoidPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @Post()
  createOrder(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }

  @Put(':id')
  updateOrder(
    @Param('id', MongoidPipe) id: string,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, payload);
  }
  @Put(':orderId/products')
  AddProduct(
    @Param('orderId', MongoidPipe) orderId: string,
    @Body() payload: AddProductToOrderDto,
  ) {
    return this.ordersService.addProductsById(orderId, payload.productsId);
  }

  @Delete(':id')
  deleteOrder(@Param('id', MongoidPipe) id: string) {
    return this.ordersService.remove(id);
  }
  @Delete(':orderId/products/:productId')
  removeProduct(
    @Param('orderId') orderId: string,
    @Param('productId') productId: string,
  ) {
    return this.ordersService.removeProductFromOrder(orderId, productId);
  }
}
