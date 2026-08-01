import { Room, Guest, HousekeepingTask, MenuItem, DiningOrder, BanquetBooking, StaffMember, InventoryItem, Invoice } from '../types';

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'r101',
    number: '101',
    category: 'Maharaja Suite',
    floor: 'Royal First Floor',
    status: 'Occupied',
    pricePerNight: 28000,
    capacity: 2,
    features: ['Jacuzzi Bath', 'Royal Palace Terrace', 'Heritage Antique Bed', '24/7 Butler Service'],
    currentGuestName: 'Vikramaditya Singhania',
    checkInDate: '2026-07-24',
    checkOutDate: '2026-07-28'
  },
  {
    id: 'r102',
    number: '102',
    category: 'Maharani Suite',
    floor: 'Royal First Floor',
    status: 'Occupied',
    pricePerNight: 24000,
    capacity: 2,
    features: ['Private Courtyard', 'Stained Glass Windows', 'Royal Throne Seating', 'Fruit & Wine Basket'],
    currentGuestName: 'Ananya Roy',
    checkInDate: '2026-07-25',
    checkOutDate: '2026-07-27'
  },
  {
    id: 'r103',
    number: '103',
    category: 'Suryavanshi Suite',
    floor: 'Royal First Floor',
    status: 'Housekeeping',
    pricePerNight: 20000,
    capacity: 3,
    features: ['Panoramic Sunrise View', 'Marbled Bathing Hall', 'Carved Wooden Dressing Table'],
  },
  {
    id: 'r104',
    number: '104',
    category: 'Rajvanshi Suite',
    floor: 'Royal First Floor',
    status: 'Available',
    pricePerNight: 18000,
    capacity: 2,
    features: ['Balcony over Deep Mahal', 'Custom Brass Lamps', 'Minibar'],
  },
  {
    id: 'r201',
    number: '201',
    category: 'Peacock Suite',
    floor: 'Heritage Wing Level 2',
    status: 'Reserved',
    pricePerNight: 16000,
    capacity: 2,
    features: ['Hand-painted Peacock Murals', 'Heritage Arch Balcony'],
    currentGuestName: 'Rajesh Mehta',
    checkInDate: '2026-07-26',
    checkOutDate: '2026-07-29'
  },
  {
    id: 'r202',
    number: '202',
    category: 'Ranivas Suite',
    floor: 'Heritage Wing Level 2',
    status: 'Available',
    pricePerNight: 15000,
    capacity: 2,
    features: ['Traditional Jharokha Seating', 'Silk Tapestries'],
  },
  {
    id: 'r203',
    number: '203',
    category: 'Royal Heritage Room',
    floor: 'Heritage Wing Level 2',
    status: 'Occupied',
    pricePerNight: 12000,
    capacity: 2,
    features: ['Courtyard View', 'Royal Teakwood Wardrobe'],
    currentGuestName: 'Devang Patel',
    checkInDate: '2026-07-25',
    checkOutDate: '2026-07-27'
  },
  {
    id: 'r204',
    number: '204',
    category: 'Royal Heritage Room',
    floor: 'Heritage Wing Level 2',
    status: 'Maintenance',
    pricePerNight: 12000,
    capacity: 2,
    features: ['Courtyard View', 'Plush King Bed'],
  }
];

export const INITIAL_GUESTS: Guest[] = [
  {
    id: 'g1',
    name: 'Vikramaditya Singhania',
    phone: '+91 98250 11223',
    email: 'singhania.v@royalgroup.in',
    idType: 'Passport',
    idNumber: 'Z8942109',
    roomNumber: '101',
    checkIn: '2026-07-24',
    checkOut: '2026-07-28',
    totalAmount: 112000,
    status: 'CheckedIn',
    vipTier: 'Royal VIP',
    notes: 'Requires vintage car airport transfer & pure Jain royal thali.',
    royalButlerAssigned: 'Manish Singh'
  },
  {
    id: 'g2',
    name: 'Ananya Roy',
    phone: '+91 97123 44556',
    email: 'ananya.roy@designstudio.com',
    idType: 'Aadhaar Card',
    idNumber: '4589 1234 9876',
    roomNumber: '102',
    checkIn: '2026-07-25',
    checkOut: '2026-07-27',
    totalAmount: 48000,
    status: 'CheckedIn',
    vipTier: 'Standard',
    notes: 'Anniversary celebration setup in Sheesh Mahal.',
    royalButlerAssigned: 'Bhawani Jadeja'
  },
  {
    id: 'g3',
    name: 'Rajesh Mehta',
    phone: '+91 94280 55667',
    email: 'rmehta@gujaratsteel.co.in',
    idType: 'Driving License',
    idNumber: 'GJ-03-2019-00981',
    roomNumber: '201',
    checkIn: '2026-07-26',
    checkOut: '2026-07-29',
    totalAmount: 48000,
    status: 'Reserved',
    vipTier: 'Wedding Guest',
    notes: 'Arriving for the Jadeja-Rathore Royal Wedding at Suryavanshi Lawns.',
  }
];

