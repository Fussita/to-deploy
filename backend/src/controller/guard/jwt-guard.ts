import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Model, Mongoose } from "mongoose";
import { User, UserSchema } from "src/entity/user.entity";

@Injectable()
export class JwtGuard implements CanActivate {

    private readonly userRepo: Model<User>;
    constructor(
        private jwtService: JwtService,
        @Inject('NoSQL') mongoose: Mongoose,
    ) {
        this.userRepo = mongoose.model<User>('User', UserSchema)
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()       
        if ( !request.headers['authorization'] ) throw new UnauthorizedException() 
        const [type, token] = request.headers['authorization'].split(' ') ?? []
        if ( type != 'Bearer' || !token ) throw new UnauthorizedException()                       
        try {
            const payload = await this.jwtService.verifyAsync( token, { secret: 'secret12345678' } )
            const userData = await this.userRepo.findById(payload.id)
            if (!userData) throw new UnauthorizedException()
        } catch { throw new UnauthorizedException() }
        return true
    }
    

}