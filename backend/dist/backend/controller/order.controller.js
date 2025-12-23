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
exports.OrderImageController = exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_entity_1 = require("../entity/order.entity");
const order_dto_1 = require("./dto/order.dto");
const user_entity_1 = require("../entity/user.entity");
const product_entity_1 = require("../entity/product.entity");
const client_entity_1 = require("../entity/client.entity");
const mongoose_1 = require("mongoose");
const jwt_guard_1 = require("./guard/jwt-guard");
const invoice_entity_1 = require("../entity/invoice.entity");
const mongodb_1 = require("mongodb");
const platform_express_1 = require("@nestjs/platform-express");
let OrderController = class OrderController {
    constructor(mongoose) {
        this.productRepo = mongoose.model('Product', product_entity_1.ProductSchema);
        this.clientRepo = mongoose.model('Client', client_entity_1.ClientSchema);
        this.orderRepo = mongoose.model('Order', order_entity_1.OrderSchema);
        this.orderDetailRepo = mongoose.model('OrderDetail', order_entity_1.OrderDetailSchema);
        this.userRepo = mongoose.model('User', user_entity_1.UserSchema);
        this.invoiceRepo = mongoose.model('Invoice', invoice_entity_1.InvoiceSchema);
    }
    async findAll() {
        const find = await this.orderRepo.find()
            .populate('user')
            .populate('client')
            .populate('details.product');
        return find;
    }
    async findAllForInvoices() {
        const orders = await this.orderRepo.find({ paid: true }).populate('user').populate('client').populate('details.product');
        const invoices = await this.invoiceRepo.find({ status: 'PAGADA' })
            .populate({
            path: 'order',
            populate: [{ path: 'client' }, { path: 'user' }, { path: 'details.product' }]
        });
        let ords = [];
        for (let i of orders) {
            let n = true;
            for (let j of invoices) {
                if (i._id.toString() == j.order._id.toString()) {
                    n = false;
                    break;
                }
            }
            if (n == true)
                ords.push(i);
        }
        return ords;
    }
    async findAllNoPaid() {
        const ordersWithInvoice = await this.invoiceRepo.distinct('order');
        const unpaidOrders = await this.orderRepo.find({ _id: { $nin: ordersWithInvoice } });
        return unpaidOrders;
    }
    async findOne(id) {
        const order = await this.orderRepo.findById(id);
        if (!order)
            throw new common_1.NotFoundException('Pedido no registrado');
        return order;
    }
    async create(data) {
        const findUser = await this.userRepo.findById(data.userId);
        if (!findUser)
            throw new common_1.NotFoundException('Usuario no registrado');
        const findClient = await this.clientRepo.findById(data.clientId);
        if (!findClient)
            throw new common_1.NotFoundException('Cliente no registrado');
        const idsProducts = [];
        data.details.forEach(e => { idsProducts.push(e.productId); });
        const findProducts = await this.productRepo.find({ _id: { $in: idsProducts } });
        if (findProducts.length == 0)
            throw new common_1.NotFoundException('Productos no registrados');
        for (const item of findProducts) {
            const result = data.details.filter(e => e.productId == item._id.toString())[0];
            if (item.stock < result.quantity)
                throw new common_1.BadRequestException(`Stock insuficiente para ${item.name}`);
            else
                item.stock -= result.quantity;
        }
        const details = [];
        let total = 0;
        let iva = 0;
        for (let i of data.details) {
            const p = findProducts.filter(e => (e._id.toString() == i.productId))[0];
            const dt = new this.orderDetailRepo({
                product: p,
                quantity: i.quantity,
                total: i.quantity * p.price
            });
            if (p.iva) {
                iva += i.quantity * p.price * 0.16;
            }
            total += i.quantity * p.price;
            details.push(dt);
        }
        const lastOrder = await this.orderRepo
            .findOne({}, { orderId: 1 })
            .sort({ orderId: -1 })
            .exec();
        const nextId = lastOrder ? lastOrder.orderId + 1 : 1;
        const order = new this.orderRepo({
            date: new Date(),
            details: details,
            user: findUser,
            client: findClient,
            total: total,
            paid: false,
            orderId: nextId,
            iva: iva
        });
        const orderNew = await this.orderRepo.create(order);
        for (let item of findProducts) {
            item.save();
        }
        return orderNew;
    }
    async remove(id) {
        await this.invoiceRepo.findOneAndDelete({ order: new mongodb_1.ObjectId(id) });
        await this.orderRepo.findByIdAndDelete(id);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('invoices'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findAllForInvoices", null);
__decorate([
    (0, common_1.Get)('no-paid'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findAllNoPaid", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.OrderInput]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "remove", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Inject)('NoSQL')),
    __metadata("design:paramtypes", [mongoose_1.Mongoose])
], OrderController);
let OrderImageController = class OrderImageController {
    constructor(mongoose) {
        this.orderRepo = mongoose.model('Order', order_entity_1.OrderSchema);
        this.invoiceRepo = mongoose.model('Invoice', invoice_entity_1.InvoiceSchema);
    }
    async update(id, file) {
        const order = await this.orderRepo.findById(id);
        if (!order)
            throw new common_1.NotFoundException('Pedido no registrado');
        const base64String = file.buffer.toString('base64');
        const dataUri = `data:${file.mimetype};base64,${base64String}`;
        order.imageBase64 = dataUri;
        order.paid = true;
        order.save();
    }
};
exports.OrderImageController = OrderImageController;
__decorate([
    (0, common_1.Post)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderImageController.prototype, "update", null);
exports.OrderImageController = OrderImageController = __decorate([
    (0, common_1.Controller)('order-image'),
    __param(0, (0, common_1.Inject)('NoSQL')),
    __metadata("design:paramtypes", [mongoose_1.Mongoose])
], OrderImageController);
//# sourceMappingURL=order.controller.js.map