import { premission } from './../middlewares/authorization.middleware';
import { Router } from "express";
import BookController from "../controllers/book.controller";
import authentication from "../middlewares/authentication.middleware";
import { Role } from "../helpers/constants.helper";
import catchAsync from "../middlewares/catchAsync.middleware";

const router = Router();

router.get('/books', catchAsync(BookController.getBooks));

router.get('/books/:id', catchAsync(BookController.getBookById));

router.post('/books', authentication, premission([Role.ADMIN, Role.MANAGER]), catchAsync(BookController.createBook));

router.put('/books/:id', authentication, premission([Role.ADMIN, Role.MANAGER]), catchAsync(BookController.updateBook));

router.delete('/books/:id', authentication, premission([Role.ADMIN, Role.MANAGER]), catchAsync(BookController.deleteBook));

export default router;