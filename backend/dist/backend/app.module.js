"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const client_controller_1 = require("./controller/client.controller");
const product_controller_1 = require("./controller/product.controller");
const user_controller_1 = require("./controller/user.controller");
const order_controller_1 = require("./controller/order.controller");
const invoice_controller_1 = require("./controller/invoice.controller");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("./mongoose");
const auth_controller_1 = require("./controller/auth.controller");
const reports_controller_1 = require("./controller/reports.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: 'secret12345678',
                signOptions: { expiresIn: '168h' }
            }),
        ],
        controllers: [
            order_controller_1.OrderImageController,
            reports_controller_1.ReportsController,
            product_controller_1.ProductController,
            client_controller_1.ClientController,
            user_controller_1.UserController,
            order_controller_1.OrderController,
            invoice_controller_1.InvoiceController,
            auth_controller_1.AuthController
        ],
        providers: [
            mongoose_1.MongooseDataBaseProvider
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map