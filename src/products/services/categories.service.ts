import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entitites/categories.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepositry: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepositry.find();
  }
  findOne(id: number) {
    return this.categoryRepositry.findOne(id);
  }
  // create(payload: CreateCategoryDto) {
  //   this.counterId++;
  //   const newCategory = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   this.categories.push(newCategory);
  //   return newCategory;
  // }
  // update(id: number, payload: UpdateCategoryDto) {
  //   const category = this.findOne(id);
  //   if (!category) {
  //     throw new NotFoundException(`Category with id:${id} not found`);
  //   }
  //   const index = this.categories.findIndex((item) => item.id === id);
  //   this.categories[index] = {
  //     ...category,
  //     ...payload,
  //   };
  //   return this.categories[index];
  // }
  // remove(id: number) {
  //   const index = this.categories.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Category with id:${id} not found`);
  //   }
  //   this.categories.splice(index, 1);
  //   return true;
  // }
}
