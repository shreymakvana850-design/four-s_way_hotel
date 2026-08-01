import mongoose, { Schema, Document } from 'mongoose';
import { StaffMember } from '../types';

export interface StaffMemberDocument extends Omit<StaffMember, 'id'>, Document {}

const StaffMemberSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ['Front Office Manager', 'Royal Butler', 'Executive Chef', 'Housekeeping Lead', 'Event Coordinator', 'Security Head'],
      required: true,
    },
    department: {
      type: String,
      enum: ['Front Office', 'Housekeeping', 'Kitchen & F&B', 'Event Ops', 'Management'],
      required: true,
    },
    shift: {
      type: String,
      enum: ['Morning (07:00 - 15:00)', 'Evening (15:00 - 23:00)', 'Night (23:00 - 07:00)'],
      required: true,
    },
    phone: { type: String, required: true },
    status: { type: String, enum: ['On Duty', 'Off Duty', 'On Leave'], default: 'On Duty' },
    rating: { type: Number, default: 5.0 },
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

export const StaffMemberModel = mongoose.models.StaffMember || mongoose.model<StaffMemberDocument>('StaffMember', StaffMemberSchema);
