import mongoose, { Schema } from 'mongoose';
// import { composeMongoose } from 'graphql-compose-mongoose';

export interface IHotel extends mongoose.Document {
  nameCategory: String;
  AvailableRoom: Number;
}
export const hotelSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    AvailableRoom: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

hotelSchema.index({ createdAt: 1, updatedAt: 1 });

export const Hotel = mongoose.model<IHotel>('Hotel', hotelSchema, 'Hotel', true);
// export const HotelTC = composeMongoose(Hotel);