export const INITIAL_TASKS: HousekeepingTask[] = [
  {
    id: 't1',
    roomNumber: '103',
    taskType: 'Deep Clean',
    priority: 'High',
    assignedTo: 'Karan Solanki',
    status: 'In Progress',
    notes: 'Prepare Suryavanshi suite for VIP check-in at 2 PM. Extra jasmine floral decoration.',
    timeLogged: '08:30 AM'
  },
  {
    id: 't2',
    roomNumber: '101',
    taskType: 'Butler Request',
    priority: 'High',
    assignedTo: 'Manish Singh',
    status: 'Pending',
    notes: 'Deliver 4:00 PM high tea tray with saffron kachori and spiced royal masala chai.',
    timeLogged: '09:15 AM'
  },
  {
    id: 't3',
    roomNumber: '204',
    taskType: 'Maintenance Repair',
    priority: 'Medium',
    assignedTo: 'Ramesh Vaghela',
    status: 'In Progress',
    notes: 'AC thermostat calibration and heritage brass faucet seal replacement.',
    timeLogged: '07:45 AM'
  },
  {
    id: 't4',
    roomNumber: '102',
    taskType: 'Turndown Service',
    priority: 'Low',
    assignedTo: 'Hetal Parmar',
    status: 'Completed',
    notes: 'Rose petals and organic lavendar room spray added.',
    timeLogged: '10:00 AM'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Khirasara Shahi Royal Thali',
    category: 'Gujarati Royal Thali',
    price: 1850,
    description: '3 Sweets, 4 Heritage Kathiyawadi Curry Delicacies, Farsan, Rotla with White Butter, Kichdi, and Fresh Chaas.',
    isVeg: true
  },
  {
    id: 'm2',
    name: 'Kaju Khoya Royal Gravy',
    category: 'Mughlai & Heritage',
    price: 650,
    description: 'Rich creamy rich khoya curry topped with roasted whole cashews and saffron oil.',
    isVeg: true
  },
  {
    id: 'm3',
    name: 'Paneer Rajwada Tikka',
    category: 'Starters & Kebabs',
    price: 490,
    description: 'Charcoal grilled cottage cheese marinated in hung curd, royal spices, and mint chutney.',
    isVeg: true
  },
  {
    id: 'm4',
    name: 'Kesari Rajbhog Shrikhand',
    category: 'Royal Desserts',
    price: 320,
    description: 'Traditional hung curd whipped with Kashmiri saffron, dry fruits, and cardamom.',
    isVeg: true
  },
  {
    id: 'm5',
    name: 'Kesaria Gulab Sharbat',
    category: 'Royal Mocktails & Beverages',
    price: 280,
    description: 'Chilled organic damask rose extract with silver leaf (vark) and sabja seeds.',
    isVeg: true
  },
  {
    id: 'm6',
    name: 'Royal Jal Mahal Mocktail',
    category: 'Royal Mocktails & Beverages',
    price: 350,
    description: 'Fresh pomegranate, mint, elderflower, line juice and sparkling soda.',
    isVeg: true
  }
];

export const INITIAL_ORDERS: DiningOrder[] = [
  {
    id: 'ord101',
    outlet: 'Deep Mahal',
    tableNumber: 'Table 4',
    guestName: 'Vikramaditya Singhania',
    roomNumber: '101',
    items: [
      { id: 'm1', name: 'Khirasara Shahi Royal Thali', price: 1850, qty: 2, category: 'Gujarati Royal Thali' },
      { id: 'm5', name: 'Kesaria Gulab Sharbat', price: 280, qty: 2, category: 'Royal Mocktails & Beverages' }
    ],
    totalAmount: 4260,
    status: 'Served',
    paymentMethod: 'Room Charge',
    createdAt: '12:45 PM'
  },
  {
    id: 'ord102',
    outlet: 'Sheesh Mahal',
    tableNumber: 'Royal Gazebo 1',
    guestName: 'Ananya Roy',
    roomNumber: '102',
    items: [
      { id: 'm3', name: 'Paneer Rajwada Tikka', price: 490, qty: 1, category: 'Starters & Kebabs' },
      { id: 'm2', name: 'Kaju Khoya Royal Gravy', price: 650, qty: 1, category: 'Mughlai & Heritage' },
      { id: 'm6', name: 'Royal Jal Mahal Mocktail', price: 350, qty: 2, category: 'Royal Mocktails & Beverages' }
    ],
    totalAmount: 1840,
    status: 'Preparing',
    paymentMethod: 'Room Charge',
    createdAt: '01:15 PM'
  }
];

