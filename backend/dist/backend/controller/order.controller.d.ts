import { Order } from 'src/entity/order.entity';
import { OrderInput } from './dto/order.dto';
import { Mongoose } from 'mongoose';
export declare class OrderController {
    private readonly productRepo;
    private readonly orderRepo;
    private readonly orderDetailRepo;
    private readonly userRepo;
    private readonly clientRepo;
    private readonly invoiceRepo;
    constructor(mongoose: Mongoose);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Order, {}, import("mongoose").DefaultSchemaOptions> & Order & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findAllForInvoices(): Promise<any[]>;
    findAllNoPaid(): Promise<(import("mongoose").Document<unknown, {}, Order, {}, import("mongoose").DefaultSchemaOptions> & Order & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Order, {}, import("mongoose").DefaultSchemaOptions> & Order & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(data: OrderInput): Promise<import("mongoose").Document<unknown, {}, Order, {}, import("mongoose").DefaultSchemaOptions> & Order & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<void>;
}
export declare class OrderImageController {
    private readonly orderRepo;
    private readonly invoiceRepo;
    constructor(mongoose: Mongoose);
    update(id: string, file: Express.Multer.File): Promise<void>;
}
