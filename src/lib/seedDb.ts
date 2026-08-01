import { RoomModel } from '../models/Room';
import { GuestModel } from '../models/Guest';
import { HousekeepingTaskModel } from '../models/HousekeepingTask';
import { DiningOrderModel } from '../models/DiningOrder';
import { BanquetBookingModel } from '../models/BanquetBooking';
import { StaffMemberModel } from '../models/StaffMember';
import { InventoryItemModel } from '../models/InventoryItem';
import { InvoiceModel } from '../models/Invoice';

import {
  INITIAL_ROOMS,
  INITIAL_GUESTS,
  INITIAL_TASKS,
  INITIAL_ORDERS,
  INITIAL_BANQUETS,
  INITIAL_STAFF,
  INITIAL_INVENTORY,
  INITIAL_INVOICES,
} from '../data/mockData';

export async function seedDatabaseIfEmpty() {
  try {
    const roomCount = await RoomModel.countDocuments();
    if (roomCount === 0) {
      console.log('🌱 Seeding initial Rooms into MongoDB...');
      await RoomModel.insertMany(INITIAL_ROOMS.map(({ id: _, ...rest }) => rest) as any[]);
    }

    const guestCount = await GuestModel.countDocuments();
    if (guestCount === 0) {
      console.log('🌱 Seeding initial Guests into MongoDB...');
      await GuestModel.insertMany(INITIAL_GUESTS.map(({ id: _, ...rest }) => rest) as any[]);
    }

    const taskCount = await HousekeepingTaskModel.countDocuments();
    if (taskCount === 0) {
      console.log('🌱 Seeding initial Housekeeping Tasks into MongoDB...');
      await HousekeepingTaskModel.insertMany(INITIAL_TASKS.map(({ id: _, ...rest }) => rest) as any[]);
    }

    const orderCount = await DiningOrderModel.countDocuments();
    if (orderCount === 0) {
      console.log('🌱 Seeding initial Dining Orders into MongoDB...');
      await DiningOrderModel.insertMany(INITIAL_ORDERS.map(({ id: _, ...rest }) => rest) as any[]);
    }

    const banquetCount = await BanquetBookingModel.countDocuments();
    if (banquetCount === 0) {
      console.log('🌱 Seeding initial Banquet Bookings into MongoDB...');
      await BanquetBookingModel.insertMany(INITIAL_BANQUETS.map(({ id: _, ...rest }) => rest) as any[]);
    }

    const staffCount = await StaffMemberModel.countDocuments();
    if (staffCount === 0) {
      console.log('🌱 Seeding initial Staff Members into MongoDB...');
      await StaffMemberModel.insertMany(INITIAL_STAFF.map(({ id: _, ...rest }) => rest) as any[]);
    }

    const inventoryCount = await InventoryItemModel.countDocuments();
    if (inventoryCount === 0) {
      console.log('🌱 Seeding initial Inventory Items into MongoDB...');
      await InventoryItemModel.insertMany(INITIAL_INVENTORY.map(({ id: _, ...rest }) => rest) as any[]);
    }

    const invoiceCount = await InvoiceModel.countDocuments();
    if (invoiceCount === 0) {
      console.log('🌱 Seeding initial Invoices into MongoDB...');
      await InvoiceModel.insertMany(INITIAL_INVOICES.map(({ id: _, ...rest }) => rest) as any[]);
    }
  } catch (err) {
    console.error('⚠️ Database Auto-Seed Error (non-blocking):', err);
  }
}
