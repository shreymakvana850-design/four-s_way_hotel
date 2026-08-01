import mongoose, { Schema, Document } from 'mongoose';
import { Invoice } from '../types';

export interface InvoiceDocument extends Omit<Invoice, 'id'>, Document {}

const InvoiceSchema: Schema = new Schema(
  {
    invoiceNo: { type: String, required: true, unique: true },
    guestName: { type: String, required: true },
    roomNumber: { type: String, required: true },
    date: { type: String, required: true },
    items: [
      {
        description: String,
        amount: Number,
        gstRate: Number,
      },
    ],
    subtotal: { type: Number, required: true },
    cgst: { type: Number, required: true },
    sgst: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Paid', 'Pending'], default: 'Paid' },
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

export const InvoiceModel = mongoose.models.Invoice || mongoose.model<InvoiceDocument>('Invoice', InvoiceSchema);
