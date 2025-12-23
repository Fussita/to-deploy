import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Mongoose } from "mongoose";
export declare class JwtGuard implements CanActivate {
    private jwtService;
    private readonly userRepo;
    constructor(jwtService: JwtService, mongoose: Mongoose);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
