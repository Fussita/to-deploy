import { IOrder } from "./order";

export interface IClient {
  _id: string
  name: string;
  email: string;
  cedula: string
  phone: string;
  address: string;
  order: IOrder[]

}