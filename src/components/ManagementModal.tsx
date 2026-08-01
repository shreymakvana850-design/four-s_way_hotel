import React, { useState } from 'react';
import { X, Building2, Users, Search, Plus, CheckCircle, Clock, ShieldCheck, DollarSign, Filter, RefreshCw, ShoppingBag, Lock, User, KeyRound, Eye, EyeOff, ShieldAlert, LogOut } from 'lucide-react';
import { RoomRecord, CustomerRecord, FoodOrder } from '../data/websiteData';

interface ManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: RoomRecord[];
  customers: CustomerRecord[];
  orders: FoodOrder[];
  onUpdateRoomStatus: (roomId: string, newStatus: RoomRecord['status']) => void;
  onAddRoom: (room: RoomRecord) => void;
  onUpdateCustomerPayment: (customerId: string, newStatus: 'Paid' | 'Pending') => void;
  onAddCustomer: (customer: CustomerRecord) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: FoodOrder['orderStatus']) => void;
}

export const ManagementModal: React.FC<ManagementModalProps> = ({
  isOpen,
  onClose,
  rooms,
  customers,
  orders,
  onUpdateRoomStatus,
  onAddRoom,
  onUpdateCustomerPayment,
  onAddCustomer,
  onUpdateOrderStatus,
}) => {
  // Staff Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [activeTab, setActiveTab] = useState<'rooms' | 'customers' | 'orders'>('rooms');

  // Room filters & form
  const [roomFilter, setRoomFilter] = useState<string>('All');
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [newRoomNumber, setNewRoomNumber] = useState('');
  const [newSuiteName, setNewSuiteName] = useState('Maharaja Suite');
  const [newFloor, setNewFloor] = useState('1st Floor');
  const [newTariff, setNewTariff] = useState(25000);

  // Customer filters & form
  const [customerSearch, setCustomerSearch] = useState('');
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newCustEmail, setNewCustEmail] = useState('');
  const [newCustType, setNewCustType] = useState<CustomerRecord['bookingType']>('Room Stay');
  const [newCustDetails, setNewCustDetails] = useState('');
  const [newCustAmount, setNewCustAmount] = useState(15000);
  const [newCustPaymentMethod, setNewCustPaymentMethod] = useState<'Online Payment (UPI/Card)' | 'Cash Payment'>('Online Payment (UPI/Card)');

  if (!isOpen) return null;

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    if (
      (cleanUser === 'admin' && cleanPass === 'admin123') ||
      (cleanUser === 'staff' && cleanPass === 'staff123') ||
      (cleanUser === 'hotel' && cleanPass === 'hotel123') ||
      (cleanUser === 'manager' && cleanPass === 'manager123')
    ) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Staff Username or Password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setLoginError('');
  };

  // If not authenticated, render Login Form for Hotel Staff
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md">
        <div className="relative w-full max-w-md bg-stone-900 border border-amber-800/60 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-amber-300 p-2 rounded-full hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto shadow-inner">
              <Lock className="w-7 h-7 text-amber-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
              Hotel Staff Portal
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Restricted management portal for authorized Four's Way Hotel staff & management only.
            </p>
          </div>

          <form onSubmit={handleStaffLogin} className="space-y-4">
            {loginError && (
              <div className="bg-red-950/80 border border-red-500/50 text-red-300 text-xs p-3 rounded-xl flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-serif text-amber-200 block font-medium">
                Staff Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Enter staff username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setLoginError('');
                  }}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-100 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-serif text-amber-200 block font-medium">
                Staff Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter staff password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError('');
                  }}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-9 py-2.5 text-xs text-stone-100 focus:border-amber-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-linear-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-serif font-bold text-xs py-3 rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Login to Management Portal</span>
            </button>
          </form>

          {/* Demo Login Instructions for Hotel Team */}
          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 text-[11px] text-stone-400 space-y-1.5">
            <span className="font-serif text-amber-400 font-bold block">🔑 Staff Login Passwords:</span>
            <div className="flex items-center justify-between font-mono text-stone-300">
              <span>Username: <strong className="text-amber-200">admin</strong></span>
              <span>Password: <strong className="text-amber-200">admin123</strong></span>
            </div>
            <div className="flex items-center justify-between font-mono text-stone-300">
              <span>Username: <strong className="text-amber-200">staff</strong></span>
              <span>Password: <strong className="text-amber-200">staff123</strong></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Stats calculation
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;
  const availableRooms = rooms.filter(r => r.status === 'Available').length;
  const cleaningRooms = rooms.filter(r => r.status === 'Cleaning').length;

  const totalRevenue = customers.reduce((sum, c) => sum + (c.paymentStatus === 'Paid' ? c.amount : 0), 0);
  const pendingCashRevenue = customers.reduce((sum, c) => sum + (c.paymentStatus === 'Pending' ? c.amount : 0), 0);

  const filteredRooms = rooms.filter(r => roomFilter === 'All' || r.status === roomFilter);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.phone.includes(customerSearch) ||
    c.bookingType.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomNumber) return;
    const room: RoomRecord = {
      id: newRoomNumber,
      roomNumber: newRoomNumber,
      suiteName: newSuiteName,
      floor: newFloor,
      status: 'Available',
      tariffPerNight: Number(newTariff),
    };
    onAddRoom(room);
    setNewRoomNumber('');
    setShowAddRoom(false);
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName || !newCustPhone) return;
    const cust: CustomerRecord = {
      id: 'cust-' + Date.now(),
      name: newCustName,
      phone: newCustPhone,
      email: newCustEmail || `${newCustName.toLowerCase().replace(/\s+/g, '')}@khirasarapalace.in`,
      bookingType: newCustType,
      details: newCustDetails || 'Palace Reservation',
      amount: Number(newCustAmount),
      paymentMethod: newCustPaymentMethod,
      paymentStatus: newCustPaymentMethod.includes('Online') ? 'Paid' : 'Pending',
      date: new Date().toISOString().split('T')[0],
    };
    onAddCustomer(cust);
    setNewCustName('');
    setNewCustPhone('');
    setNewCustDetails('');
    setShowAddCustomer(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-stone-900 border border-amber-800/40 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-linear-to-r from-stone-950 via-amber-950/70 to-stone-950 p-5 border-b border-amber-800/40 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-amber-100 flex items-center gap-2">
                Palace Management Portal
              </h2>
              <p className="text-xs text-stone-400">
                Live Room Status Management • Guest & Payment Ledger • Food Orders Tracker
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs font-serif font-medium">
            <button
              onClick={() => setActiveTab('rooms')}
              className={`px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${activeTab === 'rooms'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-amber-300'
                }`}
            >
              <Building2 className="w-4 h-4" /> Room Management ({rooms.length})
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${activeTab === 'customers'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-amber-300'
                }`}
            >
              <Users className="w-4 h-4" /> Customer Records ({customers.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${activeTab === 'orders'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-amber-300'
                }`}
            >
              <ShoppingBag className="w-4 h-4" /> Food Orders ({orders.length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="bg-stone-950 hover:bg-red-950/80 text-stone-300 hover:text-red-300 border border-stone-800 hover:border-red-500/40 text-xs font-serif px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              title="Staff Logout"
            >
              <LogOut className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Staff Logout</span>
            </button>

            <button
              onClick={onClose}
              className="text-stone-400 hover:text-amber-300 p-2 rounded-full hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab 1: ROOM MANAGEMENT */}
        {activeTab === 'rooms' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                <span className="text-[11px] font-serif text-stone-400 block uppercase">Total Suites</span>
                <span className="text-2xl font-bold font-serif text-amber-100">{totalRooms}</span>
              </div>
              <div className="bg-stone-950 p-4 rounded-xl border border-emerald-900/40">
                <span className="text-[11px] font-serif text-emerald-400 block uppercase">Available</span>
                <span className="text-2xl font-bold font-serif text-emerald-400">{availableRooms}</span>
              </div>
              <div className="bg-stone-950 p-4 rounded-xl border border-amber-900/40">
                <span className="text-[11px] font-serif text-amber-400 block uppercase">Occupied</span>
                <span className="text-2xl font-bold font-serif text-amber-400">{occupiedRooms}</span>
              </div>
              <div className="bg-stone-950 p-4 rounded-xl border border-blue-900/40">
                <span className="text-[11px] font-serif text-blue-400 block uppercase">In Cleaning / Maint</span>
                <span className="text-2xl font-bold font-serif text-blue-400">{cleaningRooms}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-950 p-3 rounded-xl border border-stone-800">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-stone-300 font-serif">Filter by Status:</span>
                <select
                  value={roomFilter}
                  onChange={(e) => setRoomFilter(e.target.value)}
                  className="bg-stone-900 border border-stone-800 rounded px-3 py-1.5 text-xs text-amber-200 outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Available">Available</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </div>

              <button
                onClick={() => setShowAddRoom(!showAddRoom)}
                className="bg-amber-500/20 hover:bg-amber-500 hover:text-stone-950 text-amber-300 border border-amber-500/40 text-xs font-serif font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add New Suite / Room
              </button>
            </div>

            {/* Add Room Modal Inline */}
            {showAddRoom && (
              <form onSubmit={handleCreateRoom} className="bg-stone-950 p-4 rounded-xl border border-amber-800/40 space-y-4 animate-in fade-in">
                <h4 className="font-serif font-bold text-amber-200 text-sm">Register New Palace Room</h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <input
                    type="text"
                    required
                    placeholder="Room Number (e.g. 103)"
                    value={newRoomNumber}
                    onChange={(e) => setNewRoomNumber(e.target.value)}
                    className="bg-stone-900 border border-stone-800 rounded px-3 py-2 text-stone-100 outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Suite Name (e.g. Maharaja Suite)"
                    value={newSuiteName}
                    onChange={(e) => setNewSuiteName(e.target.value)}
                    className="bg-stone-900 border border-stone-800 rounded px-3 py-2 text-stone-100 outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Floor / Wing"
                    value={newFloor}
                    onChange={(e) => setNewFloor(e.target.value)}
                    className="bg-stone-900 border border-stone-800 rounded px-3 py-2 text-stone-100 outline-none"
                  />
                  <input
                    type="number"
                    required
                    placeholder="Tariff per night (₹)"
                    value={newTariff}
                    onChange={(e) => setNewTariff(Number(e.target.value))}
                    className="bg-stone-900 border border-stone-800 rounded px-3 py-2 text-stone-100 outline-none"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddRoom(false)}
                    className="px-3 py-1.5 text-xs text-stone-400 hover:text-stone-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-amber-500 text-stone-950 text-xs font-serif font-bold px-4 py-1.5 rounded"
                  >
                    Save Room
                  </button>
                </div>
              </form>
            )}

            {/* Rooms Table */}
            <div className="overflow-x-auto border border-stone-800 rounded-xl">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="bg-stone-950 font-serif text-amber-300 border-b border-stone-800">
                  <tr>
                    <th className="p-3">Room #</th>
                    <th className="p-3">Suite Type</th>
                    <th className="p-3">Floor / Wing</th>
                    <th className="p-3">Current Status</th>
                    <th className="p-3">Guest Details</th>
                    <th className="p-3">Tariff / Night</th>
                    <th className="p-3">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60 bg-stone-900/40">
                  {filteredRooms.map((room) => (
                    <tr key={room.id} className="hover:bg-stone-800/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-amber-200">{room.roomNumber}</td>
                      <td className="p-3 font-serif font-semibold text-stone-200">{room.suiteName}</td>
                      <td className="p-3 text-stone-400">{room.floor}</td>
                      <td className="p-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${room.status === 'Available' ? 'bg-emerald-950 text-emerald-400 border-emerald-700/40' :
                          room.status === 'Occupied' ? 'bg-amber-950 text-amber-400 border-amber-700/40' :
                            room.status === 'Cleaning' ? 'bg-blue-950 text-blue-400 border-blue-700/40' :
                              'bg-purple-950 text-purple-400 border-purple-700/40'
                          }`}>
                          {room.status}
                        </span>
                      </td>
                      <td className="p-3">
                        {room.guestName ? (
                          <div>
                            <span className="font-medium text-stone-200 block">{room.guestName}</span>
                            <span className="text-[10px] text-stone-400 block font-mono">{room.guestPhone}</span>
                          </div>
                        ) : (
                          <span className="text-stone-500 italic">Unoccupied</span>
                        )}
                      </td>
                      <td className="p-3 font-mono font-bold text-amber-400">₹{room.tariffPerNight}</td>
                      <td className="p-3">
                        <select
                          value={room.status}
                          onChange={(e) => onUpdateRoomStatus(room.id, e.target.value as RoomRecord['status'])}
                          className="bg-stone-950 border border-stone-800 rounded px-2 py-1 text-[11px] text-amber-200 outline-none focus:border-amber-500 cursor-pointer"
                        >
                          <option value="Available">Available</option>
                          <option value="Occupied">Occupied</option>
                          <option value="Cleaning">Cleaning</option>
                          <option value="Reserved">Reserved</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: CUSTOMER RECORDS */}
        {activeTab === 'customers' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                <span className="text-[11px] font-serif text-stone-400 block uppercase">Total Revenue Collected</span>
                <span className="text-2xl font-bold font-serif text-emerald-400">₹{totalRevenue.toLocaleString('en-IN')}</span>
              </div>
              <div className="bg-stone-950 p-4 rounded-xl border border-amber-900/40">
                <span className="text-[11px] font-serif text-amber-400 block uppercase">Pending Cash Payments</span>
                <span className="text-2xl font-bold font-serif text-amber-300">₹{pendingCashRevenue.toLocaleString('en-IN')}</span>
              </div>
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                <span className="text-[11px] font-serif text-stone-400 block uppercase">Total Guests Registered</span>
                <span className="text-2xl font-bold font-serif text-amber-100">{customers.length} Guests</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-950 p-3 rounded-xl border border-stone-800">
              <div className="relative flex-1 min-w-60">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search guest name, phone, or booking type..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-stone-100 focus:border-amber-500 outline-none"
                />
              </div>

              <button
                onClick={() => setShowAddCustomer(!showAddCustomer)}
                className="bg-amber-500/20 hover:bg-amber-500 hover:text-stone-950 text-amber-300 border border-amber-500/40 text-xs font-serif font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Guest / Customer Record
              </button>
            </div>

            {/* Add Customer Form Inline */}
            {showAddCustomer && (
              <form onSubmit={handleCreateCustomer} className="bg-stone-950 p-4 rounded-xl border border-amber-800/40 space-y-4 animate-in fade-in">
                <h4 className="font-serif font-bold text-amber-200 text-sm">Add Customer / Reservation Entry</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <input
                    type="text"
                    required
                    placeholder="Guest Name *"
                    value={newCustName}
                    onChange={(e) => setNewCustName(e.target.value)}
                    className="bg-stone-900 border border-stone-800 rounded px-3 py-2 text-stone-100 outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={newCustPhone}
                    onChange={(e) => setNewCustPhone(e.target.value)}
                    className="bg-stone-900 border border-stone-800 rounded px-3 py-2 text-stone-100 outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={newCustEmail}
                    onChange={(e) => setNewCustEmail(e.target.value)}
                    className="bg-stone-900 border border-stone-800 rounded px-3 py-2 text-stone-100 outline-none"
                  />
                  <select
                    value={newCustType}
                    onChange={(e) => setNewCustType(e.target.value as CustomerRecord['bookingType'])}
                    className="bg-stone-900 border border-stone-800 rounded px-3 py-2 text-amber-200 outline-none"
                  >
                    <option value="Room Stay">Room Stay</option>
                    <option value="Table Reservation">Table Reservation</option>
                    <option value="Food Order">Food Order</option>
                    <option value="Wedding Venue">Wedding Venue</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Details (e.g. Maharaja Suite 2 Nights)"
                    value={newCustDetails}
                    onChange={(e) => setNewCustDetails(e.target.value)}
                    className="bg-stone-900 border border-stone-800 rounded px-3 py-2 text-stone-100 outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Amount (₹)"
                    value={newCustAmount}
                    onChange={(e) => setNewCustAmount(Number(e.target.value))}
                    className="bg-stone-900 border border-stone-800 rounded px-3 py-2 text-stone-100 outline-none"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddCustomer(false)}
                    className="px-3 py-1.5 text-xs text-stone-400 hover:text-stone-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-amber-500 text-stone-950 text-xs font-serif font-bold px-4 py-1.5 rounded"
                  >
                    Save Customer Record
                  </button>
                </div>
              </form>
            )}

            {/* Customers Table */}
            <div className="overflow-x-auto border border-stone-800 rounded-xl">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="bg-stone-950 font-serif text-amber-300 border-b border-stone-800">
                  <tr>
                    <th className="p-3">Guest Name</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Booking Details</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Payment Method</th>
                    <th className="p-3">Payment Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60 bg-stone-900/40">
                  {filteredCustomers.map((c) => (
                    <tr key={c.id} className="hover:bg-stone-800/40 transition-colors">
                      <td className="p-3 font-serif font-semibold text-stone-200">{c.name}</td>
                      <td className="p-3 font-mono text-stone-400 text-[11px]">{c.phone}</td>
                      <td className="p-3">
                        <span className="bg-stone-950 text-amber-300 border border-amber-800/40 px-2 py-0.5 rounded text-[10px] font-mono">
                          {c.bookingType}
                        </span>
                      </td>
                      <td className="p-3 text-stone-300 max-w-xs truncate">{c.details}</td>
                      <td className="p-3 font-mono font-bold text-amber-400">₹{c.amount.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-[11px] text-stone-300">
                        {c.paymentMethod}
                      </td>
                      <td className="p-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${c.paymentStatus === 'Paid'
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-700/40'
                          : 'bg-amber-950 text-amber-400 border-amber-700/40'
                          }`}>
                          {c.paymentStatus}
                        </span>
                      </td>
                      <td className="p-3">
                        {c.paymentStatus === 'Pending' ? (
                          <button
                            onClick={() => onUpdateCustomerPayment(c.id, 'Paid')}
                            className="bg-emerald-500/20 hover:bg-emerald-500 hover:text-stone-950 text-emerald-400 border border-emerald-500/40 text-[10px] font-serif font-bold px-2.5 py-1 rounded transition-all cursor-pointer"
                          >
                            Mark Paid
                          </button>
                        ) : (
                          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                            <ShieldCheck className="w-3 h-3" /> Settled
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: LIVE FOOD ORDERS MONITOR */}
        {activeTab === 'orders' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-serif font-bold text-amber-200 text-base">
                Active Kitchen & Dining Room Orders
              </h3>
              <span className="text-xs text-amber-400 font-mono">
                {orders.length} Total Orders Received
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12 text-stone-500 font-serif">
                No food orders placed yet today. Use the "Food Ordering" menu to place royal food orders.
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-400 text-xs">#{order.id}</span>
                        <span className="text-stone-300 font-serif font-bold text-sm">{order.guestName}</span>
                        <span className="bg-amber-950 text-amber-300 border border-amber-800/40 px-2 py-0.5 rounded text-[10px] font-mono">
                          {order.deliveryType} ({order.roomOrTableNo})
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 mt-1">
                        Items: {order.items.map(i => `${i.quantity}x ${i.menuItem.name}`).join(', ')}
                      </p>
                      <p className="text-[11px] text-stone-500 font-mono mt-1">
                        Time: {order.timestamp} • Payment: <span className="text-amber-300">{order.paymentMethod}</span> ({order.paymentStatus})
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-serif font-bold text-amber-400 text-sm">₹{order.totalAmount}</span>
                      <select
                        value={order.orderStatus}
                        onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as FoodOrder['orderStatus'])}
                        className="bg-stone-900 border border-stone-800 rounded px-2.5 py-1 text-xs text-amber-200 outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="Received">Received</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
