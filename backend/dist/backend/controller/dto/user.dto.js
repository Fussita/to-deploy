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
exports.UserUpdate = exports.UserInput = void 0;
const class_validator_1 = require("class-validator");
class UserInput {
}
exports.UserInput = UserInput;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(30, { message: 'El nombre de usuario no puede superar los 30 caracteres' }),
    __metadata("design:type", String)
], UserInput.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'La contraseña debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(30, { message: 'La contraseña no puede superar los 30 caracteres' }),
    __metadata("design:type", String)
], UserInput.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserInput.prototype, "role", void 0);
class UserUpdate {
}
exports.UserUpdate = UserUpdate;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(30, { message: 'El nombre de usuario no puede superar los 30 caracteres' }),
    __metadata("design:type", String)
], UserUpdate.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'La contraseña debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(30, { message: 'La contraseña no puede superar los 30 caracteres' }),
    __metadata("design:type", String)
], UserUpdate.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserUpdate.prototype, "role", void 0);
//# sourceMappingURL=user.dto.js.map