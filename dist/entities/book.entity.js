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
exports.Book = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const PrimaryGeneratedColumn_1 = require("typeorm/decorator/columns/PrimaryGeneratedColumn");
const borrow_entity_1 = require("./borrow.entity");
let Book = class Book extends typeorm_1.BaseEntity {
};
exports.Book = Book;
__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Book.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Title should not be empty' }),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Author should not be empty' }),
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Poster should not be empty' }),
    __metadata("design:type", String)
], Book.prototype, "poster", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Year should not be empty' }),
    __metadata("design:type", Number)
], Book.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Genre should not be empty' }),
    __metadata("design:type", String)
], Book.prototype, "genre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Description should not be empty' }),
    __metadata("design:type", String)
], Book.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Book.prototype, "totalBooks", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Book.prototype, "availableBooks", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Book.prototype, "borrowedBooks", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Book.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Book.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => borrow_entity_1.Borrow, (borrow) => borrow.bookId),
    __metadata("design:type", Array)
], Book.prototype, "borrows", void 0);
exports.Book = Book = __decorate([
    (0, typeorm_1.Entity)()
], Book);
