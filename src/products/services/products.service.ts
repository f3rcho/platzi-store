import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entitites/products.entity';
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

  findOne(id: number) {
    const product = this.productRepositry.findOne();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }
  /*
  create(payload: CreateProductDto) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = {
      ...product,
      ...payload,
    };
    return this.products[index];
  }
  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Products with id:${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
  */
}
