import BookService from "../services/book.service";
import BaseController from "./base.controller";
import { Response, Request } from "express";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '../helpers/constants.helper';

class BookController extends BaseController {
    constructor() {
        super('BookController');
    }
    static getBooks = async (req: Request, res: Response) => {
        const controller = new BookController();
        const title = req.query.title as string || '';
        const page = Number(req.query.page) || DEFAULT_PAGE;
        const limit = Number(req.query.limit) || DEFAULT_LIMIT;
        const skip = (page - 1) * limit;
        await controller.handleRequest(res, req, (req) => BookService.getBooks(title, skip, limit));
    }

    static getBookById = async (req: Request, res: Response) => {
        const controller = new BookController();
        await controller.handleRequest(res, req, (req) => BookService.getBookById(Number(req.params.id)));
    }

    static createBook = async (req: Request, res: Response) => {
        const controller = new BookController();
        await controller.handleRequest(res, req, (req) => BookService.createBook(req.body));
    }

    static updateBook = async (req: Request, res: Response) => {
        const controller = new BookController();
        await controller.handleRequest(res, req, (req) => BookService.updateBook(Number(req.params.id), req.body));
    }

    static deleteBook = async (req: Request, res: Response) => {
        const controller = new BookController();
        await controller.handleRequest(res, req, (req) => BookService.deleteBook(Number(req.params.id)));
    }
}

export default BookController;
