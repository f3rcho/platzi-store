import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/products.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BrandsService } from './brands.service';
@Injectable()
export class ProductsService {
  constructor(
    private brandsService: BrandsService,
    @InjectRepository(Product) private productRepositry: Repository<Product>,
  ) {}
  /**
   *
   * @returns All the elements from products
   */
  findAll() {
    return this.productRepositry.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepositry.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(payload: CreateProductDto) {
    const newProduct = this.productRepositry.create(payload);
    if (payload.brandId) {
      const brand = await this.brandsService.findOne(payload.brandId);
      newProduct.brand = brand;
    }
    return this.productRepositry.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto) {
    const updatedProduct = await this.findOne(id);
    if (payload.brandId) {
      const brand = await this.brandsService.findOne(payload.brandId);
      updatedProduct.brand = brand;
    }
    this.productRepositry.merge(updatedProduct, payload);
    return this.productRepositry.save(updatedProduct);
  }

  async remove(id: number) {
    const deletedProduct = await this.findOne(id);
    return this.productRepositry.delete(deletedProduct.id);
  }
}
