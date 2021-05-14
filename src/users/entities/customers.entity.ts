import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Customer extends Document {
  @Prop({ required: true, type: String })
  name: string;
  @Prop({ required: true, type: String })
  email: string;
  @Prop({
    type: [{ name: { type: String }, color: { type: String } }],
  })
  skills: Types.Array<Record<string, any>>;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);
