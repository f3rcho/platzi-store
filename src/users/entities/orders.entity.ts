import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// import { Product } from 'src/products/entitites/products.entity';
import { Customer } from './customers.entity';

@Schema()
export class Order extends Document {
  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true })
  customer: Customer | Types.ObjectId;

  // @Prop({ required: true, type: Array })
  // products: Product[];
}
export const OrderSchema = SchemaFactory.createForClass(Order);
