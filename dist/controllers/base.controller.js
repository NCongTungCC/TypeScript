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
class BaseController {
    constructor(nameController) {
        this.nameController = nameController;
    }
    responseSuccess(res, result) {
        const response = Object.assign({}, result);
        const code = response === null || response === void 0 ? void 0 : response.code;
        res.status(code).json(response);
    }
    handleRequest(res, req, serviceMethod) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield serviceMethod(req);
            this.responseSuccess(res, result);
        });
    }
}
exports.default = BaseController;
