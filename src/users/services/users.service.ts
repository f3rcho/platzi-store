import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { ProductsService } from '../../products/services/products.service';
import { CustomersService } from './customers.service';
@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private customersService: CustomersService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with #${id} not found`);
    }
    return user;
  }

  async create(payload: CreateUserDto) {
    const newUser = this.userRepository.create(payload);
    if (payload.customerId) {
      const customer = await this.customersService.findOne(payload.customerId);
      newUser.customer = customer;
    }
    return this.userRepository.save(newUser);
  }

  async update(id: number, payload: UpdateUserDto) {
    const updatedUser = await this.findOne(id);
    this.userRepository.merge(updatedUser, payload);
    return this.userRepository.save(updatedUser);
  }
  async remove(id: number) {
    const deletedUser = await this.findOne(id);
    return this.userRepository.delete(deletedUser.id);
  }

  async getOrderByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
