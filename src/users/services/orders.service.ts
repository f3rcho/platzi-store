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
      return this.orderModel.find().skip(offset).limit(limit).exec();
    }
    return this.orderModel.find().exec();
  }

  findOne(id: string) {
    const order = this.orderModel.findById(id).exec();
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
  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }
}
