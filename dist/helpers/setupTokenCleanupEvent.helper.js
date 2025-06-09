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
exports.setupTokenCleanupEvent = setupTokenCleanupEvent;
function setupTokenCleanupEvent(dataSource) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield dataSource.query("SET GLOBAL event_scheduler = ON;");
            yield dataSource.query(`
      CREATE EVENT IF NOT EXISTS token_cleanup_event
      ON SCHEDULE EVERY 1 HOUR
      DO
        DELETE FROM token WHERE expiresAt < NOW();
    `);
            console.log("Token cleanup event created successfully");
        }
        catch (error) {
            console.error("Failed to create token cleanup event:", error);
        }
    });
}
