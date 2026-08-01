import React, { useState } from 'react';
import { DiningVenue, CustomerRecord } from '../data/websiteData';
import { UtensilsCrossed, Clock, CheckCircle2, X, Calendar, User, Phone, CreditCard, Banknote } from 'lucide-react';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  venue?: DiningVenue | null;
  onTableReserved?: (customer: CustomerRecord) => void;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  isOpen,
  onClose,
  venue,
  onTableReserved,
}) => {
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-08-01');
  const [time, setTime] = useState('20:00');
  const [guests, setGuests] = useState(2);
  const [specialDiet, setSpecialDiet] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Online Payment (UPI/Card)' | 'Cash Payment'>('Online Payment (UPI/Card)');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const venueName = venue?.name || 'Deep Mahal & Sheesh Mahal';
  const estimatedCost = guests * 1200; // Average per head dining deposit/estimate

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !phone) {
      alert('Please enter your name and phone number.');
      return;
    }

    if (onTableReserved) {
      const cust: CustomerRecord = {
        id: 'cust-' + Date.now(),
        name: guestName,
        phone,
        email: `${guestName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        bookingType: 'Table Reservation',
        details: `${venueName} (${guests} Guests on ${date} at ${time})`,
        amount: estimatedCost,
        paymentMethod,
        paymentStatus: paymentMethod.includes('Online') ? 'Paid' : 'Pending',
        date,
      };
      onTableReserved(cust);
    }

    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-amber-600/60 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-stone-100">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-amber-200 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {confirmed ? (
          <div className="text-center py-6 space-y-4 animate-in fade-in">
            <CheckCircle2 className="w-14 h-14 text-amber-400 mx-auto" />
            <h3 className="text-2xl font-serif font-bold text-amber-100">Table Reserved!</h3>
            <p className="text-xs text-stone-300">
              Pranām, <strong>{guestName}</strong>! Your table for <strong>{guests} Guests</strong> at <strong>{venueName}</strong> is reserved on <strong>{date} at {time}</strong>.
            </p>
            <p className="text-[11px] text-amber-300 font-mono">
              Reservation details sent to {phone}.
            </p>
            <button
              onClick={() => {
                setConfirmed(false);
                onClose();
              }}
              className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-serif font-bold text-xs px-6 py-2.5 rounded-xl shadow cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-amber-900/40 pb-3">
              <UtensilsCrossed className="w-6 h-6 text-amber-400" />
              <div>
                <h3 className="text-xl font-serif font-bold text-amber-100">
                  Reserve Dining Table
                </h3>
                <p className="text-xs text-amber-300 font-serif">{venueName}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block mb-1 text-amber-300 font-serif font-semibold">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Maharaval Digvijay Singh"
                  className="w-full bg-stone-950 border border-amber-900/60 rounded-xl p-2.5 text-stone-100 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-amber-300 font-serif font-semibold">Phone Number / WhatsApp *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 92743 96643"
                  className="w-full bg-stone-950 border border-amber-900/60 rounded-xl p-2.5 text-stone-100 outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block mb-1 text-amber-300 font-serif font-semibold">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-xl p-2 text-stone-100 outline-none focus:border-amber-500 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-amber-300 font-serif font-semibold">Time Slot</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-xl p-2 text-stone-100 outline-none focus:border-amber-500 cursor-pointer text-[11px]"
                  >
                    <option value="12:30">12:30 PM (Lunch)</option>
                    <option value="14:00">02:00 PM (Lunch)</option>
                    <option value="19:30">07:30 PM (Dinner)</option>
                    <option value="20:30">08:30 PM (Dinner)</option>
                    <option value="21:30">09:30 PM (Dinner)</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-amber-300 font-serif font-semibold">Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-xl p-2 text-stone-100 outline-none focus:border-amber-500 cursor-pointer text-[11px]"
                  >
                    <option value={2}>2 Persons</option>
                    <option value={4}>4 Persons</option>
                    <option value={6}>6 Persons</option>
                    <option value={8}>8+ Persons</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-amber-300 font-serif font-semibold">Special Dietary Requests / Candlelight Setup</label>
                <input
                  type="text"
                  value={specialDiet}
                  onChange={(e) => setSpecialDiet(e.target.value)}
                  placeholder="e.g. Jain Kathiyawadi Thali, Candlelight Anniversary setup..."
                  className="w-full bg-stone-950 border border-amber-900/60 rounded-xl p-2.5 text-stone-100 outline-none focus:border-amber-500"
                />
              </div>

              {/* Payment Mode Selection */}
              <div className="space-y-2">
                <label className="block font-serif font-semibold text-amber-300">Select Payment Mode *</label>
                <div className="grid grid-cols-2 gap-2">
                  <label
                    onClick={() => setPaymentMethod('Online Payment (UPI/Card)')}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'Online Payment (UPI/Card)'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-200'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[11px] font-medium">Online Payment</span>
                    </div>
                    <span className="w-3 h-3 rounded-full border border-amber-400 flex items-center justify-center">
                      {paymentMethod === 'Online Payment (UPI/Card)' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      )}
                    </span>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('Cash Payment')}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'Cash Payment'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-200'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Banknote className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[11px] font-medium">Cash Payment</span>
                    </div>
                    <span className="w-3 h-3 rounded-full border border-amber-400 flex items-center justify-center">
                      {paymentMethod === 'Cash Payment' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      )}
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-stone-800 text-stone-300 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-serif font-bold rounded-xl cursor-pointer shadow-lg"
                >
                  Confirm Table Reservation
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
