import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../dtos/products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, Between } from 'typeorm';

import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepositry: Repository<Product>,
    @InjectRepository(Category) private categoryRepositry: Repository<Category>,
    @InjectRepository(Brand) private brandRepositry: Repository<Brand>,
  ) {}
  /**
   *
   * @returns All the elements from products
   */
  findAll(params?: FilterProductDto) {
    if (params) {
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;
      const where: FindConditions<Product> = {};

      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return this.productRepositry.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
      });
    }
    return this.productRepositry.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepositry.findOne(id, {
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID:${id} not found`);
    }
    return product;
  }

  async create(payload: CreateProductDto) {
    const newProduct = this.productRepositry.create(payload);
    if (payload.brandId) {
      const brand = await this.brandRepositry.findOne(payload.brandId);
      newProduct.brand = brand;
    }
    if (payload.categoriesIds) {
      const categories = await this.categoryRepositry.findByIds(
        payload.categoriesIds,
      );
      newProduct.categories = categories;
    }
    return this.productRepositry.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto) {
    const updatedProduct = await this.findOne(id);
    if (payload.brandId) {
      const brand = await this.brandRepositry.findOne(payload.brandId);
      updatedProduct.brand = brand;
    }
    this.productRepositry.merge(updatedProduct, payload);
    return this.productRepositry.save(updatedProduct);
  }

  async remove(id: number) {
    const deletedProduct = await this.findOne(id);
    return this.productRepositry.delete(deletedProduct.id);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepositry.findOne(productId, {
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepositry.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepositry.findOne(productId, {
      relations: ['categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID:${productId} not found`);
    }
    const category = await this.categoryRepositry.findOne(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with ID:${categoryId} not found`);
    }
    product.categories.push(category);
    return this.productRepositry.save(product);
  }
}
