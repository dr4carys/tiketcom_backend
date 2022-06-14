import { Hotel } from '../models/hotel';
import { composeMongoose } from 'graphql-compose-mongoose';
import { schemaComposer, ResolverResolveParams } from 'graphql-compose';

const HotelTC = composeMongoose(Hotel);

const inputNewTC = schemaComposer.createInputTC({
  name: 'inputLimit',
  fields: {
    Limit: 'Int',
  },
});

const inputTotalTC = schemaComposer.createInputTC({
  name: 'inpuTotal',
  fields: {
    total: 'Int',
  },
});

export const hotelCreateMany = HotelTC.mongooseResolvers
  .createMany()
  .wrapResolve((next: any) => async (rp: ResolverResolveParams<any, any>) => {
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
    rp.args = {
      ...rp.args,
      records: data ? data : inputTes,
    };
    return next(rp);
  })
  .removeArg('records')
  .addArgs({ inputTes: [inputNewTC], inputJumlah: inputTotalTC });

export const hotelConnection = HotelTC.mongooseResolvers
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
