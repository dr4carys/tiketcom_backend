"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagingContext = exports.paging = void 0;
const limit = parseInt(req.query.limit);
const cursor = req.query.cursor;
let decryptedCursor;
let tradesCollection;
if (cursor) {
    let decrypedDate = new Date(decryptedCursor * 1000);
    tradesCollection = await Trades.find({
        AvailableRoom: {
            $lt: new Date(cursor),
        },
    })
        .sort({ time: -1 })
        .limit(limit + 1)
        .exec();
}
else {
    tradesCollection = await Trades.find({})
        .sort({ time: -1 })
        .limit(limit + 1);
}
const hasMore = tradesCollection.length === limit + 1;
let nextCursor = null;
if (hasMore) {
    const nextCursorRecord = tradesCollection[limit];
    var unixTimestamp = Math.floor(nextCursorRecord.time.getTime() / 1000);
    nextCursor = encrypt(unixTimestamp.toString());
    tradesCollection.pop();
}
res.status(200).send({
    data: tradesCollection,
    paging: {
        hasMore,
        nextCursor,
    },
});
const paging = (defaultPerPage = 10) => async (ctx, next) => {
    const { limit, cursor } = ctx.request.query;
    await next();
    ctx._pagingRequest = {
        cursor: pageCalculated,
        perPage: perPageCalculated,
        skipRecord: (pageCalculated - 1) * perPageCalculated,
        limitRecord: perPageCalculated,
        sort: sort,
    };
    let tradesCollection;
    if (cursor) {
        let decrypedDate = new Date(decryptedCursor * 1000);
        tradesCollection = await Trades.find({
            AvailableRoom: {
                $lt: new Date(cursor),
            },
        })
            .sort({ time: -1 })
            .limit(limit + 1)
            .exec();
    }
    else {
        tradesCollection = await Trades.find({})
            .sort({ time: -1 })
            .limit(limit + 1);
    }
    const hasMore = tradesCollection.length === limit + 1;
    let nextCursor = null;
    if (hasMore) {
        const nextCursorRecord = tradesCollection[limit];
        var unixTimestamp = Math.floor(nextCursorRecord.time.getTime() / 1000);
        nextCursor = encrypt(unixTimestamp.toString());
        tradesCollection.pop();
    }
    res.status(200).send({
        data: tradesCollection,
        paging: {
            hasMore,
            nextCursor,
        },
    });
    // const { page, perPage, sort } = ctx.request.query;
    // const pageCalculated = Number(page) ? Number(page) : 1;
    // const perPageCalculated = Number(perPage) ? Number(perPage) : defaultPerPage;
    // ctx._pagingRequest = {
    //   page: pageCalculated,
    //   perPage: perPageCalculated,
    //   skipRecord: (pageCalculated - 1) * perPageCalculated,
    //   limitRecord: perPageCalculated,
    //   sort: sort,
    // };
    // await next();
    // const totalPage = Math.ceil(ctx.total / ctx._pagingRequest.perPage);
    // ctx._pagingResponse = {
    //   total: ctx.total,
    //   totalPage,
    //   page: ctx._pagingRequest.page,
    //   perPage: ctx._pagingRequest.perPage,
    //   hasMore: ctx._pagingRequest.page < totalPage,
    //   sort: ctx._pagingRequest.sort,
    // };
};
exports.paging = paging;
//# sourceMappingURL=paging.js.map