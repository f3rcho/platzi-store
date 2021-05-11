import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, type: String })
  name: string;
  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: Boolean })
  isAdmin: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
