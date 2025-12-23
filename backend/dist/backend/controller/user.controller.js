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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entity/user.entity");
const user_dto_1 = require("./dto/user.dto");
const mongoose_1 = require("mongoose");
const jwt_guard_1 = require("./guard/jwt-guard");
let UserController = class UserController {
    constructor(mongoose) {
        this.userRepo = mongoose.model('User', user_entity_1.UserSchema);
    }
    async findAll() {
        const find = await this.userRepo.find()
            .populate('order');
        return find;
    }
    async findOne(id) {
        const user = await this.userRepo.findById(id);
        if (!user)
            throw new common_1.NotFoundException('User no registrado');
        return user;
    }
    async create(data) {
        if (data.role != 'Admin' && data.role != 'Vendedor')
            throw new common_1.BadRequestException('Rol no válido');
        const result = await this.userRepo.findOne({ username: data.username });
        if (result)
            throw new common_1.BadRequestException('Username ya registrado');
        const user = await new this.userRepo({ ...data, });
        return await this.userRepo.create(user);
    }
    async update(id, data) {
        const user = await this.userRepo.findById(id);
        if (!user)
            throw new common_1.NotFoundException('User no registrado');
        if (data.username) {
            const result = await this.userRepo.findOne({ username: data.username });
            if (result)
                throw new common_1.BadRequestException('Username ya registrado');
        }
        Object.assign(user, data);
        user.save();
    }
    async remove(id) {
        await this.userRepo.findByIdAndDelete(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserInput]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserUpdate]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Inject)('NoSQL')),
    __metadata("design:paramtypes", [mongoose_1.Mongoose])
], UserController);
//# sourceMappingURL=user.controller.js.map