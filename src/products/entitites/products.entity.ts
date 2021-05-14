import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Brand } from './brands.entity';
import { SubDoc, SubDocSchema } from './sub-doc.entity';
@Schema()
export class Product extends Document {
  @Prop({ required: true })
  sku: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true, index: true })
  price: number;

  @Prop({ type: Number })
  stock: number;

  @Prop({ required: true })
  url: string;

  @Prop(
    raw({
      name: { type: String },
      image: { type: String },
    }),
  )
  category: Record<string, any>;

  // relation one to one
  @Prop({ type: Types.ObjectId, ref: Brand.name })
  brand: Brand | Types.ObjectId;
  // relations typed one to one
  @Prop({ type: SubDocSchema })
  subDoc: SubDoc;
  // realtiosntyped one to n
  @Prop({ type: [SubDocSchema] })
  subDocs: Types.Array<SubDoc>;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: 1, stock: -1 });
