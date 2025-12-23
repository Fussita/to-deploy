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
exports.ClientUpdate = exports.ClientInput = void 0;
const class_validator_1 = require("class-validator");
class ClientInput {
}
exports.ClientInput = ClientInput;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(100, { message: 'El nombre no puede superar los 100 caracteres' }),
    __metadata("design:type", String)
], ClientInput.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MinLength)(3, { message: 'El email debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(30, { message: 'El email no puede superar los 30 caracteres' }),
    __metadata("design:type", String)
], ClientInput.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(11, { message: 'El telefono debe tener 11 caracteres' }),
    (0, class_validator_1.MaxLength)(12, { message: 'El telefono no puede superar los 11 caracteres' }),
    __metadata("design:type", String)
], ClientInput.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4, { message: 'La dirección debe tener al menos 4 caracteres' }),
    (0, class_validator_1.MaxLength)(200, { message: 'La dirección no puede superar los 200 caracteres' }),
    __metadata("design:type", String)
], ClientInput.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1, { message: 'La cedula debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(9, { message: 'La cedula no puede superar los 9 caracteres' }),
    __metadata("design:type", String)
], ClientInput.prototype, "cedula", void 0);
class ClientUpdate {
}
exports.ClientUpdate = ClientUpdate;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(30, { message: 'El nombre no puede superar los 30 caracteres' }),
    __metadata("design:type", String)
], ClientUpdate.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MinLength)(3, { message: 'El email debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(30, { message: 'El email no puede superar los 30 caracteres' }),
    __metadata("design:type", String)
], ClientUpdate.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'La dirección debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(50, { message: 'La dirección no puede superar los 30 caracteres' }),
    __metadata("design:type", String)
], ClientUpdate.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(11, { message: 'El telefono debe tener 11 caracteres' }),
    (0, class_validator_1.MaxLength)(12, { message: 'El telefono no puede superar los 11 caracteres' }),
    __metadata("design:type", String)
], ClientUpdate.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1, { message: 'La cedula debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(9, { message: 'La cedula no puede superar los 9 caracteres' }),
    __metadata("design:type", String)
], ClientUpdate.prototype, "cedula", void 0);
//# sourceMappingURL=client.dto.js.map