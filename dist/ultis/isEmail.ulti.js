"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = void 0;
const validateEmail = (email) => {
    if (!email) {
        return { isValid: false, message: 'Email không được để trống' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    return isValid
        ? { isValid: true }
        : { isValid: false, message: 'Định dạng email không hợp lệ' };
};
exports.validateEmail = validateEmail;
