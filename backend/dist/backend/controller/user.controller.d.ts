import { User } from 'src/entity/user.entity';
import { UserInput, UserUpdate } from './dto/user.dto';
import { Mongoose } from 'mongoose';
export declare class UserController {
    private readonly userRepo;
    constructor(mongoose: Mongoose);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(data: UserInput): Promise<import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, data: UserUpdate): Promise<void>;
    remove(id: string): Promise<void>;
}
