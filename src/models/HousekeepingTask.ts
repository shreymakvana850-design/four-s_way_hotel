import mongoose, { Schema, Document } from 'mongoose';
import { HousekeepingTask } from '../types';

export interface HousekeepingTaskDocument extends Omit<HousekeepingTask, 'id'>, Document {}

const HousekeepingTaskSchema: Schema = new Schema(
  {
    roomNumber: { type: String, required: true },
    taskType: {
      type: String,
      enum: ['Deep Clean', 'Turndown Service', 'Linen Change', 'Butler Request', 'Maintenance Repair'],
      required: true,
    },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
    assignedTo: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    notes: { type: String, default: '' },
    timeLogged: { type: String, default: () => new Date().toLocaleTimeString() },
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

export const HousekeepingTaskModel =
  mongoose.models.HousekeepingTask || mongoose.model<HousekeepingTaskDocument>('HousekeepingTask', HousekeepingTaskSchema);
