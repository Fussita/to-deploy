import { ProductInput, ProductUpdate } from './dto/product.dto';
import { Product } from 'src/entity/product.entity';
import { Mongoose } from 'mongoose';
export declare class ProductController {
    private readonly productRepo;
    constructor(mongoose: Mongoose);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Product, {}, import("mongoose").DefaultSchemaOptions> & Product & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Product, {}, import("mongoose").DefaultSchemaOptions> & Product & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(data: ProductInput): Promise<import("mongoose").Document<unknown, {}, Product, {}, import("mongoose").DefaultSchemaOptions> & Product & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, data: ProductUpdate): Promise<void>;
    remove(id: string): Promise<void>;
}
