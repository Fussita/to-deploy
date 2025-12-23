import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class OrderDetail {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Number, required: true })
  total: number;
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);

@Schema({ collection: 'order' })
export class Order extends Document {

  @Prop({ type: Date, default: Date.now })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
  client: Types.ObjectId;

  @Prop({ type: [OrderDetailSchema], default: [] })
  details: OrderDetail[];

  @Prop({ type: Number, default: 0 })
  total: number;

  @Prop({ type: Boolean, default: false })
  paid: boolean

  @Prop({ type: String, required: false })
  imageBase64: string

  @Prop({ type: Number, required: true })
  orderId: number;

  @Prop({ type: Number, required: true })
  iva: number
}

export const OrderSchema = SchemaFactory.createForClass(Order);
