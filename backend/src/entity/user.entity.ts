import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Order } from './order.entity';

@Schema({ collection: 'user' })
export class User extends Document {

  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, enum: ['Admin', 'Vendedor'], required: true })
  role: string;

  // Relación con Orders: se guarda como arreglo de ObjectIds
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Order' }] })
  order: Order[];
}

export const UserSchema = SchemaFactory.createForClass(User);
