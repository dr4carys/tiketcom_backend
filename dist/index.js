"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("./src");
const apollo_server_koa_1 = require("apollo-server-koa");
const graphql_1 = require("./src/graphql");
const dotenv_1 = __importDefault(require("dotenv"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_body_1 = __importDefault(require("koa-body"));
dotenv_1.default.config();
const router = new koa_router_1.default();
const server = new apollo_server_koa_1.ApolloServer({
    schema: graphql_1.graphqlSchema,
    context: (req) => ({
        requestContext: req.ctx,
        headers: req.ctx.headers,
    }),
});
server.start().then(() => {
    router.post('/graphql', server.getMiddleware());
    src_1.App.use((0, koa_body_1.default)());
    src_1.App.use(router.routes());
    console.log(`server listening on port 3001 on`);
    src_1.App.listen(process.env.PORT || 5000);
});
// import { App } from './src';
// console.log('server listening on port 3400');
// App.listen(3400);
//# sourceMappingURL=index.js.map