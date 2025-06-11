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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const constants_helper_1 = require("../helpers/constants.helper");
const borrow_entity_1 = require("./borrow.entity");
let User = class User extends typeorm_1.BaseEntity {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name must not be empty' }),
    (0, class_validator_1.Length)(5, 20, { message: 'Name must be between 5 and 20 characters' }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email must not be empty' }),
    (0, class_validator_1.Matches)(/^[\w-\.]+@gmail\.com$/, {
        message: 'Email must be in the correct format (e.g., example@gmail.com)'
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password must not be empty' }),
    (0, class_validator_1.Length)(6, 20, { message: 'Password must be between 6 and 20 characters' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: constants_helper_1.Role }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: constants_helper_1.Gender }),
    (0, class_validator_1.IsEnum)(constants_helper_1.Gender, { message: 'Invalid gender' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Gender must not be empty' }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Birthday must not be empty' }),
    __metadata("design:type", Date)
], User.prototype, "birthday", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => borrow_entity_1.Borrow, (borrow) => borrow.userId),
    __metadata("design:type", Array)
], User.prototype, "borrows", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
