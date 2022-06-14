import { ParameterizedContext } from 'koa';
interface IBody {
  hotels: any;
}
export async function Paging(ctx: ParameterizedContext, next: Function) {
  const { limit, start, sort } = ctx.request.query;

  ctx._pagingRequest = {
    cursor: start as string,
    limit: limit as string,
    sort: sort as string,
  };

  await next();
  const { hotels } = ctx.body as IBody;
  const hasMore = hotels.length === parseInt(ctx._pagingRequest.limit) + 1;
  console.log('hotels baru >>', hotels);
  let nextStart: any;

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
