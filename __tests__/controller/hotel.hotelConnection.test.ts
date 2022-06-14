import { connect, disconnect } from '../helper/dbHandler';
import startServer from '../helper/appHandler';
import request from 'supertest';
import { Hotel } from '../../src/models/hotel';

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

const app = startServer();

beforeAll(async () => {
  await connect();
  await Hotel.create(bunchData);
});

afterEach(async () => {
  jest.clearAllMocks();
});

afterAll(async () => await disconnect());

it('should return response 2 data with sort by ASC of Availableroom', async () => {
  const server = app.listen();
  const uri = `/hotel`;
  bunchData.sort((a, b) => {
    return a.AvailableRoom - b.AvailableRoom;
  });
  const res = await request(server).get(uri).query({ limit: 2 }).query({ sort: 'ASC' });
  const resultData = res.body.hotels;
  let t: number = 0;
  resultData.forEach((n: any) => {
    expect(n.AvailableRoom).toBe(bunchData[t].AvailableRoom);
    t++;
  });
  server.close();
});

it('should return response 2 data with sort by DESC of Availableroom', async () => {
  const server = app.listen();
  const uri = `/hotel`;
  bunchData.sort((a, b) => {
    return b.AvailableRoom - a.AvailableRoom;
  });
  const res = await request(server).get(uri).query({ limit: 2 }).query({ sort: 'DESC' });
  const resultData = res.body.hotels;
  let t: number = 0;
  resultData.forEach((n: any) => {
    expect(n.AvailableRoom).toBe(bunchData[t].AvailableRoom);
    t++;
  });
  server.close();
});

it('should return response 2 data with sort by DESC of Availableroom with start cursor number 0 ', async () => {
  const server = app.listen();
  const uri = `/hotel`;
  bunchData.sort((a, b) => {
    return b.AvailableRoom - a.AvailableRoom;
  });
  const res = await request(server).get(uri).query({ limit: 2 }).query({ sort: 'DESC' }).query({ start: 0 });
  const resultData = res.body.hotels;
  let t: number = 0;
  resultData.forEach((n: any) => {
    expect(n.AvailableRoom).toBe(bunchData[t].AvailableRoom);
    t++;
  });
  server.close();
});

it('should return response 2 data with sort by DESC of Availableroom with start cursor number 450 ', async () => {
  const server = app.listen();
  const uri = `/hotel`;
  bunchData.sort((a, b) => {
    return b.AvailableRoom - a.AvailableRoom;
  });
  const res = await request(server).get(uri).query({ limit: 2 }).query({ sort: 'DESC' }).query({ start: 450 });
  const resultData = res.body.hotels;
  let t: number = 2;
  resultData.forEach((n: any) => {
    expect(n.AvailableRoom).toBe(bunchData[t].AvailableRoom);
    t++;
  });
  server.close();
});

it('should return response 2 data with sort by DESC of Availableroom with start cursor number 300 ', async () => {
  const server = app.listen();
  const uri = `/hotel`;
  bunchData.sort((a, b) => {
    return b.AvailableRoom - a.AvailableRoom;
  });
  const res = await request(server).get(uri).query({ limit: 2 }).query({ sort: 'DESC' }).query({ start: 300 });
  const resultData = res.body.hotels;
  let t: number = 4;
  resultData.forEach((n: any) => {
    expect(n.AvailableRoom).toBe(bunchData[t].AvailableRoom);
    t++;
  });
  server.close();
});

it('should return response 2 data with sort by ASC of Availableroom with start cursor number 250 ', async () => {
  const server = app.listen();
  const uri = `/hotel`;
  bunchData.sort((a, b) => {
    return a.AvailableRoom - b.AvailableRoom;
  });
  const res = await request(server).get(uri).query({ limit: 2 }).query({ sort: 'ASC' }).query({ start: 250 });
  const resultData = res.body.hotels;
  let t: number = 4;
  resultData.forEach((n: any) => {
    expect(n.AvailableRoom).toBe(bunchData[t].AvailableRoom);
    t++;
  });
  server.close();
});
