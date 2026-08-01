import mongoose, { Schema, Document } from 'mongoose';
import { DiningOrder } from '../types';

export interface DiningOrderDocument extends Omit<DiningOrder, 'id'>, Document {}

const DiningOrderSchema: Schema = new Schema(
  {
    outlet: {
      type: String,
      enum: ['Deep Mahal', 'Sheesh Mahal', 'Jal Mahal Terrace', 'In-Room Royal Dining'],
      required: true,
    },
    tableNumber: { type: String, required: true },
    roomNumber: { type: String, default: null },
    guestName: { type: String, default: null },
    items: [
      {
        id: String,
        name: String,
        price: Number,
        qty: Number,
        category: String,
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Received', 'Preparing', 'Served', 'Billed'], default: 'Received' },
    paymentMethod: { type: String, enum: ['Room Charge', 'UPI / Cash / Card'], default: 'Room Charge' },
    createdAt: { type: String, default: () => new Date().toLocaleTimeString() },
  },
  {
    timestamps: false,
    toJSON: {
      transform: (_doc: any, ret: any) => {
        ret.id = ret._id ? ret._id.toString() : ret.id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const DiningOrderModel = mongoose.models.DiningOrder || mongoose.model<DiningOrderDocument>('DiningOrder', DiningOrderSchema);
