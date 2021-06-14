import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entitites/products.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  private counterId = 2;
  private products: Product[] = [
    {
      id: 1,
      sku: '209060',
      name: 'Some shoes',
      price: 19990,
      stock: 0,
      url: 'xxx.com',
    },
    {
      id: 2,
      sku: '209038',
      name: 'Velvet',
      price: 18990,
      stock: 0,
      url: 'xxx.com',
    },
  ];
  /**
   *
   * @returns All the elements from products
   */
  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }
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
}
