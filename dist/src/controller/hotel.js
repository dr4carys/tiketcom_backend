"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelWithOutDB = exports.hotelConnections = void 0;
const hotel_1 = require("../models/hotel");
async function hotelConnections(ctx, next) {
    const { cursor, limit, sort } = ctx._pagingRequest;
    const query = parseInt(cursor) != 0 && cursor
        ? {
            AvailableRoom: sort === 'DESC' ? { $lt: parseInt(cursor) } : { $gt: parseInt(cursor) },
        }
        : {};
    const HotelData = await hotel_1.Hotel.find(query)
        .sort(sort === 'DESC' ? { AvailableRoom: -1 } : { AvailableRoom: 1 })
        .limit(parseInt(limit) + 1);
    ctx.body = { hotels: HotelData };
    return next();
}
exports.hotelConnections = hotelConnections;
async function hotelWithOutDB(ctx, next) {
    const { cursor, limit, sort } = ctx._pagingRequest;
    const bunchData = [
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
    let b = 1;
    const HotelData = bunchData
        .sort((a, b) => (sort === 'DESC' ? b.AvailableRoom - a.AvailableRoom : a.AvailableRoom - b.AvailableRoom))
        .filter((n) => {
        return parseInt(cursor) != 0 && cursor
            ? sort === 'DESC'
                ? n.AvailableRoom < parseInt(cursor) && b < parseInt(limit) + 2
                    ? b++
                    : ''
                : n.AvailableRoom > parseInt(cursor) && b < parseInt(limit) + 2
                    ? b++
                    : ''
            : b < parseInt(limit) + 1
                ? b++
                : '';
    });
    ctx.body = { hotels: HotelData };
    return next();
}
exports.hotelWithOutDB = hotelWithOutDB;
//# sourceMappingURL=hotel.js.map