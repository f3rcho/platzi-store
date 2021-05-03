import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../../products/entitites/brands.entity';
import {
  CreateBrandDto,
  UpdateBrandDto,
} from '../../products/dtos/brands.dtos';
@Injectable()
export class BrandsService {
  private counterId = 2;
  private brands: Brand[] = [
    { id: 1, name: 'Adodo', image: 'iamge.png' },
    { id: 2, name: 'Nite', image: 'iamge.png' },
  ];

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const brand = this.brands.find((item) => item.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }
  create(payload: CreateBrandDto) {
    this.counterId = this.counterId + 1;
    const newBrand = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  update(id: number, payload: UpdateBrandDto) {
    const brand = this.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    const index = this.brands.findIndex((item) => item.id === id);
    this.brands[index] = {
      ...brand,
      ...payload,
    };
    return this.brands[index];
  }
  remove(id: number) {
    const index = this.brands.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Brand with id:${id} not found`);
    }
    this.brands.splice(index, 1);
    return true;
  }
}
