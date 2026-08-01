import mongoose, { Schema, Document } from 'mongoose';
import { Guest } from '../types';

export interface GuestDocument extends Omit<Guest, 'id'>, Document {}

const GuestSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    idType: { type: String, enum: ['Aadhaar Card', 'Passport', 'Driving License'], required: true },
    idNumber: { type: String, required: true },
    roomNumber: { type: String, required: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['CheckedIn', 'CheckedOut', 'Reserved'], default: 'CheckedIn' },
    vipTier: { type: String, enum: ['Royal VIP', 'Standard', 'Wedding Guest'], default: 'Standard' },
    notes: { type: String, default: '' },
    royalButlerAssigned: { type: String, default: '' },
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

export const GuestModel = mongoose.models.Guest || mongoose.model<GuestDocument>('Guest', GuestSchema);
