import { IOrder } from "./order"

export interface IInvoice {
    _id: string
    total: number
    date: Date
    order: IOrder
    status: string
}