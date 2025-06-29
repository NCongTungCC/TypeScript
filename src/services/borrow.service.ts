import {Borrow} from '../entities/borrow.entity';
import {Book} from '../entities/book.entity'
import {Not} from 'typeorm'

class BorrowService {
    static async borrowBook(userId : number, bookId : number) {
        const borrow = await Borrow.findOne({
            where : {
                userId,
                bookId,
                status : Not('returned'),
            },
        })
        if(borrow) {
            return {
                code : 409,
                message : 'User has already borrowed this book and has not returned it yet'
            }
        }
        const book = await Book.findOne({where : {id : bookId}});
        if(!book) {
            return {
                code : 404,
                message : 'Book not found'
            }
        }
        if(book.availableBooks <= 0) {
            return {
                code : 409,
                message : 'No available copies of this book'
            }
        }
        const borrowDate = new Date();
        const dueDate = new Date(borrowDate);  
        dueDate.setDate(borrowDate.getDate() + 14);

        const newBorrow = Borrow.create({
            userId,
            bookId,
            borrowDate,
            dueDate,
            status: 'borrowed'
        });

        await Borrow.getRepository().manager.transaction(async transactionalEntityManager => {
            await transactionalEntityManager.save(newBorrow);

            book.availableBooks -= 1;
            book.borrowedBooks += 1;
            await transactionalEntityManager.save(book);
        });

        return {
            code: 200,
            message: 'Book borrowed successfully',
            data: newBorrow
        };
    }
    static async returnBook(borrowId : number) {
        const borrow = await Borrow.findOne({where : {id : borrowId}});
        if(!borrow) {
            return {
                code : 404,
                message : 'Borrow record not found'
            }
        }
        if(borrow.status === 'returned') {
            return {
                code : 409,
                message : 'This book has already been returned'
            }
        }
        if(borrow.status === 'pending') {
            return {
                code : 409,
                message : 'This book is still pending approval for return'
            }
        }
        borrow.status = 'pending';
        await borrow.save();
        return {
            code : 200,
            message : 'Book return is pending approval',
        }
    }

    static async approveReturn(borrowId : number) {
        const borrow = await Borrow.findOne({where : {id : borrowId}});
        if(!borrow) {
            return {
                code : 404,
                message : 'Borrow record not found'
            }
        }
        if(borrow.status !== 'pending') {
            return {
                code : 409,
                message : 'This book is not pending return approval'
            }
        }
        borrow.status = 'returned';
        await borrow.save();

        const book = await Book.findOne({where : {id : borrow.bookId}});
        if(book) {
            await Borrow.getRepository().manager.transaction(async transactionalEntityManager => {
                await transactionalEntityManager.save(borrow);

                book.availableBooks += 1;
                book.borrowedBooks -= 1;
                await transactionalEntityManager.save(book);
            });
        }

        return {
            code : 200,
            message : 'Book return approved successfully',
        }
    }

    static async getBorrowedBooks(userId: number) {
        const borrows = await Borrow.getRepository().find({
            where: { userId : userId, status: Not('returned') },
            relations: ['book']
        });
        return {
            code: 200,
            message: 'Borrowed books retrieved successfully',
            data: borrows
        };
    }

    
}

export default BorrowService