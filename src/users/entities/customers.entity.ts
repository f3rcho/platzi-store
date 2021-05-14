import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Skill, SkillSchema } from './skills.entity';

@Schema()
export class Customer extends Document {
  @Prop({ required: true, type: String })
  name: string;
  @Prop({ required: true, type: String })
  email: string;
  @Prop({
    type: [SkillSchema],
  })
  skills: Types.Array<Skill>;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);
