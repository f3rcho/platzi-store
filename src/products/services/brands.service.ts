import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from '../../products/entitites/brands.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}
  findAll() {
    return this.brandModel.find().exec();
  }

  findOne(id: string) {
    const brand = this.brandModel.findById(id).exec();
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }
  create(payload: CreateBrandDto) {
    const newBrand = new this.brandModel(payload);
    return newBrand.save();
  }

  update(id: string, payload: UpdateBrandDto) {
    const updatedBrand = this.brandModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!updatedBrand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return updatedBrand;
  }
  remove(id: string) {
    return this.brandModel.findByIdAndDelete(id);
  }
}
