import { BadRequestException, Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, UseGuards, OnModuleInit } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { User, UserSchema } from "src/entity/user.entity"
import { GetToken } from "./param/get-token.param"
import { JwtGuard } from "./guard/jwt-guard"
import { Model, Mongoose } from "mongoose"

@Controller('auth')
export class AuthController implements OnModuleInit {

    private readonly userRepo: Model<User>

    constructor( 
        @Inject('NoSQL') mongoose: Mongoose ,
        private readonly jwtService: JwtService,
    ) {
        this.userRepo = mongoose.model<User>('User', UserSchema)
    }

    async initAdmin() {
        if (await this.userRepo.countDocuments() == 0 ) {
            const user = new this.userRepo({
                username: 'admin',
                password: 'admin',
                role: 'Admin'
            }) 
            await this.userRepo.create(user)
        }
    }

    async onModuleInit() {
        try {
            await this.initAdmin();
        } catch (error) {
            console.error('Error inicializando admin:', error?.message ?? error);
        }
    }

    @Post('login')
    async logInUser( @Body() entry: { username: string, password: string } ) {
        const account = await this.userRepo.findOne({ username: entry.username })  
        if (!account) throw new BadRequestException('Usuario no registrado')
        if (account.password != entry.password) throw new BadRequestException('Contraseña incorrecta')
        const token = this.jwtService.sign( { id: account._id } )
        return {
            token: token,
            user: account
        }
    }

    @Get('verify-token')
    @UseGuards(JwtGuard)
    async verifyToken( @GetToken() token: string ) {
        const jwt = await this.jwtService.verifyAsync( token, { secret: 'secret12345678' })
        const account = await this.userRepo.findById( jwt.id ) 
        return account
    }
 
}