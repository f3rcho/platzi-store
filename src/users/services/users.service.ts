import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/users.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

import { ProductsService } from '../../products/services/products.service';
@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with #${id} not found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    const newUser = this.userRepository.create(payload);
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
