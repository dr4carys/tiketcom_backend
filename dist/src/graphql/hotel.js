"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelConnection = exports.hotelCreateMany = void 0;
const hotel_1 = require("../models/hotel");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const graphql_compose_1 = require("graphql-compose");
const HotelTC = (0, graphql_compose_mongoose_1.composeMongoose)(hotel_1.Hotel);
const inputNewTC = graphql_compose_1.schemaComposer.createInputTC({
    name: 'inputLimit',
    fields: {
        Limit: 'Int',
    },
});
const inputTotalTC = graphql_compose_1.schemaComposer.createInputTC({
    name: 'inpuTotal',
    fields: {
        total: 'Int',
    },
});
exports.hotelCreateMany = HotelTC.mongooseResolvers
    .createMany()
    .wrapResolve((next) => async (rp) => {
    const { inputTes } = rp.args;
    const data = [
        {
            Name: 'Hotel Gumilang',
            AvailableRoom: 200,
        },
        {
            Name: 'Hotel Safari',
            AvailableRoom: 150,
        },
        {
            Name: 'Hotel Indonesia',
            AvailableRoom: 500,
        },
        {
            Name: 'Hotel Aston',
            AvailableRoom: 450,
        },
        {
            Name: 'Hotel Amarsya',
            AvailableRoom: 150,
        },
        {
            Name: 'Hotel Parama',
            AvailableRoom: 200,
        },
        {
            Name: 'Hotel Rancamaya',
            AvailableRoom: 400,
        },
        {
            Name: 'Hotel Palace',
            AvailableRoom: 300,
        },
    ];
    rp.args = Object.assign(Object.assign({}, rp.args), { records: data ? data : inputTes });
    return next(rp);
})
    .removeArg('records')
    .addArgs({ inputTes: [inputNewTC], inputJumlah: inputTotalTC });
exports.hotelConnection = HotelTC.mongooseResolvers
    .connection({ defaultLimit: 2 })
    .addFilterArg({
    name: 'limit',
    type: 'Int!',
    description: 'limit',
    filterTypeNameFallback: 'FilterTextInput',
    query: (query, value, resolveParams) => {
        resolveParams.args.limit = value;
    },
})
    .addSortArg({
    name: '_ROOM_ASC',
    value: {
        AvailableRooms: 1,
    },
})
    .addSortArg({
    name: '_ROOM_DESC',
    value: {
        AvailableRooms: -1,
    },
});
//# sourceMappingURL=hotel.js.map