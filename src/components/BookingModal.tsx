import React, { useState, useEffect } from 'react';
import { SUITES_DATA, Suite, CustomerRecord } from '../data/websiteData';
import { Crown, Sparkles, CheckCircle2, X, Calendar, User, Phone, Mail, ShieldCheck, CreditCard, Banknote } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedSuite?: Suite | null;
  searchParams?: { checkIn: string; checkOut: string; suite: string; guests: number } | null;
  onBookingConfirmed?: (customer: CustomerRecord) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedSuite,
  searchParams,
  onBookingConfirmed,
}) => {
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [checkIn, setCheckIn] = useState('2026-08-01');
  const [checkOut, setCheckOut] = useState('2026-08-03');
  const [selectedSuiteId, setSelectedSuiteId] = useState(SUITES_DATA[0].id);
  const [guestsCount, setGuestsCount] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Online Payment (UPI/Card)' | 'Cash Payment'>('Online Payment (UPI/Card)');

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [voucherId, setVoucherId] = useState('');

  useEffect(() => {
    if (preselectedSuite) {
      setSelectedSuiteId(preselectedSuite.id);
    } else if (searchParams) {
      if (searchParams.checkIn) setCheckIn(searchParams.checkIn);
      if (searchParams.checkOut) setCheckOut(searchParams.checkOut);
      if (searchParams.guests) setGuestsCount(searchParams.guests);
      const found = SUITES_DATA.find((s) => s.name === searchParams.suite);
      if (found) setSelectedSuiteId(found.id);
    }
  }, [preselectedSuite, searchParams, isOpen]);

  if (!isOpen) return null;

  const currentSuite = SUITES_DATA.find((s) => s.id === selectedSuiteId) || SUITES_DATA[0];

  // Calculate Nights & Total
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const nights = Math.max(1, Math.round((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24)));
  const baseTotal = currentSuite.pricePerNight * nights;
  const gst = Math.round(baseTotal * 0.18);
  const grandTotal = baseTotal + gst;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const randomVoucher = `HKP-RES-${Math.floor(100000 + Math.random() * 900000)}`;
    setVoucherId(randomVoucher);

    if (onBookingConfirmed) {
      const cust: CustomerRecord = {
        id: 'cust-' + Date.now(),
        name: guestName,
        phone,
        email: email || `${guestName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        bookingType: 'Room Stay',
        details: `${currentSuite.name} (${nights} Nights: ${checkIn} to ${checkOut})`,
        amount: grandTotal,
        paymentMethod,
        paymentStatus: paymentMethod.includes('Online') ? 'Paid' : 'Pending',
        date: new Date().toISOString().split('T')[0],
      };
      onBookingConfirmed(cust);
    }

    setBookingConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-amber-600/60 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative my-8 text-stone-100 max-h-[90vh] overflow-y-auto">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-amber-200 cursor-pointer p-1"
        >
          <X className="w-6 h-6" />
        </button>

        {bookingConfirmed ? (
          <div className="space-y-6 text-center py-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center text-amber-400 mx-auto">
              <Crown className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs text-amber-400 font-mono font-bold uppercase tracking-wider block mb-1">
                Voucher Confirmation: {voucherId}
              </span>
              <h3 className="text-2xl font-serif font-bold text-amber-100">
                Royal Stay Confirmed!
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                Pranām, <strong>{guestName}</strong>. Your stay at <strong>{currentSuite.name}</strong> is reserved.
              </p>
            </div>

            {/* Voucher Summary Card */}
            <div className="bg-stone-950 border border-amber-800/60 p-4 rounded-xl text-xs text-stone-300 space-y-2 text-left">
              <div className="flex justify-between border-b border-stone-800 pb-2">
                <span>Check-In: <strong>{checkIn}</strong></span>
                <span>Check-Out: <strong>{checkOut}</strong> ({nights} {nights === 1 ? 'Night' : 'Nights'})</span>
              </div>
              <div className="flex justify-between border-b border-stone-800 pb-2">
                <span>Suite: <strong>{currentSuite.name}</strong></span>
                <span>Guests: <strong>{guestsCount} Guests</strong></span>
              </div>
              <div className="flex justify-between text-amber-200 font-serif font-bold pt-1 text-sm">
                <span>Total Amount Payable at Check-In:</span>
                <span className="text-amber-400 font-mono">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <p className="text-[11px] text-stone-400">
              A confirmation WhatsApp has been sent to <span className="font-mono text-amber-300">{phone}</span>. Our Royal Butler Desk will coordinate your arrival.
            </p>

            <button
              onClick={() => {
                setBookingConfirmed(false);
                onClose();
              }}
              className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-serif font-bold text-xs px-6 py-2.5 rounded-xl shadow cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-amber-900/40 pb-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-amber-100">
                  Book Your Royal Stay
                </h3>
                <p className="text-xs text-stone-400">Four's Way Hotel • Sheikh Zayed Road, Dubai</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Suite Selection */}
              <div>
                <label className="block mb-1 font-serif font-bold text-amber-300">Select Royal Suite Category</label>
                <select
                  value={selectedSuiteId}
                  onChange={(e) => setSelectedSuiteId(e.target.value)}
                  className="w-full bg-stone-950 border border-amber-900/60 rounded-xl p-3 text-stone-100 outline-none focus:border-amber-500 cursor-pointer font-serif"
                >
                  {SUITES_DATA.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} — ₹{s.pricePerNight.toLocaleString('en-IN')} / night
                    </option>
                  ))}
                </select>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block mb-1 font-serif font-bold text-amber-300">Check-In Date</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-xl p-2.5 text-stone-100 outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-serif font-bold text-amber-300">Check-Out Date</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-xl p-2.5 text-stone-100 outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-serif font-bold text-amber-300">Guests</label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-xl p-2.5 text-stone-100 outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Adults</option>
                    <option value={3}>3 Adults</option>
                    <option value={4}>4 Adults</option>
                  </select>
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block mb-1 font-serif font-bold text-amber-300">Guest Name *</label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Vikramaditya Singhania"
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-xl p-2.5 text-stone-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-serif font-bold text-amber-300">Mobile Phone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 92743 96643"
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-xl p-2.5 text-stone-100 outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-serif font-bold text-amber-300">Special Preferences / Airport Transfer</label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Vintage Car pickup from Rajkot Airport, Jain meals..."
                  className="w-full bg-stone-950 border border-amber-900/60 rounded-xl p-2.5 text-stone-100 outline-none focus:border-amber-500"
                />
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-2">
                <label className="block font-serif font-bold text-amber-300">Select Payment Mode *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    onClick={() => setPaymentMethod('Online Payment (UPI/Card)')}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'Online Payment (UPI/Card)'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-200'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-amber-400" />
                      <span className="font-medium">Online Payment (UPI/Card)</span>
                    </div>
                    <span className="w-3.5 h-3.5 rounded-full border border-amber-400 flex items-center justify-center">
                      {paymentMethod === 'Online Payment (UPI/Card)' && (
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                      )}
                    </span>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('Cash Payment')}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'Cash Payment'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-200'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-emerald-400" />
                      <span className="font-medium">Cash Payment (Pay at Palace)</span>
                    </div>
                    <span className="w-3.5 h-3.5 rounded-full border border-amber-400 flex items-center justify-center">
                      {paymentMethod === 'Cash Payment' && (
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                      )}
                    </span>
                  </label>
                </div>
              </div>

              {/* Financial Calculation Box */}
              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 space-y-1 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>{currentSuite.name} ({nights} {nights === 1 ? 'night' : 'nights'})</span>
                  <span className="font-mono">₹{baseTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>GST (18%)</span>
                  <span className="font-mono">₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-amber-200 font-serif font-bold text-sm pt-1 border-t border-stone-800">
                  <span>Grand Total Incl. Tax</span>
                  <span className="font-mono text-amber-300">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-stone-800 text-stone-300 rounded-xl cursor-pointer hover:bg-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-serif font-bold rounded-xl cursor-pointer shadow-xl flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm Royal Reservation</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
