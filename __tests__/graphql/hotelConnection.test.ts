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
let bunchData = [
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

it('should return 2 data in total because limit of the data is 2 and sort with availableRoom  ASC', async () => {
  const result = await server.executeOperation({
    query: HOTEL_CONNECTION,
    variables: {
      sort: '_ROOM_ASC',
    },
  });
  bunchData.sort((a, b) => {
    return a.AvailableRoom - b.AvailableRoom;
  });
  const resultData = result.data.hotelConnection.edges;
  let t: number = 0;
  resultData.forEach((n: any) => {
    expect(n.node.AvailableRoom).toBe(bunchData[t].AvailableRoom);
    t++;
  });
});

it('should return 2 data in total because limit of the data is 2 and sort with availableRoom  DESC ', async () => {
  const result = await server.executeOperation({
    query: HOTEL_CONNECTION,
    variables: {
      sort: '_ROOM_DESC',
    },
  });
  bunchData.sort((a, b) => {
    return b.AvailableRoom - a.AvailableRoom;
  });
  const resultData = result.data.hotelConnection.edges;
  let t: number = 0;
  resultData.forEach((n: any) => {
    expect(n.node.AvailableRoom).toBe(bunchData[t].AvailableRoom);
    t++;
  });
});

it('should return next 2 data after cursor MQ == sort with availableRoom DESC ', async () => {
  const result = await server.executeOperation({
    query: HOTEL_CONNECTION,
    variables: {
      sort: '_ROOM_DESC',
      after: 'MQ==',
    },
  });
  bunchData.sort((a, b) => {
    return b.AvailableRoom - a.AvailableRoom;
  });
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
