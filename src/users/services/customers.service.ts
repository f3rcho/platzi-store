import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../entities/customers.entity';
import { ProductsService } from '../../products/services/products.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { Order } from '../entities/orders.entity';

@Injectable()
export class CustomersService {
  constructor(private productsService: ProductsService) {}
  private counterId = 2;
  private customers: Customer[] = [
    { id: 1, name: 'Milton Cordero', email: 'mcordero@example.cl' },
    { id: 2, name: 'Luz Bastidas', email: 'luzm@example.com' },
  ];
  findAll() {
    return this.customers;
  }
  findOne(id: number) {
    const customer = this.customers.find((item) => item.id === id);
    if (!customer) {
      throw new NotFoundException(`customer #${id} not found`);
    }
    return customer;
  }
  create(payload: CreateCustomerDto) {
    this.counterId = this.counterId + 1;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }
  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.findOne(id);
    if (!customer) {
      throw new NotFoundException(`customer #${id} not found`);
    }
    const index = this.customers.findIndex((item) => item.id === id);
    this.customers[index] = {
      ...customer,
      ...payload,
    };
    return this.customers[index];
  }
  remove(id: number) {
    const index = this.customers.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`customers with id:${id} not found`);
    }
    this.customers.splice(index, 1);
    return `customers with id:${id} removed`;
  }
  getOrderByCustomer(id: number): Order {
    const customer = this.findOne(id);
    return {
      date: new Date(),
      customer,
      products: this.productsService.findAll(),
    };
  }
}
