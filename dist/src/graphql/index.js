"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlSchema = void 0;
const graphql_compose_1 = require("graphql-compose");
const hotel_1 = require("./hotel");
graphql_compose_1.schemaComposer.Query.addFields({
    hotelConnection: hotel_1.hotelConnection,
});
graphql_compose_1.schemaComposer.Mutation.addFields({
    hotelCreateMany: hotel_1.hotelCreateMany,
});
exports.graphqlSchema = graphql_compose_1.schemaComposer.buildSchema();
//# sourceMappingURL=index.js.map