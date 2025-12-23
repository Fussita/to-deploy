import { OnModuleInit } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/entity/user.entity";
import { Mongoose } from "mongoose";
export declare class AuthController implements OnModuleInit {
    private readonly jwtService;
    private readonly userRepo;
    constructor(mongoose: Mongoose, jwtService: JwtService);
    initAdmin(): Promise<void>;
    onModuleInit(): Promise<void>;
    logInUser(entry: {
        username: string;
        password: string;
    }): Promise<{
        token: string;
        user: import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    verifyToken(token: string): Promise<import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
