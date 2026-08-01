# 🗄️ 05 - Database Schemas & API Endpoints Specification

## 📊 Mongoose Schemas Specification

To transition from mock data to real MongoDB storage, the following 8 Mongoose Schemas are required:

### 1. `Room` Schema (`models/Room.ts`)
```typescript
import mongoose, { Schema } from 'mongoose';

const RoomSchema = new Schema({
  number: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  floor: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Available', 'Occupied', 'Housekeeping', 'Maintenance', 'Reserved'], 
    default: 'Available' 
  },
  pricePerNight: { type: Number, required: true },
  capacity: { type: Number, required: true },
  features: [{ type: String }],
  currentGuestName: { type: String, default: null },
  checkInDate: { type: String, default: null },
  checkOutDate: { type: String, default: null }
}, { timestamps: true });

export const RoomModel = mongoose.models.Room || mongoose.model('Room', RoomSchema);
```

### 2. `Guest` Schema (`models/Guest.ts`)
```typescript
const GuestSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  idType: { type: String, required: true },
  idNumber: { type: String, required: true },
  roomNumber: { type: String, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['CheckedIn', 'CheckedOut', 'Reserved', 'Cancelled'], default: 'CheckedIn' },
  vipTier: { type: String, default: 'Standard' },
  notes: { type: String, default: '' },
  royalButlerAssigned: { type: String, default: '' }
}, { timestamps: true });

export const GuestModel = mongoose.models.Guest || mongoose.model('Guest', GuestSchema);
```

### 3. Additional Required Schemas:
- **`HousekeepingTask`**: `roomNumber`, `taskType`, `priority`, `assignedTo`, `status`, `notes`, `timeLogged`.
- **`DiningOrder`**: `outlet`, `tableNumber`, `guestName`, `roomNumber`, `items` (array of `id`, `name`, `price`, `qty`), `totalAmount`, `status`, `paymentMethod`.
- **`BanquetBooking`**: `venue`, `eventType`, `clientName`, `phone`, `date`, `guestCount`, `packageType`, `totalPrice`, `advancePaid`, `stageSetup`, `specialRequests`, `status`.
- **`StaffMember`**: `name`, `role`, `department`, `shift`, `phone`, `status`, `rating`.
- **`InventoryItem`**: `name`, `category`, `stockLevel`, `unit`, `reorderPoint`, `supplier`, `costPerUnit`.
- **`Invoice`**: `invoiceNo`, `guestName`, `roomNumber`, `date`, `items`, `subtotal`, `cgst`, `sgst`, `grandTotal`, `paymentStatus`.

---

## 📡 REST API Endpoint Map

| Endpoint Path | HTTP Method | Action |
| :--- | :--- | :--- |
| `/api/rooms` | `GET` | Fetch all rooms from MongoDB |
| `/api/rooms` | `POST` | Create a new room in MongoDB |
| `/api/rooms/:id/status` | `PATCH` | Update room status (Available, Maintenance, etc.) |
| `/api/guests` | `GET` | Fetch guest list / search by name |
| `/api/guests` | `POST` | Process guest check-in & store booking |
| `/api/guests/:id/checkout` | `PATCH` | Process guest checkout & update room status |
| `/api/orders` | `GET` / `POST` | Retrieve F&B orders & place new dining order |
| `/api/tasks` | `GET` / `POST` | List and update housekeeping / butler tasks |
| `/api/banquets` | `GET` / `POST` | Manage Suryavanshi Lawns & Darbar Hall event bookings |
| `/api/ai/royal-concierge` | `POST` | Execute Gemini 3.6 Flash Royal Concierge itinerary generator |
| `/api/ai/rate-optimizer` | `POST` | Execute Gemini 3.6 Flash Yield & Rate optimizer |
| `/api/ai/guest-sentiment` | `POST` | Execute Gemini 3.6 Flash Sentiment & Defect analyzer |

---

## 🔗 Related Notes
- [[00 - Project Index & Sitemap]]
- [[04 - MongoDB Connection & Vercel Deployment Plan]]
