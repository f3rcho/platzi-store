import { Injectable, NotFoundException } from '@nestjs/common';
import { Costumer } from '../../entities/customers.entity';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from '../../dtos/customers.dtos';

@Injectable()
export class CustomersService {
  private counterId = 2;
  private customers: Costumer[] = [
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
    return `User with id:${id} removed`;
  }
}
