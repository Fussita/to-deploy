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
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const order_entity_1 = require("../entity/order.entity");
const user_entity_1 = require("../entity/user.entity");
const product_entity_1 = require("../entity/product.entity");
const client_entity_1 = require("../entity/client.entity");
const mongoose_1 = require("mongoose");
const jwt_guard_1 = require("./guard/jwt-guard");
const invoice_entity_1 = require("../entity/invoice.entity");
let ReportsController = class ReportsController {
    constructor(mongoose) {
        this.productRepo = mongoose.model('Product', product_entity_1.ProductSchema);
        this.clientRepo = mongoose.model('Client', client_entity_1.ClientSchema);
        this.orderRepo = mongoose.model('Order', order_entity_1.OrderSchema);
        this.orderDetailRepo = mongoose.model('OrderDetail', order_entity_1.OrderDetailSchema);
        this.userRepo = mongoose.model('User', user_entity_1.UserSchema);
        this.invoiceRepo = mongoose.model('Invoice', invoice_entity_1.InvoiceSchema);
    }
    async getTopClientByRevenuePaid() {
        const result = await this.orderRepo.aggregate([
            { $match: { paid: true } },
            {
                $group: { _id: "$client", totalGastado: { $sum: "$total" } }
            },
            { $sort: { totalGastado: -1 } },
            { $limit: 1 },
            {
                $lookup: {
                    from: "client",
                    localField: "_id",
                    foreignField: "_id",
                    as: "cliente"
                }
            },
            { $unwind: "$cliente" },
            {
                $project: {
                    _id: 0,
                    cliente: "$cliente.name",
                    cedula: "$cliente.cedula",
                    email: "$cliente.email",
                    totalGastado: 1
                }
            }
        ]);
        return result;
    }
    async getTopSellers() {
        const result = await this.orderRepo.aggregate([
            { $match: { paid: true } },
            { $group: { _id: "$user", cantidadOrdenes: { $sum: 1 } } },
            { $sort: { cantidadOrdenes: -1 } },
            { $limit: 3 },
            {
                $lookup: {
                    from: "user",
                    localField: "_id",
                    foreignField: "_id",
                    as: "usuario"
                }
            },
            { $unwind: "$usuario" },
            {
                $project: {
                    _id: 0,
                    usuario: "$usuario.username",
                    role: "$usuario.role",
                    cantidadOrdenes: 1
                }
            }
        ]);
        return result;
    }
    async getTopProductByRevenuePaid() {
        const result = await this.orderRepo.aggregate([
            { $match: { paid: true } },
            { $unwind: "$details" },
            { $group: { _id: "$details.product", ganancias: { $sum: "$details.total" } } },
            { $sort: { ganancias: -1 } },
            { $limit: 1 },
            {
                $lookup: {
                    from: "product",
                    localField: "_id",
                    foreignField: "_id",
                    as: "producto"
                }
            },
            { $unwind: "$producto" },
            {
                $project: {
                    _id: 0,
                    producto: "$producto.name",
                    precio: "$producto.price",
                    ganancias: 1
                }
            }
        ]);
        const fin = {
            sellers: await this.getTopSellers(),
            client: await this.getTopClientByRevenuePaid(),
            product: result[0],
        };
        return fin;
    }
    async countsBy() {
        const clients = await this.clientRepo.countDocuments();
        const products = await this.productRepo.countDocuments();
        const result = await this.orderRepo.find({ paid: true });
        let amount = 0;
        for (let i of result) {
            amount += i.total;
        }
        return {
            clients: clients,
            invoices: result.length,
            products: products,
            totalAmount: amount
        };
    }
    async getMonthlyIncome() {
        return this.orderRepo.aggregate([
            { $match: { paid: true } },
            {
                $group: {
                    _id: {
                        year: { $year: '$date' },
                        month: { $month: '$date' }
                    },
                    totalIncome: { $sum: '$total' },
                    orderCount: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            },
            {
                $project: {
                    _id: 0,
                    year: '$_id.year',
                    month: '$_id.month',
                    totalIncome: 1,
                    orderCount: 1
                }
            }
        ]).exec();
    }
    async findAllNoPaid() {
        const ordersWithInvoice = await this.invoiceRepo.distinct('order');
        const unpaidOrders = await this.orderRepo.find({ _id: { $nin: ordersWithInvoice } });
        return unpaidOrders;
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('products'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getTopProductByRevenuePaid", null);
__decorate([
    (0, common_1.Get)('count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "countsBy", null);
__decorate([
    (0, common_1.Get)('monthly'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getMonthlyIncome", null);
__decorate([
    (0, common_1.Get)('no-paid'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "findAllNoPaid", null);
exports.ReportsController = ReportsController = __decorate([
    (0, common_1.Controller)('reports'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Inject)('NoSQL')),
    __metadata("design:paramtypes", [mongoose_1.Mongoose])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map