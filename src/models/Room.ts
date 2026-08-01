import mongoose, { Schema, Document } from 'mongoose';
import { Room } from '../types';

export interface RoomDocument extends Omit<Room, 'id'>, Document {}

const RoomSchema: Schema = new Schema(
  {
    number: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    floor: { type: String, required: true },
    status: {
      type: String,
      enum: ['Occupied', 'Available', 'Reserved', 'Housekeeping', 'Maintenance'],
      default: 'Available',
    },
    pricePerNight: { type: Number, required: true },
    capacity: { type: Number, required: true },
    features: [{ type: String }],
    currentGuestName: { type: String, default: null },
    checkInDate: { type: String, default: null },
    checkOutDate: { type: String, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc: any, ret: any) => {
        ret.id = ret._id ? ret._id.toString() : ret.id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const RoomModel = mongoose.models.Room || mongoose.model<RoomDocument>('Room', RoomSchema);
