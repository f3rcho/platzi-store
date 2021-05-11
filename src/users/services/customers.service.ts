import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Customer } from '../entities/customers.entity';
import { ProductsService } from '../../products/services/products.service';
import {
  CreateCustomerDto,
  FilterCustomerDto,
  UpdateCustomerDto,
} from '../dtos/customers.dto';

@Injectable()
export class CustomersService {
  constructor(
    private productsService: ProductsService,
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  findAll(params?: FilterCustomerDto) {
    if (params) {
      const { limit, offset } = params;
      return this.customerModel.find().skip(offset).limit(limit).exec();
    }
    return this.customerModel.find().exec();
  }
  async findOne(id: string) {
    const customer = await this.customerModel.findById(id);
    if (!customer) {
      throw new NotFoundException(`customer #${id} not found`);
    }
    return customer;
  }
  create(payload: CreateCustomerDto) {
    const newCustomer = new this.customerModel(payload).save();
    return newCustomer;
  }
  update(id: string, payload: UpdateCustomerDto) {
    const updatedCustomer = this.customerModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );
    return updatedCustomer;
  }
  remove(id: string) {
    return this.customerModel.findByIdAndDelete(id);
  }
  getOrderByCustomer(id: string) {
    const customer = this.findOne(id);
    return {
      date: new Date(),
      customer,
      products: this.productsService.findAll(),
    };
  }
}
