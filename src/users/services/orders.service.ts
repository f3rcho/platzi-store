import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateOrderDto,
  UpdateOrderDto,
  FilterOrderDto,
} from '../dtos/orders.dto';
import { Order } from '../entities/orders.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  findAll(params?: FilterOrderDto) {
    if (params) {
      const { limit, offset } = params;
      return this.orderModel
        .find()
        .populate('products')
        .populate('customer')
        .populate('skills')
        .skip(offset)
        .limit(limit)
        .exec();
    }
    return this.orderModel.find().exec();
  }

  findOne(id: string) {
    const order = this.orderModel
      .findById(id)
      .populate('products')
      .populate('customer')
      .exec();
    if (!order) {
      throw new NotFoundException(`order with id:${id} not found`);
    }
    return order;
  }

  create(payload: CreateOrderDto) {
    const newOrder = new this.orderModel(payload).save();
    return newOrder;
  }

  update(id: string, payload: UpdateOrderDto) {
    const updatedOrder = this.orderModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    return updatedOrder;
  }
  async addProductsById(orderId: string, productsId: string[]) {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new NotFoundException(`order ${order} not found`);
    }
    productsId.forEach((id) => order.products.push(id));
    return order.save();
  }
  async remove(orderId: string) {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new NotFoundException(`order ${order} not found`);
    }
    return this.orderModel.findByIdAndDelete(orderId);
  }
  async removeProductFromOrder(orderId: string, productId: string) {
    const order = await this.orderModel.findById(orderId);
    order.products.pull(productId);
    return order.save();
  }
}