export const INITIAL_BANQUETS: BanquetBooking[] = [
  {
    id: 'bq1',
    venue: 'Suryavanshi Lawns',
    eventType: 'Royal Wedding',
    clientName: 'Yuvraj Singh Rathore & Radhika Jadeja',
    phone: '+91 99090 88776',
    date: '2026-11-15',
    guestCount: 850,
    packageType: 'Ultra Luxury Royal',
    totalPrice: 2500000,
    advancePaid: 1000000,
    stageSetup: 'Grand Palace Mandap with 10,000 fresh marigold and orchid arrangements, Vintage Car baraat entry.',
    specialRequests: 'Live Shehnai players at Palace Gate, Kathiyawadi Folk Dance performance, Fireworks display.',
    status: 'Confirmed'
  },
  {
    id: 'bq2',
    venue: 'Darbar Hall',
    eventType: 'Corporate Summit',
    clientName: 'Gujarat Industrial Summit 2026',
    phone: '+91 98980 12345',
    date: '2026-08-10',
    guestCount: 180,
    packageType: 'Grand Heritage',
    totalPrice: 450000,
    advancePaid: 200000,
    stageSetup: 'AV Screen, Podium with Royal Emblem, U-Shape Conference Seating.',
    specialRequests: 'High Tea with Kathiyawadi snacks & Royal Buffet Lunch.',
    status: 'Confirmed'
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 's1',
    name: 'Manish Singh',
    role: 'Royal Butler',
    department: 'Front Office',
    shift: 'Morning (07:00 - 15:00)',
    phone: '+91 98240 10001',
    status: 'On Duty',
    rating: 4.9
  },
  {
    id: 's2',
    name: 'Bhawani Jadeja',
    role: 'Royal Butler',
    department: 'Front Office',
    shift: 'Evening (15:00 - 23:00)',
    phone: '+91 98240 10002',
    status: 'On Duty',
    rating: 4.8
  },
  {
    id: 's3',
    name: 'Chef Ranveer Gohil',
    role: 'Executive Chef',
    department: 'Kitchen & F&B',
    shift: 'Morning (07:00 - 15:00)',
    phone: '+91 98240 10003',
    status: 'On Duty',
    rating: 5.0
  },
  {
    id: 's4',
    name: 'Karan Solanki',
    role: 'Housekeeping Lead',
    department: 'Housekeeping',
    shift: 'Morning (07:00 - 15:00)',
    phone: '+91 98240 10004',
    status: 'On Duty',
    rating: 4.7
  },
  {
    id: 's5',
    name: 'Pratapsinh Zala',
    role: 'Event Coordinator',
    department: 'Event Ops',
    shift: 'Evening (15:00 - 23:00)',
    phone: '+91 98240 10005',
    status: 'On Duty',
    rating: 4.9
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv1',
    name: 'Kashmiri Saffron (Grade A)',
    category: 'Kitchen Raw Materials',
    stockLevel: 450,
    unit: 'grams',
    reorderPoint: 100,
    supplier: 'Royal Spices Trading Srinagar',
    costPerUnit: 280
  },
  {
    id: 'inv2',
    name: 'Egyptian Cotton Royal Bed Sheets (600 TC)',
    category: 'Royal Linen & Bedding',
    stockLevel: 120,
    unit: 'sets',
    reorderPoint: 30,
    supplier: 'Heritage Textile Mills Ahmedabad',
    costPerUnit: 3500
  },
  {
    id: 'inv3',
    name: 'Organic Jasmine & Rose Bath Gel 250ml',
    category: 'Luxury Toiletries',
    stockLevel: 45,
    unit: 'bottles',
    reorderPoint: 50,
    supplier: 'Kama Ayurveda India',
    costPerUnit: 420
  },
  {
    id: 'inv4',
    name: '1938 Vintage Rolls Royce Spark Plugs & Oil',
    category: 'Vintage Car Maintenance',
    stockLevel: 8,
    unit: 'units',
    reorderPoint: 5,
    supplier: 'Classic Car Heritage Spares Mumbai',
    costPerUnit: 12000
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-2026-001',
    invoiceNo: 'HKP/2026/0789',
    guestName: 'Vikramaditya Singhania',
    roomNumber: '101',
    date: '2026-07-26',
    items: [
      { description: 'Maharaja Suite Accommodation (4 Nights)', amount: 112000, gstRate: 18 },
      { description: 'Deep Mahal Royal Dining Bill #ord101', amount: 4260, gstRate: 18 },
      { description: 'Vintage Car Heritage Tour (Rajkot City)', amount: 8000, gstRate: 18 }
    ],
    subtotal: 124260,
    cgst: 11183.4,
    sgst: 11183.4,
    grandTotal: 146626.8,
    paymentStatus: 'Paid'
  }
];
