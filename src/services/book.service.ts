import { Like } from 'typeorm';
import {Book} from '../entities/book.entity'
import  {BookInterface}  from '../interfaces/book.interface';
import { Validate } from '../helpers/validate.helper';

class BookService {
    static async getBooks(title: string, skip : number, limit : number) {
        const [books, total] = await Book.findAndCount({ 
            where: { title: Like(`%${title}%`) }, 
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
                books : books,
                currentPage,
                totalPages,
                totalItems: total
            }
        };
    }

    static async getBookById(id: number) {
        const book = await Book.findOne({ where: { id } });
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
    }

    static async createBook(payload: Partial<BookInterface>) {
        const book = await Book.findOne({ where: { title: payload.title } });
        if (book) {
            return {
                code: 409,
                message: 'Book with this title already exists'
            };
        }
        const newBook = Book.create({
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
        const validationResult = await Validate(newBook);
        if (validationResult && validationResult.code !== 200) {
            return validationResult;
        }
        await newBook.save();
        return {
            code: 201,
            message: 'Book created successfully',
            data: newBook
        };
    }

    static async updateBook(id: number, payload: Partial<Book>) {
        const book = await Book.findOne({ where: { id } });
        if (!book) {
            return {
                code: 404,
                message: 'Book not found'
            };
        }
        const updateData = {
            ...payload,
            genre: payload.genre as any
        };
        await Book.update({ id }, updateData);
        return {
            code: 200,
            message: 'Book updated successfully',
            data: book
        };
    }

    static async deleteBook(id: number) {
        const book = await Book.findOne({ where: { id } });
        if (!book) {
            return {
                code: 404,
                message: 'Book not found'
            };
        }
        await book.remove();
        return {
            code: 200,
            message: 'Book deleted successfully'
        };
    }
}

export default BookService;
