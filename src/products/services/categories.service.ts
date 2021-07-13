import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepositry: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepositry.find({
      relations: ['products'],
    });
  }
  async findOne(id: number) {
    const category = await this.categoryRepositry.findOne(id, {
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    const newCategory = this.categoryRepositry.create(payload);
    return this.categoryRepositry.save(newCategory);
  }

  async update(id: number, payload: UpdateCategoryDto) {
    const updatedCategory = await this.findOne(id);
    this.categoryRepositry.merge(updatedCategory, payload);
    return this.categoryRepositry.save(updatedCategory);
  }
  async remove(id: number) {
    const deletedCategory = await this.findOne(id);
    return this.categoryRepositry.delete(deletedCategory.id);
  }
}
