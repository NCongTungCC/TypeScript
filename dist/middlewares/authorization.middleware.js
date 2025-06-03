"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.premission = void 0;
const premission = (roles) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== roles) {
            res.status(403).json({ message: 'Không có quyền truy cập' });
            return;
        }
        next();
    };
};
exports.premission = premission;
