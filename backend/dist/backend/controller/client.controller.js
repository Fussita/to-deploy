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
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const client_dto_1 = require("./dto/client.dto");
const client_entity_1 = require("../entity/client.entity");
const mongoose_1 = require("mongoose");
const jwt_guard_1 = require("./guard/jwt-guard");
let ClientController = class ClientController {
    constructor(mongoose) {
        this.clientRepo = mongoose.model('Client', client_entity_1.ClientSchema);
    }
    async findAll() {
        const find = await this.clientRepo.find()
            .populate('order');
        return find;
    }
    async findOne(id) {
        const client = await this.clientRepo.findById(id);
        if (!client)
            throw new common_1.NotFoundException('Cliente no registrado');
        return client;
    }
    async create(data) {
        const cedula = await this.clientRepo.findOne({ cedula: data.cedula });
        if (cedula)
            throw new common_1.BadRequestException('Cedula ya registrada');
        const phone = await this.clientRepo.findOne({ phone: data.phone });
        if (phone)
            throw new common_1.BadRequestException('Telefono ya registrado');
        const email = await this.clientRepo.findOne({ email: data.email });
        if (email)
            throw new common_1.BadRequestException('Email ya registrado');
        const find = await this.clientRepo.findOne({ name: data.name, email: data.email, phone: data.phone });
        if (find)
            throw new common_1.BadRequestException('Cliente ya registrado');
        const client = new this.clientRepo(data);
        return await this.clientRepo.create(client);
    }
    async update(id, data) {
        if (data.name) {
            const find = await this.clientRepo.findOne({ name: data.name });
            if (find)
                throw new common_1.BadRequestException('Cliente ya registrado');
        }
        if (data.phone) {
            const phone = await this.clientRepo.findOne({ phone: data.phone });
            if (phone)
                throw new common_1.BadRequestException('Telefono ya registrado');
        }
        if (data.email) {
            const email = await this.clientRepo.findOne({ email: data.email });
            if (email)
                throw new common_1.BadRequestException('Email ya registrado');
        }
        if (data.cedula) {
            const cedula = await this.clientRepo.findOne({ cedula: data.cedula });
            if (cedula)
                throw new common_1.BadRequestException('Cedula ya registrada');
        }
        const item = await this.clientRepo.findById(id);
        if (!item)
            throw new common_1.NotFoundException('Cliente no registrado');
        Object.assign(item, data);
        item.save();
    }
    async remove(id) {
        await this.clientRepo.findByIdAndDelete(id);
    }
};
exports.ClientController = ClientController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_dto_1.ClientInput]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, client_dto_1.ClientUpdate]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "remove", null);
exports.ClientController = ClientController = __decorate([
    (0, common_1.Controller)('client'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Inject)('NoSQL')),
    __metadata("design:paramtypes", [mongoose_1.Mongoose])
], ClientController);
//# sourceMappingURL=client.controller.js.map