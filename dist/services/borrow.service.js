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
            const borrow = yield borrow_entity_1.Borrow.findOne({
                where: {
                    userId,
                    bookId,
                    status: (0, typeorm_1.Not)('returned'),
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
            yield borrow_entity_1.Borrow.getRepository().manager.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                yield transactionalEntityManager.save(newBorrow);
                book.availableBooks -= 1;
                book.borrowedBooks += 1;
                yield transactionalEntityManager.save(book);
            }));
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
                yield borrow_entity_1.Borrow.getRepository().manager.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                    yield transactionalEntityManager.save(borrow);
                    book.availableBooks += 1;
                    book.borrowedBooks -= 1;
                    yield transactionalEntityManager.save(book);
                }));
            }
            return {
                code: 200,
                message: 'Book return approved successfully',
            };
        });
    }
    static getBorrowedBooks(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const borrows = yield borrow_entity_1.Borrow.getRepository().find({
                where: { userId: userId, status: (0, typeorm_1.Not)('returned') },
                relations: ['book']
            });
            return {
                code: 200,
                message: 'Borrowed books retrieved successfully',
                data: borrows
            };
        });
    }
}
exports.default = BorrowService;
