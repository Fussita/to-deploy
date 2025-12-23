import { IClient } from "./client";
import { IProduct } from "./product";
import { IUser } from "./user";

export interface IOrder {
  _id: string
  date: Date;
  user?: IUser | null
  client?: IClient | null
  details?: OrderDetail[]
  total: number
  status: string
  paid: boolean
  iva: number
  orderId: number
  imageBase64: string
}

export interface OrderDetail {
    _id: string
    product: IProduct
    quantity: number
    total: number
}