"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const router_1 = __importDefault(require("./router"));
const koa_1 = __importDefault(require("koa"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const app = new koa_1.default();
let conn;
app.use(async (ctx, next) => {
    if (conn === undefined)
        conn = await mongoose_1.default.connect(config_1.MONGODB_URL);
    mongoose_1.default.set('debug', config_1.MONGO_DEBUG);
    await next();
});
app.use(router_1.default.routes());
app.use(router_1.default.allowedMethods());
exports.App = app;
//# sourceMappingURL=index.js.map