import { ClientInput, ClientUpdate } from './dto/client.dto';
import { Client } from 'src/entity/client.entity';
import { Mongoose } from 'mongoose';
export declare class ClientController {
    private readonly clientRepo;
    constructor(mongoose: Mongoose);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Client, {}, import("mongoose").DefaultSchemaOptions> & Client & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Client, {}, import("mongoose").DefaultSchemaOptions> & Client & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(data: ClientInput): Promise<import("mongoose").Document<unknown, {}, Client, {}, import("mongoose").DefaultSchemaOptions> & Client & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, data: ClientUpdate): Promise<void>;
    remove(id: string): Promise<void>;
}
