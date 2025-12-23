import { Order } from 'src/entity/order.entity';
import { Mongoose } from 'mongoose';
export declare class ReportsController {
    private readonly productRepo;
    private readonly orderRepo;
    private readonly orderDetailRepo;
    private readonly userRepo;
    private readonly clientRepo;
    private readonly invoiceRepo;
    constructor(mongoose: Mongoose);
    getTopClientByRevenuePaid(): Promise<any[]>;
    getTopSellers(): Promise<any[]>;
    getTopProductByRevenuePaid(): Promise<{
        sellers: any[];
        client: any[];
        product: any;
    }>;
    countsBy(): Promise<{
        clients: number;
        invoices: number;
        products: number;
        totalAmount: number;
    }>;
    getMonthlyIncome(): Promise<any[]>;
    findAllNoPaid(): Promise<(import("mongoose").Document<unknown, {}, Order, {}, import("mongoose").DefaultSchemaOptions> & Order & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
