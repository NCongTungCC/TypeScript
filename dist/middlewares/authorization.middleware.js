"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.premission = void 0;
const premission = (roles) => {
    return (req, res, next) => {
        var _a;
        const allowedRoles = Array.isArray(roles) ? roles : [roles];
        if (!req.user || !allowedRoles.includes((_a = req.user) === null || _a === void 0 ? void 0 : _a.role)) {
            res.status(403).json({ message: 'Không có quyền truy cập' });
            return;
        }
        next();
    };
};
exports.premission = premission;
