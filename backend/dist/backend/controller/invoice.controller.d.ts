import { InvoiceInput } from './dto/invoice.dto';
import { Mongoose } from 'mongoose';
import { Invoice } from 'src/entity/invoice.entity';
export declare class InvoiceController {
    private readonly invoiceRepo;
    private readonly orderRepo;
    constructor(mongoose: Mongoose);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Invoice, {}, import("mongoose").DefaultSchemaOptions> & Invoice & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Invoice, {}, import("mongoose").DefaultSchemaOptions> & Invoice & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(data: InvoiceInput): Promise<import("mongoose").Document<unknown, {}, Invoice, {}, import("mongoose").DefaultSchemaOptions> & Invoice & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<void>;
}
