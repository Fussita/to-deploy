import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'invoice' })
export class Invoice extends Document {
  
  // En Mongo no existe 'decimal' como en SQL, usamos Number o Decimal128
  @Prop({ type: Number, required: true })
  total: number;

  // Fecha con valor por defecto
  @Prop({ type: Date, default: Date.now })
  date: Date;

  // Relación con Order
  @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
  order: Types.ObjectId;

  // Anuladas (tecnicamente la orden se cancela)
  // Pagadas
  @Prop({ type: String, required: true })
  status: string
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
