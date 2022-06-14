import { ApolloServer } from 'apollo-server-lambda';
import { graphqlSchema } from '../../src/graphql';
import { connect, disconnect } from '../helper/dbHandler';
import { Hotel } from '../../src/models/hotel';

let server: ApolloServer;
const HOTEL_CONNECTION = `query hotelConnection($after: String,$sort:SortConnectionHotelEnum){
  hotelConnection(after: $after,sort:$sort){
    edges{
			node{
				_id
				Name
        AvailableRoom
				createdAt
			}
		}
		pageInfo{
			hasNextPage
			startCursor
			endCursor
		}
	}
}`;
let bunchData = <any>[];
for (let x = 0; x < 5; x++) {
  bunchData[x] = {
    AvailableRoom: x,
    Name: 'hotel' + x,
  };
}

beforeAll(async () => {
  await connect();
  await Hotel.create(bunchData);
  server = new ApolloServer({
    schema: graphqlSchema,
    context: ({ event, context, express }) => ({
      requestContext: { state: {} },
    }),
  });
});

afterEach(async () => {
  jest.clearAllMocks();
});

afterAll(async () => {
  await disconnect();
  await server.stop();
});

it.only('should return 2 data in total because limit of the data is 2 and sort with DATE ASC ', async () => {
  const result = await server.executeOperation({
    query: HOTEL_CONNECTION,
    variables: {
      sort: '_ROOM_ASC',
      filter: { limit: 2 },
    },
  });
  console.log('result >>>', result);
  // expect(result.data.hotelConnection.edges).toHaveLength(2);
  // const resultData = result.data.hotelConnection.edges;
  // expect(result.errors).toBeUndefined();
  // let t = 0;
  // resultData.forEach((n: any) => {
  //   expect(bunchData[t].Name).toBe(n.node.Name);
  //   expect(bunchData[t].AvailableRoom).toBe(n.node.AvailableRoom);
  //   t++;
  // });
});
it('should return 2 data in total because limit of the data is 2 and sort with DATE DESC ', async () => {
  const result = await server.executeOperation({
    query: HOTEL_CONNECTION,
    variables: {
      sort: '_DATE_DESC',
    },
  });
  expect(result.data.hotelConnection.edges).toHaveLength(2);
  const resultData = result.data.hotelConnection.edges;
  expect(result.errors).toBeUndefined();
  let t = 4;
  resultData.forEach((n: any) => {
    expect(bunchData[t].Name).toBe(n.node.Name);
    expect(bunchData[t].AvailableRoom).toBe(n.node.AvailableRoom);
    t--;
  });
});
it('should return next 2 data after cursor MQ == sort and sort with DATE ASC ', async () => {
  const result = await server.executeOperation({
    query: HOTEL_CONNECTION,
    variables: {
      sort: '_DATE_ASC',
      after: 'MQ==',
    },
  });
  console.log('ressss', result.data.hotelConnection.edges);
  expect(result.data.hotelConnection.edges).toHaveLength(2);
  const resultData = result.data.hotelConnection.edges;
  expect(result.errors).toBeUndefined();
  let t = 2;
  resultData.forEach((n: any) => {
    expect(bunchData[t].Name).toBe(n.node.Name);
    expect(bunchData[t].AvailableRoom).toBe(n.node.AvailableRoom);
    t++;
  });
});
