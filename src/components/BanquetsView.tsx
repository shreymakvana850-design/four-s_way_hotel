import React, { useState } from 'react';
import { BanquetBooking, BanquetVenue } from '../types';
import { CalendarDays, Plus, User, Phone, MapPin, Sparkles, CheckCircle2, Clock, X } from 'lucide-react';

interface BanquetsViewProps {
  bookings: BanquetBooking[];
  onAddBooking: (booking: Omit<BanquetBooking, 'id'>) => void;
}

export const BanquetsView: React.FC<BanquetsViewProps> = ({ bookings, onAddBooking }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [venue, setVenue] = useState<BanquetVenue>('Suryavanshi Lawns');
  const [eventType, setEventType] = useState<'Royal Wedding' | 'Sangeet & Mehendi' | 'Corporate Summit' | 'Royal Gala Dinner'>('Royal Wedding');
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-11-20');
  const [guestCount, setGuestCount] = useState(500);
  const [packageType, setPackageType] = useState<'Ultra Luxury Royal' | 'Grand Heritage' | 'Bespoke'>('Ultra Luxury Royal');
  const [totalPrice, setTotalPrice] = useState(1800000);
  const [advancePaid, setAdvancePaid] = useState(500000);
  const [stageSetup, setStageSetup] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !phone) {
      alert('Please fill in required client name and phone number.');
      return;
    }

    onAddBooking({
      venue,
      eventType,
      clientName,
      phone,
      date,
      guestCount,
      packageType,
      totalPrice,
      advancePaid,
      stageSetup: stageSetup || 'Royal Palace Mandap with Kathiyawadi Folk Music & Welcome Procession',
      specialRequests,
      status: 'Confirmed'
    });

    setIsModalOpen(false);
    setClientName('');
    setPhone('');
    setStageSetup('');
    setSpecialRequests('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-stone-900/60 p-4 rounded-xl border border-amber-900/30">
        <div>
          <h2 className="text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-amber-400" /> Royal Wedding & Banquet Planner
          </h2>
          <p className="text-xs text-stone-400">Manage bookings for Suryavanshi Lawns, Darbar Hall & Heritage Courtyard</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Royal Event Booking</span>
        </button>
      </div>

      {/* Booking Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((b) => (
          <div key={b.id} className="bg-stone-900 border border-amber-900/50 hover:border-amber-500/60 p-5 rounded-2xl shadow-xl space-y-4 transition-all relative overflow-hidden">
            {/* Top Badge */}
            <div className="flex items-center justify-between">
              <span className="bg-amber-950 text-amber-200 border border-amber-700/60 text-xs px-3 py-1 rounded-full font-serif font-bold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> {b.venue}
              </span>
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-700/60 text-xs px-2.5 py-0.5 rounded-full font-mono uppercase">
                {b.status}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-serif font-bold text-amber-100 mb-1">{b.clientName}</h3>
              <p className="text-xs text-stone-300 flex items-center gap-2">
                <span>🎉 {b.eventType}</span> • <span>👥 {b.guestCount} Royal Guests</span>
              </p>
            </div>

            {/* Event Specs */}
            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 space-y-2 text-xs text-stone-300">
              <p><strong className="text-amber-400">Event Date:</strong> {b.date}</p>
              <p><strong className="text-amber-400">Package:</strong> {b.packageType}</p>
              <p><strong className="text-amber-400">Mandap / Stage Decor:</strong> {b.stageSetup}</p>
              {b.specialRequests && <p><strong className="text-amber-400">Requests:</strong> {b.specialRequests}</p>}
            </div>

            {/* Financial Summary */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-xs">
              <div>
                <p className="text-stone-400">Total Contract Value</p>
                <p className="text-amber-300 font-serif font-bold text-base">₹{b.totalPrice.toLocaleString('en-IN')}</p>
              </div>
              <div className="text-right">
                <p className="text-stone-400">Advance Paid</p>
                <p className="text-emerald-400 font-mono font-bold">₹{b.advancePaid.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-700/60 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-amber-200 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-serif font-bold text-amber-100 mb-2 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-400" /> Book Heritage Venue & Banquet
            </h3>
            <p className="text-xs text-stone-400 mb-6">Schedule royal weddings, grand receptions, and corporate galas.</p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs text-stone-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-semibold text-amber-300">Client / Host Name *</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Yuvraj Singh & Family"
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
                    placeholder="+91 99090 12345"
                    required
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-amber-300">Palace Venue Location</label>
                  <select
                    value={venue}
                    onChange={(e) => setVenue(e.target.value as BanquetVenue)}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Suryavanshi Lawns">Suryavanshi Lawns (Capacity 1,200)</option>
                    <option value="Darbar Hall">Darbar Hall (Capacity 300)</option>
                    <option value="Heritage Courtyard">Heritage Courtyard (Capacity 250)</option>
                    <option value="Poolside Pavilion">Poolside Pavilion (Capacity 150)</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-amber-300">Event Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Royal Wedding">Royal Wedding</option>
                    <option value="Sangeet & Mehendi">Sangeet & Mehendi</option>
                    <option value="Corporate Summit">Corporate Summit</option>
                    <option value="Royal Gala Dinner">Royal Gala Dinner</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-amber-300">Event Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-amber-300">Expected Guests</label>
                  <input
                    type="number"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-amber-300">Total Agreed Price (₹ INR)</label>
                  <input
                    type="number"
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-amber-300">Advance Received (₹ INR)</label>
                  <input
                    type="number"
                    value={advancePaid}
                    onChange={(e) => setAdvancePaid(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-amber-300">Stage & Mandap Decor Notes</label>
                <input
                  type="text"
                  value={stageSetup}
                  onChange={(e) => setStageSetup(e.target.value)}
                  placeholder="e.g. Royal Marigold & Lotus theme with Vintage Car Baraat Entry..."
                  className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-amber-300">Special Folk Performance or Catering Notes</label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Kathiyawadi Folk Dancers, Shehnai players at Palace Gate..."
                  className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold rounded-lg cursor-pointer shadow-lg"
                >
                  Confirm Event Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
