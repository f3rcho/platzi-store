import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../../products/entitites/brands.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepositry: Repository<Brand>,
  ) {}

  findAll() {
    return this.brandRepositry.find();
  }

  findOne(id: number) {
    const brand = this.brandRepositry.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }
  // create(payload: CreateBrandDto) {
  //   this.counterId = this.counterId + 1;
  //   const newBrand = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   this.brands.push(newBrand);
  //   return newBrand;
  // }

  // update(id: number, payload: UpdateBrandDto) {
  //   const brand = this.findOne(id);
  //   if (!brand) {
  //     throw new NotFoundException(`Brand #${id} not found`);
  //   }
  //   const index = this.brands.findIndex((item) => item.id === id);
  //   this.brands[index] = {
  //     ...brand,
  //     ...payload,
  //   };
  //   return this.brands[index];
  // }
  // remove(id: number) {
  //   const index = this.brands.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Brand with id:${id} not found`);
  //   }
  //   this.brands.splice(index, 1);
  //   return true;
  // }
}
