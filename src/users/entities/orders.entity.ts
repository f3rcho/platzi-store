import { Product } from 'src/products/entitites/products.entity';
import { Customer } from './customers.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop({ required: true, type: Date })
  date: Date;
  @Prop({ required: true })
  customer: Customer;
  @Prop({ required: true, type: Array })
  products: Product[];
}
export const OrderSchema = SchemaFactory.createForClass(Order);
