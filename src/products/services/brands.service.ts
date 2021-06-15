import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../entities/brands.entity';
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
  create(payload: CreateBrandDto) {
    const newBrand = this.brandRepositry.create(payload);
    return this.brandRepositry.save(newBrand);
  }

  async update(id: number, payload: UpdateBrandDto) {
    const updatedBrand = await this.findOne(id);
    this.brandRepositry.merge(updatedBrand, payload);
    return this.brandRepositry.save(updatedBrand);
  }
  async remove(id: number) {
    const deletedBrand = await this.findOne(id);
    return this.brandRepositry.delete(deletedBrand);
  }
}
