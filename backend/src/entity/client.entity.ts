import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'client' })
export class Client extends Document {

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  cedula: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String })
  address: string;

  // Relación con Orders: se guarda como arreglo de ObjectIds
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Order' }] })
  order: Types.ObjectId[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);
