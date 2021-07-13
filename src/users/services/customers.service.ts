import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../entities/customer.entity';

import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

import { ProductsService } from '../../products/services/products.service';
@Injectable()
export class CustomersService {
  constructor(
    private productsService: ProductsService,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  findAll() {
    return this.customerRepository.find();
  }
  async findOne(id: number) {
    const customer = await this.customerRepository.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with id:'${id}' not found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    const newCustomer = this.customerRepository.create(payload);
    return this.customerRepository.save(newCustomer);
  }
  async update(id: number, payload: UpdateCustomerDto) {
    const updatedCustomer = await this.findOne(id);
    this.customerRepository.merge(updatedCustomer, payload);
    return this.customerRepository.save(updatedCustomer);
  }
  async remove(id: number) {
    const deletedCustomer = await this.findOne(id);
    return this.customerRepository.delete(deletedCustomer.id);
  }
  // getOrderByCustomer(id: number): Order {
  //   const customer = this.findOne(id);
  //   return {
  //     date: new Date(),
  //     customer,
  //     products: this.productsService.findAll(),
  //   };
  // }
}
