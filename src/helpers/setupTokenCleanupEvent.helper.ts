import { DataSource } from "typeorm";

export async function setupTokenCleanupEvent(dataSource: DataSource) {
  try {
    await dataSource.query("SET GLOBAL event_scheduler = ON;");
    
    await dataSource.query(`
      CREATE EVENT IF NOT EXISTS token_cleanup_event
      ON SCHEDULE EVERY 1 HOUR
      DO
        DELETE FROM token WHERE expiresAt < NOW();
    `);
    
    console.log("Token cleanup event created successfully");
  } catch (error) {
    console.error("Failed to create token cleanup event:", error);
  }
}