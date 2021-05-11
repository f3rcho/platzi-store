import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Category extends Document {
  @Prop({ required: true, type: String })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
