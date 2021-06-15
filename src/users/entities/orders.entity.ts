import { Product } from '../../products/entities/products.entity';
import { Customer } from './customers.entity';

export class Order {
  date: Date;
  customer: Customer;
  products: Product[];
}
