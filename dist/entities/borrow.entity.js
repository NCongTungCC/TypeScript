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
exports.Borrow = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const constants_helper_1 = require("../helpers/constants.helper");
const user_entity_1 = require("./user.entity");
const book_entity_1 = require("./book.entity");
let Borrow = class Borrow extends typeorm_1.BaseEntity {
};
exports.Borrow = Borrow;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Borrow.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], Borrow.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], Borrow.prototype, "bookId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Borrow.prototype, "borrowDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, nullable: true }),
    __metadata("design:type", Date)
], Borrow.prototype, "returnDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Borrow.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: constants_helper_1.Status }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Borrow.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], Borrow.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], Borrow.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.borrows, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], Borrow.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => book_entity_1.Book, (book) => book.borrows, { onDelete: 'CASCADE' }),
    __metadata("design:type", book_entity_1.Book)
], Borrow.prototype, "book", void 0);
exports.Borrow = Borrow = __decorate([
    (0, typeorm_1.Entity)()
], Borrow);
