import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/products.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepositry: Repository<Product>,
  ) {}
  /**
   *
   * @returns All the elements from products
   */
  findAll() {
    return this.productRepositry.find();
  }

  async findOne(id: number) {
    const product = await this.productRepositry.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = this.productRepositry.create(payload);
    return this.productRepositry.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto) {
    const updatedProduct = await this.findOne(id);
    this.productRepositry.merge(updatedProduct, payload);
    return this.productRepositry.save(updatedProduct);
  }

  async remove(id: number) {
    const deletedProduct = await this.findOne(id);
    return this.productRepositry.delete(deletedProduct);
  }
}
