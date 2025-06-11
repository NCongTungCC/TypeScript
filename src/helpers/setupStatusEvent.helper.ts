import { DataSource } from "typeorm";
import { Status } from "./constants.helper";

export async function setupBorrowStatusChecker(dataSource: DataSource) {
  try {
    await dataSource.query("SET GLOBAL event_scheduler = ON;");
    
    console.log("Checking for overdue books...");
    const result = await dataSource.query(`
      UPDATE borrow
      SET status = '${Status.OVERDUE}' 
      WHERE status = '${Status.BORROWED}' 
      AND dueDate < NOW() 
      AND returnDate IS NULL
    `);
    
    await dataSource.query(`
      CREATE EVENT IF NOT EXISTS check_overdue_books
      ON SCHEDULE EVERY 1 HOUR
      DO
        UPDATE borrow
        SET status = '${Status.OVERDUE}' 
        WHERE status = '${Status.BORROWED}' 
        AND dueDate < NOW()
        AND returnDate IS NULL;
    `);
    
    console.log("Overdue book checker event created successfully");
  } catch (error) {
    console.error("Failed to create overdue book checker event:", error);
  }
}