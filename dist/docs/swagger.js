"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerconfig_1 = require("../configs/swaggerconfig");
const swaggerDocs_1 = require("./swaggerDocs");
swaggerconfig_1.swaggerSpec.paths = swaggerDocs_1.paths;
const useSwagger = (app) => {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerconfig_1.swaggerSpec));
};
exports.default = useSwagger;
