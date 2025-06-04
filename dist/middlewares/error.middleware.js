"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error('Lỗi', err.message);
    res.status(500).json({
        code: 500,
        message: 'Đã xảy ra lỗi',
        error: err.message,
    });
};
exports.default = errorHandler;
