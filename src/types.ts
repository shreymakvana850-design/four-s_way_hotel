export type RoomStatus = 'Occupied' | 'Available' | 'Reserved' | 'Housekeeping' | 'Maintenance';

export type RoomCategory = 
  | 'Maharaja Suite' 
  | 'Maharani Suite' 
  | 'Suryavanshi Suite' 
  | 'Rajvanshi Suite' 
  | 'Peacock Suite' 
  | 'Ranivas Suite' 
  | 'Royal Heritage Room';

export interface Room {
  id: string;
  number: string;
  category: RoomCategory;
  floor: string;
  status: RoomStatus;
  pricePerNight: number;
  capacity: number;
  features: string[];
  currentGuestName?: string;
  checkInDate?: string;
  checkOutDate?: string;
}

export interface Guest {
  id: string;
  name: string;
  phone: string;
  email: string;
  idType: 'Aadhaar Card' | 'Passport' | 'Driving License';
  idNumber: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status: 'CheckedIn' | 'CheckedOut' | 'Reserved';
  vipTier: 'Royal VIP' | 'Standard' | 'Wedding Guest';
  notes: string;
  royalButlerAssigned?: string;
}

export type TaskPriority = 'High' | 'Medium' | 'Low';
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export interface HousekeepingTask {
  id: string;
  roomNumber: string;
  taskType: 'Deep Clean' | 'Turndown Service' | 'Linen Change' | 'Butler Request' | 'Maintenance Repair';
  priority: TaskPriority;
  assignedTo: string;
  status: TaskStatus;
  notes: string;
  timeLogged: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'Gujarati Royal Thali' | 'Mughlai & Heritage' | 'Starters & Kebabs' | 'Royal Desserts' | 'Royal Mocktails & Beverages';
  price: number;
  description: string;
  isVeg: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  category: string;
}

export type OutletName = 'Deep Mahal' | 'Sheesh Mahal' | 'Jal Mahal Terrace' | 'In-Room Royal Dining';

export interface DiningOrder {
  id: string;
  outlet: OutletName;
  tableNumber: string;
  roomNumber?: string;
  guestName?: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'Received' | 'Preparing' | 'Served' | 'Billed';
  paymentMethod: 'Room Charge' | 'UPI / Cash / Card';
  createdAt: string;
}

export type BanquetVenue = 'Suryavanshi Lawns' | 'Darbar Hall' | 'Heritage Courtyard' | 'Poolside Pavilion';

export interface BanquetBooking {
  id: string;
  venue: BanquetVenue;
  eventType: 'Royal Wedding' | 'Sangeet & Mehendi' | 'Corporate Summit' | 'Royal Gala Dinner';
  clientName: string;
  phone: string;
  date: string;
  guestCount: number;
  packageType: 'Ultra Luxury Royal' | 'Grand Heritage' | 'Bespoke';
  totalPrice: number;
  advancePaid: number;
  stageSetup: string;
  specialRequests: string;
  status: 'Confirmed' | 'Tentative' | 'Completed';
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'Front Office Manager' | 'Royal Butler' | 'Executive Chef' | 'Housekeeping Lead' | 'Event Coordinator' | 'Security Head';
  department: 'Front Office' | 'Housekeeping' | 'Kitchen & F&B' | 'Event Ops' | 'Management';
  shift: 'Morning (07:00 - 15:00)' | 'Evening (15:00 - 23:00)' | 'Night (23:00 - 07:00)';
  phone: string;
  status: 'On Duty' | 'Off Duty' | 'On Leave';
  rating: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Kitchen Raw Materials' | 'Royal Linen & Bedding' | 'Luxury Toiletries' | 'Vintage Car Maintenance' | 'Banquet & Decor';
  stockLevel: number;
  unit: string;
  reorderPoint: number;
  supplier: string;
  costPerUnit: number;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  guestName: string;
  roomNumber: string;
  date: string;
  items: { description: string; amount: number; gstRate: number }[];
  subtotal: number;
  cgst: number;
  sgst: number;
  grandTotal: number;
  paymentStatus: 'Paid' | 'Pending';
}
