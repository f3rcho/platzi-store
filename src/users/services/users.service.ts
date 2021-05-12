import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// import { ConfigService } from '@nestjs/config';
import { User } from '../entities/users.entity';
import { CreateUserDto, FilterUserDto, UpdateUserDto } from '../dtos/users.dto';

import { ProductsService } from '../../products/services/products.service';
@Injectable()
export class UsersService {
  constructor(
    // private configService: ConfigService,
    private productsService: ProductsService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findAll(params?: FilterUserDto) {
    if (params) {
      const { limit, offset } = params;
      return this.userModel.find().skip(offset).limit(limit).exec();
    }
    const users = this.userModel.find().exec();
    return users;
  }

  findOne(id: string) {
    const user = this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`user #${id} not found`);
    }
    return user;
  }
  create(payload: CreateUserDto) {
    const newUser = new this.userModel(payload).save();
    return newUser;
  }
  update(id: string, payload: UpdateUserDto) {
    const updatedUser = this.userModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    return updatedUser;
  }
  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
  getOrderByUser(id: string) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
