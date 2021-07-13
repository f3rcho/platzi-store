import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from '../../products/entities/product.entity';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem) private itemRepository: Repository<OrderItem>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.itemRepository.find({
      relations: ['order', 'order.customer'],
    });
  }

  findOne(id: number) {
    return this.itemRepository.findOne(id, {
      relations: ['order', 'product'],
    });
  }

  async create(payload: CreateOrderItemDto) {
    const order = await this.orderRepository.findOne(payload.orderId);
    const product = await this.productRepository.findOne(payload.productId);
    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = payload.quantity;
    return this.itemRepository.save(item);
  }

  async update(id: number, payload: UpdateOrderItemDto) {
    const orderItem = await this.itemRepository.findOne(id);
    if (payload.orderId) {
      const order = await this.orderRepository.findOne(payload.orderId);
      orderItem.order = order;
    }
    if (payload.productId) {
      const product = await this.productRepository.findOne(payload.productId);
      orderItem.product = product;
    }
    if (payload.quantity) {
      orderItem.quantity = payload.quantity;
    }
    return this.itemRepository.save(orderItem);
  }

  delete(id: number) {
    return this.itemRepository.delete(id);
  }
}
