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
exports.setupBorrowStatusChecker = setupBorrowStatusChecker;
const constants_helper_1 = require("./constants.helper");
function setupBorrowStatusChecker(dataSource) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield dataSource.query("SET GLOBAL event_scheduler = ON;");
            yield dataSource.query(`
      CREATE EVENT IF NOT EXISTS check_overdue_books
      ON SCHEDULE EVERY 1 HOUR
      DO
        UPDATE borrow
        SET status = '${constants_helper_1.Status.OVERDUE}' 
        WHERE status = '${constants_helper_1.Status.BORROWED}' 
        AND dueDate < NOW()
        AND returnDate IS NULL;
    `);
            console.log("Overdue book checker event created successfully");
        }
        catch (error) {
            console.error("Failed to create overdue book checker event:", error);
        }
    });
}
