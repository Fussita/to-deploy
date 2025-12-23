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
exports.JwtGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("mongoose");
const user_entity_1 = require("../../entity/user.entity");
let JwtGuard = class JwtGuard {
    constructor(jwtService, mongoose) {
        this.jwtService = jwtService;
        this.userRepo = mongoose.model('User', user_entity_1.UserSchema);
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (!request.headers['authorization'])
            throw new common_1.UnauthorizedException();
        const [type, token] = request.headers['authorization'].split(' ') ?? [];
        if (type != 'Bearer' || !token)
            throw new common_1.UnauthorizedException();
        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: 'secret12345678' });
            const userData = await this.userRepo.findById(payload.id);
            if (!userData)
                throw new common_1.UnauthorizedException();
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
};
exports.JwtGuard = JwtGuard;
exports.JwtGuard = JwtGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('NoSQL')),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_1.Mongoose])
], JwtGuard);
//# sourceMappingURL=jwt-guard.js.map