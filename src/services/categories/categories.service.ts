import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../../entities/categories.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../../dtos/categories.dtos';
@Injectable()
export class CategoriesService {
  private counterId = 2;
  private categories: Category[] = [
    { id: 1, name: 'Shoes' },
    { id: 2, name: 'Close' },
  ];

  findAll() {
    return this.categories;
  }
  findOne(id: number) {
    return this.categories.find((item) => item.id === id);
  }
  create(payload: CreateCategoryDto) {
    this.counterId++;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newCategory);
    return newCategory;
  }
  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with id:${id} not found`);
    }
    const index = this.categories.findIndex((item) => item.id === id);
    this.categories[index] = {
      ...category,
      ...payload,
    };
    return this.categories[index];
  }
  remove(id: number) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category with id:${id} not found`);
    }
    this.categories.splice(index, 1);
    return true;
  }
}
