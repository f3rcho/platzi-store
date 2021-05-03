import { Product } from 'src/products/entitites/products.entity';
import { Customer } from './customers.entity';

export class Order {
  date: Date;
  customer: Customer;
  products: Product[];
}
