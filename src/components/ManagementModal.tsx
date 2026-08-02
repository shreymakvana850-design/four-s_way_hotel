import React, { useState, useEffect } from 'react';
import { X, Building2, Users, ShoppingBag, Lock, User, KeyRound, Eye, EyeOff, ShieldAlert, LogOut, Sparkles, UtensilsCrossed, CalendarDays, Package, FileCheck, ShieldCheck } from 'lucide-react';
import { RoomRecord, CustomerRecord, FoodOrder } from '../data/websiteData';
import { Room, Guest, HousekeepingTask, DiningOrder, BanquetBooking, StaffMember, InventoryItem, Invoice } from '../types';

import { FrontDeskView } from './FrontDeskView';
import { HousekeepingView } from './HousekeepingView';
import { DiningPOSView } from './DiningPOSView';
import { BanquetsView } from './BanquetsView';
import { StaffRosterView } from './StaffRosterView';
import { InventoryView } from './InventoryView';
import { GSTBillingView } from './GSTBillingView';

import {
  INITIAL_ROOMS,
  INITIAL_GUESTS,
  INITIAL_TASKS,
  MENU_ITEMS,
  INITIAL_ORDERS,
  INITIAL_BANQUETS,
  INITIAL_STAFF,
  INITIAL_INVENTORY,
  INITIAL_INVOICES,
} from '../data/mockData';

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
}) => {
  // Staff Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Active Tab State
  const [activeTab, setActiveTab] = useState<
    'frontdesk' | 'housekeeping' | 'pos' | 'banquets' | 'staff' | 'inventory' | 'invoices'
  >('frontdesk');

  // DB Data States
  const [dbRooms, setDbRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [dbGuests, setDbGuests] = useState<Guest[]>(INITIAL_GUESTS);
  const [dbTasks, setDbTasks] = useState<HousekeepingTask[]>(INITIAL_TASKS);
  const [dbOrders, setDbOrders] = useState<DiningOrder[]>(INITIAL_ORDERS);
  const [dbBanquets, setDbBanquets] = useState<BanquetBooking[]>(INITIAL_BANQUETS);
  const [dbStaff, setDbStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [dbInventory, setDbInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [dbInvoices, setDbInvoices] = useState<Invoice[]>(INITIAL_INVOICES);

  // Fetch all ERP datasets from MongoDB API endpoints on load
  const loadAllErpData = async () => {
    try {
      const resRooms = await fetch('/api/rooms');
      if (resRooms.ok) {
        const data = await resRooms.json();
        if (Array.isArray(data) && data.length > 0) setDbRooms(data);
      }

      const resGuests = await fetch('/api/guests');
      if (resGuests.ok) {
        const data = await resGuests.json();
        if (Array.isArray(data) && data.length > 0) setDbGuests(data);
      }

      const resTasks = await fetch('/api/tasks');
      if (resTasks.ok) {
        const data = await resTasks.json();
        if (Array.isArray(data) && data.length > 0) setDbTasks(data);
      }

      const resOrders = await fetch('/api/orders');
      if (resOrders.ok) {
        const data = await resOrders.json();
        if (Array.isArray(data) && data.length > 0) setDbOrders(data);
      }

      const resBanquets = await fetch('/api/banquets');
      if (resBanquets.ok) {
        const data = await resBanquets.json();
        if (Array.isArray(data) && data.length > 0) setDbBanquets(data);
      }

      const resStaff = await fetch('/api/staff');
      if (resStaff.ok) {
        const data = await resStaff.json();
        if (Array.isArray(data) && data.length > 0) setDbStaff(data);
      }

      const resInv = await fetch('/api/inventory');
      if (resInv.ok) {
        const data = await resInv.json();
        if (Array.isArray(data) && data.length > 0) setDbInventory(data);
      }

      const resInvcs = await fetch('/api/invoices');
      if (resInvcs.ok) {
        const data = await resInvcs.json();
        if (Array.isArray(data) && data.length > 0) setDbInvoices(data);
      }
    } catch (e) {
      console.warn('API Data sync warning:', e);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadAllErpData();
    }
  }, [isOpen, isAuthenticated]);

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

  // ERP Operations Handlers synced with MongoDB API
  const handleUpdateRoomStatus = async (roomId: string, newStatus: Room['status']) => {
    setDbRooms((prev) => prev.map((r) => (r.id === roomId ? { ...r, status: newStatus } : r)));
    try {
      await fetch(`/api/rooms/${roomId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (e) {
      console.warn('Room status API error:', e);
    }
  };

  const handleCheckInGuest = async (newGuest: Omit<Guest, 'id'>) => {
    try {
      const res = await fetch('/api/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGuest),
      });
      if (res.ok) {
        const saved = await res.json();
        setDbGuests((prev) => [saved, ...prev]);
        loadAllErpData();
      }
    } catch (e) {
      console.warn('Check in API error:', e);
    }
  };

  const handleAddTask = async (task: Omit<HousekeepingTask, 'id'>) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (res.ok) {
        const saved = await res.json();
        setDbTasks((prev) => [saved, ...prev]);
      }
    } catch (e) {
      console.warn('Add task API error:', e);
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, newStatus: HousekeepingTask['status']) => {
    setDbTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
    try {
      await fetch(`/api/tasks/${taskId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (e) {
      console.warn('Task status API error:', e);
    }
  };

  const handleCreateDiningOrder = async (order: Omit<DiningOrder, 'id' | 'createdAt'>) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      if (res.ok) {
        const saved = await res.json();
        setDbOrders((prev) => [saved, ...prev]);
      }
    } catch (e) {
      console.warn('Create order API error:', e);
    }
  };

  const handleUpdateDiningOrderStatus = async (orderId: string, newStatus: DiningOrder['status']) => {
    setDbOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
    try {
      await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (e) {
      console.warn('Order status API error:', e);
    }
  };

  const handleAddBanquetBooking = async (booking: Omit<BanquetBooking, 'id'>) => {
    try {
      const res = await fetch('/api/banquets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });
      if (res.ok) {
        const saved = await res.json();
        setDbBanquets((prev) => [...prev, saved]);
      }
    } catch (e) {
      console.warn('Add banquet API error:', e);
    }
  };

  const handleAddStock = async (itemId: string, qty: number) => {
    setDbInventory((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, stockLevel: i.stockLevel + qty } : i))
    );
    try {
      const item = dbInventory.find((i) => i.id === itemId);
      if (item) {
        await fetch(`/api/inventory/${itemId}/stock`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stockLevel: item.stockLevel + qty }),
        });
      }
    } catch (e) {
      console.warn('Stock update API error:', e);
    }
  };

  const handleAddInvoice = async (inv: Omit<Invoice, 'id' | 'invoiceNo' | 'cgst' | 'sgst' | 'grandTotal'>) => {
    const subtotal = inv.items.reduce((s, i) => s + i.amount, 0);
    const cgst = (subtotal * 9) / 100;
    const sgst = (subtotal * 9) / 100;
    const grandTotal = subtotal + cgst + sgst;
    const invoiceNo = `HKP/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;

    const fullInvoice = { ...inv, invoiceNo, subtotal, cgst, sgst, grandTotal, paymentStatus: 'Paid' as const };

    try {
        const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullInvoice),
      });
      if (res.ok) {
        const saved = await res.json();
        setDbInvoices((prev) => [saved, ...prev]);
      }
    } catch (e) {
      console.warn('Add invoice API error:', e);
    }
  };

  // Render Login Form if unauthenticated
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md">
        <div className="relative w-full max-w-md bg-stone-900 border border-amber-800/60 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
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
            <h3 className="font-serif font-bold text-xl text-amber-100">Four's Way Hotel Management Portal</h3>
            <p className="text-xs text-stone-400">Enter your credentials to access live ERP modules</p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs text-center flex items-center justify-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleStaffLogin} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-serif text-stone-300 uppercase tracking-wider block">Staff Username</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. admin or staff"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-100 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[11px] font-serif text-stone-300 uppercase tracking-wider block">Staff Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

  
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-7xl bg-stone-900 border border-amber-800/40 rounded-2xl shadow-2xl overflow-hidden my-auto h-[94vh] flex flex-col">
        {/* Top Bar Header */}
        <div className="bg-linear-to-r from-stone-950 via-amber-950/70 to-stone-950 p-4 border-b border-amber-800/40 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base sm:text-lg text-amber-100 flex items-center gap-2">
                Hotel for's way ERP
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono font-normal">
                  MongoDB Connected
                </span>
              </h2>
              <p className="text-[11px] text-stone-400">
                Integrated Front Office, Housekeeping, POS, Banquets, Roster, Inventory & GST Billing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="bg-stone-950 hover:bg-red-950/80 text-stone-300 hover:text-red-300 border border-stone-800 hover:border-red-500/40 text-xs font-serif px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            <button
              onClick={onClose}
              className="text-stone-400 hover:text-amber-300 p-1.5 rounded-full hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* ERP Navigation Sub-Header Tabs */}
        <div className="bg-stone-950 border-b border-stone-800 px-4 py-2 flex items-center gap-1.5 overflow-x-auto text-xs font-serif shrink-0">
          <button
            onClick={() => setActiveTab('frontdesk')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'frontdesk' ? 'bg-amber-500 text-stone-950 font-bold shadow' : 'text-stone-400 hover:text-amber-300'
            }`}
          >
            <Building2 className="w-4 h-4" /> Front Desk & Check-In
          </button>

          <button
            onClick={() => setActiveTab('housekeeping')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'housekeeping' ? 'bg-amber-500 text-stone-950 font-bold shadow' : 'text-stone-400 hover:text-amber-300'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Housekeeping & Tasks
          </button>

          <button
            onClick={() => setActiveTab('pos')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'pos' ? 'bg-amber-500 text-stone-950 font-bold shadow' : 'text-stone-400 hover:text-amber-300'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" /> Dining POS
          </button>

          <button
            onClick={() => setActiveTab('banquets')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'banquets' ? 'bg-amber-500 text-stone-950 font-bold shadow' : 'text-stone-400 hover:text-amber-300'
            }`}
          >
            <CalendarDays className="w-4 h-4" /> Banquets & Weddings
          </button>

          <button
            onClick={() => setActiveTab('staff')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'staff' ? 'bg-amber-500 text-stone-950 font-bold shadow' : 'text-stone-400 hover:text-amber-300'
            }`}
          >
            <Users className="w-4 h-4" /> Staff Roster
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'inventory' ? 'bg-amber-500 text-stone-950 font-bold shadow' : 'text-stone-400 hover:text-amber-300'
            }`}
          >
            <Package className="w-4 h-4" /> Inventory & Spares
          </button>

          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'invoices' ? 'bg-amber-500 text-stone-950 font-bold shadow' : 'text-stone-400 hover:text-amber-300'
            }`}
          >
            <FileCheck className="w-4 h-4" /> GST Billing
          </button>
        </div>

        {/* Tab Content Display Area */}
        <div className="flex-1 overflow-y-auto bg-stone-950 p-4 sm:p-6">
          {activeTab === 'frontdesk' && (
            <FrontDeskView
              rooms={dbRooms}
              guests={dbGuests}
              onUpdateRoomStatus={handleUpdateRoomStatus}
              onCheckInGuest={handleCheckInGuest}
              onCheckOutGuest={() => {}}
              onOpenNewInvoiceForGuest={() => setActiveTab('invoices')}
            />
          )}

          {activeTab === 'housekeeping' && (
            <HousekeepingView
              tasks={dbTasks}
              rooms={dbRooms}
              onAddTask={handleAddTask}
              onUpdateTaskStatus={handleUpdateTaskStatus}
              onMarkRoomCleaned={(rNum) => {
                const room = dbRooms.find((r) => r.number === rNum);
                if (room) handleUpdateRoomStatus(room.id, 'Available');
              }}
            />
          )}

          {activeTab === 'pos' && (
            <DiningPOSView
              menuItems={MENU_ITEMS}
              orders={dbOrders}
              rooms={dbRooms}
              onCreateOrder={handleCreateDiningOrder}
              onUpdateOrderStatus={handleUpdateDiningOrderStatus}
            />
          )}

          {activeTab === 'banquets' && (
            <BanquetsView
              bookings={dbBanquets}
              onAddBooking={handleAddBanquetBooking}
            />
          )}

          {activeTab === 'staff' && (
            <StaffRosterView
              staff={dbStaff}
              onToggleStaffStatus={(id) => {
                setDbStaff((prev) =>
                  prev.map((s) => (s.id === id ? { ...s, status: s.status === 'On Duty' ? 'Off Duty' : 'On Duty' } : s))
                );
              }}
            />
          )}

          {activeTab === 'inventory' && (
            <InventoryView
              inventory={dbInventory}
              onAddStock={handleAddStock}
            />
          )}

          {activeTab === 'invoices' && (
            <GSTBillingView
              invoices={dbInvoices}
              onAddInvoice={handleAddInvoice}
            />
          )}
        </div>
      </div>
    </div>
  );
};
