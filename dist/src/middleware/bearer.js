"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paging = void 0;
const hotel_1 = require("../models/hotel");
async function paging(ctx, next) {
    const { limit, cursor } = ctx.request.query;
    const newCursor = cursor;
    const newLimit = limit;
    let HotelData;
    await next();
    if (cursor) {
        HotelData = await hotel_1.Hotel.find({
            AvailableRoom: {
                $lt: parseInt(newCursor),
            },
        })
            .sort({ AvailableRoom: -1 })
            .limit(parseInt(newLimit) + 1);
    }
    else {
        HotelData = await hotel_1.Hotel.find({})
            .sort({ AvailableRoom: -1 })
            .limit(parseInt(newLimit) + 1);
    }
    const hasMore = HotelData.length === parseInt(newLimit) + 1;
    let nextCursor;
    if (hasMore) {
        nextCursor = HotelData[parseInt(newLimit) - 1].AvailableRoom;
        HotelData.pop();
    }
    ctx.body = {
        body: HotelData,
        paging: {
            hasMore,
            nextCursor,
        },
    };
    console.log(ctx);
}
exports.paging = paging;
//# sourceMappingURL=bearer.js.map