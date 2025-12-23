import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'product' })
export class Product extends Document {

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number, required: true })
  stock: number;

  @Prop({ type: Boolean, default: true })
  iva: boolean

  // Relación con OrderDetail (si decides mantenerlo como colección separada)
  //@Prop({ type: [{ type: Types.ObjectId, ref: 'OrderDetail' }] })
  //orderDetails: Types.ObjectId[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
