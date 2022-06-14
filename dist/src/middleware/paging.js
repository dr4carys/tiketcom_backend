"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paging = void 0;
async function Paging(ctx, next) {
    const { limit, start, sort } = ctx.request.query;
    ctx._pagingRequest = {
        cursor: start,
        limit: limit,
        sort: sort,
    };
    await next();
    const { hotels } = ctx.body;
    const hasMore = hotels.length === parseInt(ctx._pagingRequest.limit) + 1;
    console.log('hotels baru >>', hotels);
    let nextStart;
    if (hasMore) {
        nextStart = hotels[parseInt(ctx._pagingRequest.limit) - 1].AvailableRoom;
        hotels.pop();
    }
    ctx.body = {
        hotels,
        paging: {
            hasMore,
            nextStart,
        },
    };
}
exports.Paging = Paging;
//# sourceMappingURL=paging.js.map