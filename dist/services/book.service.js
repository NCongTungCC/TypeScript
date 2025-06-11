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
const typeorm_1 = require("typeorm");
const book_entity_1 = require("../entities/book.entity");
const validate_helper_1 = require("../helpers/validate.helper");
class BookService {
    static getBooks(title, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const [books, total] = yield book_entity_1.Book.findAndCount({
                where: { title: (0, typeorm_1.Like)(`%${title}%`) },
                skip,
                take: limit,
                order: { createdAt: 'DESC' }
            });
            const currentPage = Math.floor(skip / limit) + 1;
            const totalPages = Math.ceil(total / limit);
            if (books.length === 0) {
                return {
                    code: 404,
                    message: 'No books found'
                };
            }
            return {
                code: 200,
                message: 'Books retrieved successfully',
                data: {
                    books: books,
                    currentPage,
                    totalPages,
                    totalItems: total
                }
            };
        });
    }
    static getBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield book_entity_1.Book.findOne({ where: { id } });
            if (!book) {
                return {
                    code: 404,
                    message: 'Book not found'
                };
            }
            return {
                code: 200,
                message: 'Book retrieved successfully',
                data: book
            };
        });
    }
    static createBook(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield book_entity_1.Book.findOne({ where: { title: payload.title } });
            if (book) {
                return {
                    code: 409,
                    message: 'Book with this title already exists'
                };
            }
            const newBook = book_entity_1.Book.create({
                title: payload.title,
                author: payload.author,
                poster: payload.poster,
                genre: payload.genre,
                year: payload.year,
                description: payload.description,
                totalBooks: payload.totalBooks,
                availableBooks: payload.availableBooks,
                borrowedBooks: payload.borrowedBooks
            });
            const validationResult = yield (0, validate_helper_1.Validate)(newBook);
            if (validationResult && validationResult.code !== 200) {
                return validationResult;
            }
            yield newBook.save();
            return {
                code: 201,
                message: 'Book created successfully',
                data: newBook
            };
        });
    }
    static updateBook(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield book_entity_1.Book.findOne({ where: { id } });
            if (!book) {
                return {
                    code: 404,
                    message: 'Book not found'
                };
            }
            const updateData = Object.assign(Object.assign({}, payload), { genre: payload.genre });
            yield book_entity_1.Book.update({ id }, updateData);
            return {
                code: 200,
                message: 'Book updated successfully',
                data: book
            };
        });
    }
    static deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield book_entity_1.Book.findOne({ where: { id } });
            if (!book) {
                return {
                    code: 404,
                    message: 'Book not found'
                };
            }
            yield book.remove();
            return {
                code: 200,
                message: 'Book deleted successfully'
            };
        });
    }
}
exports.default = BookService;
