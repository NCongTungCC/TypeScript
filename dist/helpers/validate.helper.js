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
exports.Validate = void 0;
const class_validator_1 = require("class-validator");
const Validate = (entity) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = yield (0, class_validator_1.validate)(entity);
    if (errors.length > 0) {
        const validationErrors = errors.map(err => ({
            property: err.property,
            constraints: err.constraints,
        }));
        return {
            code: 422,
            message: 'Validation failed',
            errors: validationErrors
        };
    }
    return {
        code: 200,
        message: 'Validation successfully'
    };
});
exports.Validate = Validate;
