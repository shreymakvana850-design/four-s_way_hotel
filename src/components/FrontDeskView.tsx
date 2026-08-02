import React, { useState } from 'react';
import { Room, Guest, RoomStatus } from '../types';
import { Hotel, UserPlus, CheckCircle2, AlertCircle, Wrench, Sparkles, ShieldCheck, User, Phone, Mail, FileText, ChevronRight, X } from 'lucide-react';

interface FrontDeskViewProps {
  rooms: Room[];
  guests: Guest[];
  onUpdateRoomStatus: (roomId: string, newStatus: RoomStatus) => void;
  onCheckInGuest: (guest: Omit<Guest, 'id'>) => void;
  onCheckOutGuest: (guestId: string) => void;
  onOpenNewInvoiceForGuest: (guestName: string, roomNumber: string) => void;
}

export const FrontDeskView: React.FC<FrontDeskViewProps> = ({
  rooms,
  guests,
  onUpdateRoomStatus,
  onCheckInGuest,
  onCheckOutGuest,
  onOpenNewInvoiceForGuest,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedSuite, setSelectedSuite] = useState<Room | null>(null);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);

  // Check-In Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [idType, setIdType] = useState<'Aadhaar Card' | 'Passport' | 'Driving License'>('Aadhaar Card');
  const [idNumber, setIdNumber] = useState('');
  const [roomNumber, setRoomNumber] = useState(rooms.find(r => r.status === 'Available')?.number || '104');
  const [checkInDate, setCheckInDate] = useState('2026-07-26');
  const [checkOutDate, setCheckOutDate] = useState('2026-07-28');
  const [vipTier, setVipTier] = useState<'Royal VIP' | 'Standard' | 'Wedding Guest'>('Royal VIP');
  const [notes, setNotes] = useState('');
  const [royalButler, setRoyalButler] = useState('Manish Singh');

  const filteredRooms = rooms.filter((room) => {
    if (statusFilter === 'All') return true;
    return room.status === statusFilter;
  });

  const getStatusBadge = (status: RoomStatus) => {
    switch (status) {
      case 'Occupied':
        return <span className="bg-amber-950 text-amber-200 border border-amber-700/60 text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium"><User className="w-3 h-3 text-amber-400" /> Occupied</span>;
      case 'Available':
        return <span className="bg-emerald-950 text-emerald-200 border border-emerald-700/60 text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Available</span>;
      case 'Reserved':
        return <span className="bg-blue-950 text-blue-200 border border-blue-700/60 text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium"><ShieldCheck className="w-3 h-3 text-blue-400" /> Reserved</span>;
      case 'Housekeeping':
        return <span className="bg-purple-950 text-purple-200 border border-purple-700/60 text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium"><Sparkles className="w-3 h-3 text-purple-400" /> Cleaning</span>;
      case 'Maintenance':
        return <span className="bg-rose-950 text-rose-200 border border-rose-700/60 text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium"><Wrench className="w-3 h-3 text-rose-400" /> Maintenance</span>;
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !roomNumber) {
      alert('Please fill in required fields (Guest Name, Phone, Room Number).');
      return;
    }

    const selectedRoomObj = rooms.find(r => r.number === roomNumber);
    const nightPrice = selectedRoomObj ? selectedRoomObj.pricePerNight : 15000;

    onCheckInGuest({
      name,
      phone,
      email,
      idType,
      idNumber,
      roomNumber,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalAmount: nightPrice * 2,
      status: 'CheckedIn',
      vipTier,
      notes,
      royalButlerAssigned: royalButler
    });

    setIsCheckInOpen(false);
    // Reset fields
    setName('');
    setPhone('');
    setEmail('');
    setIdNumber('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-stone-900/60 p-4 rounded-xl border border-amber-900/30">
        <div>
          <h2 className="text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
            <Hotel className="w-5 h-5 text-amber-400" /> Royal Suite Allocation Matrix
          </h2>
          <p className="text-xs text-stone-400">Live room inventory, guest check-ins, and butler assignments</p>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {['All', 'Occupied', 'Available', 'Reserved', 'Housekeeping', 'Maintenance'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${statusFilter === st
                ? 'bg-amber-700 text-amber-100 font-semibold border border-amber-400/50 shadow'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-amber-200'
                }`}
            >
              {st}
            </button>
          ))}

          <button
            onClick={() => setIsCheckInOpen(true)}
            className="ml-2 bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer whitespace-nowrap"
          >
            <UserPlus className="w-4 h-4" />
            <span>New Check-In</span>
          </button>
        </div>
      </div>

      {/* Suite Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredRooms.map((room) => {
          const guest = guests.find((g) => g.roomNumber === room.number && g.status === 'CheckedIn');
          return (
            <div
              key={room.id}
              className={`rounded-xl border transition-all p-4 flex flex-col justify-between relative bg-stone-900/80 hover:border-amber-500/60 shadow-lg ${room.status === 'Occupied'
                ? 'border-amber-700/50'
                : room.status === 'Available'
                  ? 'border-emerald-800/40'
                  : room.status === 'Housekeeping'
                    ? 'border-purple-800/40'
                    : 'border-stone-800'
                }`}
            >
              {/* Room Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-serif font-bold text-amber-200 flex items-center gap-1.5">
                    Suite #{room.number}
                  </span>
                  {getStatusBadge(room.status)}
                </div>

                <p className="text-xs font-serif text-amber-400 font-semibold mb-1">{room.category}</p>
                <p className="text-[11px] text-stone-400 mb-3">{room.floor} • ₹{room.pricePerNight.toLocaleString('en-IN')}/night</p>

                {/* Features Badges */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {room.features.slice(0, 3).map((feat, i) => (
                    <span key={i} className="text-[10px] bg-stone-950 text-stone-300 px-2 py-0.5 rounded border border-stone-800">
                      {feat}
                    </span>
                  ))}
                </div>

                {/* Occupant Info if Occupied */}
                {room.status === 'Occupied' && (
                  <div className="bg-amber-950/40 border border-amber-800/40 p-2.5 rounded-lg mb-3 text-xs space-y-1">
                    <div className="flex items-center justify-between text-amber-200 font-medium">
                      <span>👤 {room.currentGuestName || guest?.name || 'Guest'}</span>
                    </div>
                    {guest?.royalButlerAssigned && (
                      <p className="text-[11px] text-amber-400/90 font-mono">
                        👑 Butler: {guest.royalButlerAssigned}
                      </p>
                    )}
                    <p className="text-[10px] text-stone-400">
                      Stay: {room.checkInDate || '2026-07-24'} to {room.checkOutDate || '2026-07-28'}
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Status Action Controls */}
              <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
                <select
                  value={room.status}
                  onChange={(e) => onUpdateRoomStatus(room.id, e.target.value as RoomStatus)}
                  className="bg-stone-950 text-stone-200 text-xs rounded border border-amber-900/50 px-2 py-1 outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="Available">Available</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Housekeeping">Housekeeping</option>
                  <option value="Maintenance">Maintenance</option>
                </select>

                {room.status === 'Occupied' && (
                  <button
                    onClick={() => {
                      const guestObj = guests.find(g => g.roomNumber === room.number);
                      onOpenNewInvoiceForGuest(room.currentGuestName || guestObj?.name || 'Guest', room.number);
                    }}
                    className="text-amber-300 hover:text-amber-100 bg-amber-900/60 px-2 py-1 rounded text-[11px] border border-amber-600/40 cursor-pointer flex items-center gap-1"
                  >
                    <FileText className="w-3 h-3" /> Folio
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Guest Directory Section */}
      <div className="bg-stone-900/80 border border-amber-900/30 rounded-xl p-5 shadow-lg">
        <h3 className="text-lg font-serif font-bold text-amber-100 mb-3 flex items-center gap-2">
          <User className="w-5 h-5 text-amber-400" /> Currently In-House Royal Guests
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300 border-collapse">
            <thead>
              <tr className="bg-stone-950 text-amber-300/80 border-b border-amber-900/40 uppercase font-mono tracking-wider">
                <th className="p-3">Guest Name</th>
                <th className="p-3">Suite</th>
                <th className="p-3">Phone / Email</th>
                <th className="p-3">ID Verification</th>
                <th className="p-3">VIP Status</th>
                <th className="p-3">Assigned Butler</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {guests.map((g) => (
                <tr key={g.id} className="hover:bg-stone-800/40">
                  <td className="p-3 font-semibold text-amber-100">{g.name}</td>
                  <td className="p-3 text-amber-300 font-serif font-bold">#{g.roomNumber}</td>
                  <td className="p-3 text-stone-400">{g.phone}<br />{g.email}</td>
                  <td className="p-3 text-stone-300">{g.idType}: <span className="font-mono text-stone-400">{g.idNumber}</span></td>
                  <td className="p-3">
                    <span className="bg-amber-950 text-amber-300 border border-amber-700/60 text-[10px] uppercase px-2 py-0.5 rounded font-mono">
                      {g.vipTier}
                    </span>
                  </td>
                  <td className="p-3 text-amber-200">👑 {g.royalButlerAssigned || 'Unassigned'}</td>
                  <td className="p-3 flex items-center gap-2">
                    <button
                      onClick={() => onOpenNewInvoiceForGuest(g.name, g.roomNumber)}
                      className="bg-stone-800 hover:bg-stone-700 text-amber-200 px-2.5 py-1 rounded border border-amber-700/40 text-[11px] cursor-pointer"
                    >
                      Invoice
                    </button>
                    {g.status === 'CheckedIn' && (
                      <button
                        onClick={() => onCheckOutGuest(g.id)}
                        className="bg-rose-950 hover:bg-rose-900 text-rose-200 px-2.5 py-1 rounded border border-rose-700/40 text-[11px] cursor-pointer"
                      >
                        Check-Out
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Check-In Modal / Drawer */}
      {isCheckInOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-700/60 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsCheckInOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-amber-200 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-serif font-bold text-amber-100 mb-2 flex items-center gap-2">
              <UserPlus className="w-6 h-6 text-amber-400" /> Royal Guest Check-In Registration
            </h3>
            <p className="text-xs text-stone-400 mb-6">Register a new guest, assign a suite, and designate a dedicated royal butler.</p>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs text-stone-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-semibold text-amber-300">Guest Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maharaja Yuvraj Singh"
                    required
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-amber-300">Phone Number *</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98250 12345"
                    required
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-amber-300">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="guest@royalgroup.in"
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-amber-300">Select Suite *</label>
                  <select
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500 cursor-pointer"
                  >
                    {rooms.map((r) => (
                      <option key={r.id} value={r.number}>
                        Suite #{r.number} - {r.category} (₹{r.pricePerNight.toLocaleString('en-IN')}/night) [{r.status}]
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-amber-300">ID Verification Type</label>
                  <select
                    value={idType}
                    onChange={(e) => setIdType(e.target.value as any)}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="Passport">Passport</option>
                    <option value="Driving License">Driving License</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-amber-300">ID Number</label>
                  <input
                    type="text"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    placeholder="Enter Aadhaar or Passport ID"
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-amber-300">Check-In Date</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-amber-300">Check-Out Date</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-amber-300">VIP Category</label>
                  <select
                    value={vipTier}
                    onChange={(e) => setVipTier(e.target.value as any)}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Royal VIP">Royal VIP</option>
                    <option value="Wedding Guest">Wedding Guest</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-amber-300">Assign Dedicated Butler</label>
                  <select
                    value={royalButler}
                    onChange={(e) => setRoyalButler(e.target.value)}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Manish Singh">Manish Singh (Head Butler)</option>
                    <option value="Bhawani Jadeja">Bhawani Jadeja (Senior Butler)</option>
                    <option value="Pratapsinh Zala">Pratapsinh Zala</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-amber-300">Special Preferences & Welcome Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Requires airport transfer, pure Jain food, jasmine flower welcome garland..."
                  className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsCheckInOpen(false)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold rounded-lg cursor-pointer shadow-lg"
                >
                  Confirm Royal Check-In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
