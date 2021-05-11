import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Customer extends Document {
  @Prop({ required: true, type: String })
  name: string;
  @Prop({ required: true, type: String })
  email: string;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);
