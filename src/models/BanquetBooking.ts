import mongoose, { Schema, Document } from 'mongoose';
import { BanquetBooking } from '../types';

export interface BanquetBookingDocument extends Omit<BanquetBooking, 'id'>, Document {}

const BanquetBookingSchema: Schema = new Schema(
  {
    venue: {
      type: String,
      enum: ['Suryavanshi Lawns', 'Darbar Hall', 'Heritage Courtyard', 'Poolside Pavilion'],
      required: true,
    },
    eventType: {
      type: String,
      enum: ['Royal Wedding', 'Sangeet & Mehendi', 'Corporate Summit', 'Royal Gala Dinner'],
      required: true,
    },
    clientName: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    guestCount: { type: Number, required: true },
    packageType: { type: String, enum: ['Ultra Luxury Royal', 'Grand Heritage', 'Bespoke'], required: true },
    totalPrice: { type: Number, required: true },
    advancePaid: { type: Number, default: 0 },
    stageSetup: { type: String, default: '' },
    specialRequests: { type: String, default: '' },
    status: { type: String, enum: ['Confirmed', 'Tentative', 'Completed'], default: 'Confirmed' },
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

export const BanquetBookingModel =
  mongoose.models.BanquetBooking || mongoose.model<BanquetBookingDocument>('BanquetBooking', BanquetBookingSchema);
