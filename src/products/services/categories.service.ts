import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../entitites/categories.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  findAll() {
    return this.categoryModel.find().exec();
  }
  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).exec();
    return category;
  }
  create(payload: CreateCategoryDto) {
    const newCategory = new this.categoryModel(payload);
    return newCategory.save();
  }
  update(id: string, payload: UpdateCategoryDto) {
    const updatedCategory = this.categoryModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!updatedCategory) {
      throw new NotFoundException(`Category with id:${id} not found`);
    }

    return updatedCategory;
  }
  remove(id: string) {
    return this.categoryModel.findByIdAndDelete(id);
  }
}
