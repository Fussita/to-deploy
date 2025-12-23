import { IOrder } from "./order"

export interface IUser {
  _id: string 
  token: string
  username: string 
  password: string  
  role: string
  order: IOrder[]
}
