import mongoose, { Schema, Document } from 'mongoose';
import { InventoryItem } from '../types';

export interface InventoryItemDocument extends Omit<InventoryItem, 'id'>, Document {}

const InventoryItemSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['Kitchen Raw Materials', 'Royal Linen & Bedding', 'Luxury Toiletries', 'Vintage Car Maintenance', 'Banquet & Decor'],
      required: true,
    },
    stockLevel: { type: Number, required: true },
    unit: { type: String, required: true },
    reorderPoint: { type: Number, required: true },
    supplier: { type: String, required: true },
    costPerUnit: { type: Number, required: true },
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

export const InventoryItemModel =
  mongoose.models.InventoryItem || mongoose.model<InventoryItemDocument>('InventoryItem', InventoryItemSchema);
