"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../entity/user.entity");
const get_token_param_1 = require("./param/get-token.param");
const jwt_guard_1 = require("./guard/jwt-guard");
const mongoose_1 = require("mongoose");
let AuthController = class AuthController {
    constructor(mongoose, jwtService) {
        this.jwtService = jwtService;
        this.userRepo = mongoose.model('User', user_entity_1.UserSchema);
    }
    async initAdmin() {
        if (await this.userRepo.countDocuments() == 0) {
            const user = new this.userRepo({
                username: 'admin',
                password: 'admin',
                role: 'Admin'
            });
            await this.userRepo.create(user);
        }
    }
    async onModuleInit() {
        try {
            await this.initAdmin();
        }
        catch (error) {
            console.error('Error inicializando admin:', error?.message ?? error);
        }
    }
    async logInUser(entry) {
        const account = await this.userRepo.findOne({ username: entry.username });
        if (!account)
            throw new common_1.BadRequestException('Usuario no registrado');
        if (account.password != entry.password)
            throw new common_1.BadRequestException('Contraseña incorrecta');
        const token = this.jwtService.sign({ id: account._id });
        return {
            token: token,
            user: account
        };
    }
    async verifyToken(token) {
        const jwt = await this.jwtService.verifyAsync(token, { secret: 'secret12345678' });
        const account = await this.userRepo.findById(jwt.id);
        return account;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logInUser", null);
__decorate([
    (0, common_1.Get)('verify-token'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, get_token_param_1.GetToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(0, (0, common_1.Inject)('NoSQL')),
    __metadata("design:paramtypes", [mongoose_1.Mongoose,
        jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map