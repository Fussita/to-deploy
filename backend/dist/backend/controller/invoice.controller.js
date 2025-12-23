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
exports.InvoiceController = void 0;
const common_1 = require("@nestjs/common");
const invoice_dto_1 = require("./dto/invoice.dto");
const order_entity_1 = require("../entity/order.entity");
const mongoose_1 = require("mongoose");
const invoice_entity_1 = require("../entity/invoice.entity");
const jwt_guard_1 = require("./guard/jwt-guard");
let InvoiceController = class InvoiceController {
    constructor(mongoose) {
        this.invoiceRepo = mongoose.model('Invoice', invoice_entity_1.InvoiceSchema);
        this.orderRepo = mongoose.model('Order', order_entity_1.OrderSchema);
    }
    async findAll() {
        return await this.invoiceRepo.find()
            .populate({
            path: 'order',
            populate: [
                { path: 'client' },
                { path: 'user' },
                { path: 'details.product' },
            ]
        });
    }
    async findOne(id) {
        const invoice = await this.invoiceRepo.findById(id);
        if (!invoice)
            throw new common_1.NotFoundException('Factura no registrada');
        return invoice;
    }
    async create(data) {
        const result = await this.orderRepo.findById(data.orderId);
        if (!result)
            throw new common_1.NotFoundException('Pedido no registrado');
        if (result.paid != true)
            throw new common_1.BadRequestException('Pedido no pagado');
        let total = 0;
        result.details.forEach(e => total += e.total);
        const invoice = await new this.invoiceRepo({
            total: total,
            date: new Date(),
            order: result._id,
            status: 'PAGADA'
        });
        console.log(invoice);
        return await this.invoiceRepo.create(invoice);
    }
    async remove(id) {
        const inv = await this.invoiceRepo.findById(id);
        if (!inv)
            throw new common_1.NotFoundException('Factura no registrada');
        inv.status = 'ANULADA';
        inv.save();
    }
};
exports.InvoiceController = InvoiceController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [invoice_dto_1.InvoiceInput]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "remove", null);
exports.InvoiceController = InvoiceController = __decorate([
    (0, common_1.Controller)('invoice'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Inject)('NoSQL')),
    __metadata("design:paramtypes", [mongoose_1.Mongoose])
], InvoiceController);
//# sourceMappingURL=invoice.controller.js.map