import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../../entities/products.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    { id: '1', sku: '209060', name: 'Some shoes', price: 19990 },
    { id: '2', sku: '209038', name: 'Velvet', price: 18990 },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    return this.products.find((item) => item.id === id);
  }
  create(payload: any) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  update(id: string, payload: any) {
    const product = this.findOne(id);
    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = {
      ...product,
      ...payload,
    };
    return this.products[index];
  }
  remove(id: string) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }
    throw new NotFoundException(`Products with id:${id} not found`);
  }
}
