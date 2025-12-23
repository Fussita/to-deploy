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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUpdate = exports.ProductInput = void 0;
const class_validator_1 = require("class-validator");
class ProductInput {
}
exports.ProductInput = ProductInput;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
    (0, class_validator_1.MaxLength)(100, { message: 'El nombre no puede superar los 100 caracteres' }),
    __metadata("design:type", String)
], ProductInput.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'La descripción debe tener al menos 8  caracteres' }),
    (0, class_validator_1.MaxLength)(200, { message: 'La descripción no puede superar los 200 caracteres' }),
    __metadata("design:type", String)
], ProductInput.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'El precio debe ser un numero' }),
    (0, class_validator_1.Min)(0, { message: 'El precio debe ser mayor o igual a 0' }),
    __metadata("design:type", Number)
], ProductInput.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'El stock debe ser un numero' }),
    (0, class_validator_1.Min)(0, { message: 'El stock debe ser mayor o igual a 0' }),
    __metadata("design:type", Number)
], ProductInput.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ProductInput.prototype, "iva", void 0);
class ProductUpdate {
}
exports.ProductUpdate = ProductUpdate;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
    (0, class_validator_1.MaxLength)(100, { message: 'El nombre no puede superar los 100 caracteres' }),
    __metadata("design:type", String)
], ProductUpdate.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'La descripción debe tener al menos 8 caracteres' }),
    (0, class_validator_1.MaxLength)(200, { message: 'La descripción no puede superar los 200 caracteres' }),
    __metadata("design:type", String)
], ProductUpdate.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProductUpdate.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProductUpdate.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ProductUpdate.prototype, "iva", void 0);
//# sourceMappingURL=product.dto.js.map