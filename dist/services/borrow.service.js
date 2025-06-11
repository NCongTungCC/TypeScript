"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const borrow_entity_1 = require("../entities/borrow.entity");
const book_entity_1 = require("../entities/book.entity");
const typeorm_1 = require("typeorm");
class BorrowService {
    static borrowBook(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const borrow = yield borrow_entity_1.Borrow.find({
                where: {
                    userId,
                    status: (0, typeorm_1.Not)('returned'),
                    bookId
                },
            });
            if (borrow) {
                return {
                    code: 409,
                    message: 'User has already borrowed this book and has not returned it yet'
                };
            }
            const book = yield book_entity_1.Book.findOne({ where: { id: bookId } });
            if (!book) {
                return {
                    code: 404,
                    message: 'Book not found'
                };
            }
            if (book.availableBooks <= 0) {
                return {
                    code: 409,
                    message: 'No available copies of this book'
                };
            }
            const borrowDate = new Date();
            const dueDate = new Date(borrowDate);
            dueDate.setDate(borrowDate.getDate() + 14);
            const newBorrow = borrow_entity_1.Borrow.create({
                userId,
                bookId,
                borrowDate,
                dueDate,
                status: 'borrowed'
            });
            yield newBorrow.save();
            book.availableBooks -= 1;
            book.borrowedBooks += 1;
            yield book.save();
            return {
                code: 200,
                message: 'Book borrowed successfully',
                data: newBorrow
            };
        });
    }
    static returnBook(borrowId) {
        return __awaiter(this, void 0, void 0, function* () {
            const borrow = yield borrow_entity_1.Borrow.findOne({ where: { id: borrowId } });
            if (!borrow) {
                return {
                    code: 404,
                    message: 'Borrow record not found'
                };
            }
            if (borrow.status === 'returned') {
                return {
                    code: 409,
                    message: 'This book has already been returned'
                };
            }
            if (borrow.status === 'pending') {
                return {
                    code: 409,
                    message: 'This book is still pending approval for return'
                };
            }
            borrow.status = 'pending';
            yield borrow.save();
            return {
                code: 200,
                message: 'Book return is pending approval',
            };
        });
    }
    static approveReturn(borrowId) {
        return __awaiter(this, void 0, void 0, function* () {
            const borrow = yield borrow_entity_1.Borrow.findOne({ where: { id: borrowId } });
            if (!borrow) {
                return {
                    code: 404,
                    message: 'Borrow record not found'
                };
            }
            if (borrow.status !== 'pending') {
                return {
                    code: 409,
                    message: 'This book is not pending return approval'
                };
            }
            borrow.status = 'returned';
            yield borrow.save();
            const book = yield book_entity_1.Book.findOne({ where: { id: borrow.bookId } });
            if (book) {
                book.availableBooks += 1;
                book.borrowedBooks -= 1;
                yield book.save();
            }
            return {
                code: 200,
                message: 'Book return approved successfully',
            };
        });
    }
}
exports.default = BorrowService;
