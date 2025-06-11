import BorrowService from "../services/borrow.service";
import { Response, Request } from "express";
import BaseController from "./base.controller";

class BorrowController extends BaseController {
    constructor() {
        super('BorrowController');
    }

    static borrowBook = async (req: Request, res: Response) => {
        const controller = new BorrowController()
        await controller.handleRequest(res, req, (req) => BorrowService.borrowBook(Number(req.user?.id), Number(req.params.id)));
    }

    static returnBook = async (req: Request, res: Response) => {
        const controller = new BorrowController();
        await controller.handleRequest(res, req, (req) => BorrowService.returnBook(Number(req.params.id)));
    }

    static approveReturn = async (req: Request, res: Response) => {
        const controller = new BorrowController();
        await controller.handleRequest(res, req, (req) => BorrowService.approveReturn(Number(req.params.id)));
    }

    static getBorrowedBooks = async (req: Request, res: Response) => {
        const controller = new BorrowController();
        await controller.handleRequest(res, req, (req) => BorrowService.getBorrowedBooks(Number(req.user?.id)));
    }
}

export default BorrowController;