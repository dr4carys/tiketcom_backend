import { Hotel } from '../models/hotel';
import { composeMongoose } from 'graphql-compose-mongoose';

const HotelTC = composeMongoose(Hotel);
export const hotelConnection = HotelTC.mongooseResolvers
  .connection({ defaultLimit: 2 })
  .addSortArg({
    name: '_ROOM_ASC',
    value: {
      AvailableRoom: 1,
    },
  })
  .addSortArg({
    name: '_ROOM_DESC',
    value: {
      AvailableRoom: -1,
    },
  });
