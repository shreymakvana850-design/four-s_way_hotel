import React, { useState } from 'react';
import {
  X,
  Utensils,
  ShoppingBag,
  Plus,
  Minus,
  CheckCircle,
  CreditCard,
  Banknote,
  ShieldCheck,
  Flame,
  ArrowRight,
  ArrowLeft,
  QrCode,
  Building2,
  Lock,
  CheckCircle2,
  Sparkles,
  Printer,
  ChevronRight,
  MapPin,
  User,
  Phone,
} from 'lucide-react';
import myQrCodeImg from '../assets/images/qr.jpg';
import { FOOD_MENU_DATA, MenuItem, FoodOrder, FoodOrderItem, CustomerRecord } from '../data/websiteData';

interface FoodOrderingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderPlaced: (order: FoodOrder, customer: CustomerRecord) => void;
}

export const FoodOrderingModal: React.FC<FoodOrderingModalProps> = ({
  isOpen,
  onClose,
  onOrderPlaced,
}) => {
  // Step sequence: 1. dishes -> 2. details -> 3. payment -> 4. success
  const [step, setStep] = useState<'dishes' | 'details' | 'payment' | 'success'>('dishes');
  const [selectedCategory, setSelectedCategory] = useState<string>('Rajasthani');
  const [cart, setCart] = useState<{ [id: string]: number }>({});

  // Delivery & Room state
  const [deliveryType, setDeliveryType] = useState<'Room Delivery' | 'Table Dining' | 'Takeaway'>('Room Delivery');
  const [roomOrTableNo, setRoomOrTableNo] = useState('');
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');

  // Payment State
  const [paymentOption, setPaymentOption] = useState<'upi' | 'card' | 'netbanking' | 'cash'>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const [lastOrder, setLastOrder] = useState<FoodOrder | null>(null);
  const [transactionId, setTransactionId] = useState('');

  if (!isOpen) return null;

  const categories = Array.from(new Set(FOOD_MENU_DATA.map((item) => item.category)));

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      const current = prev[itemId] || 0;
      const updated = current + delta;
      if (updated <= 0) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return { ...prev, [itemId]: updated };
    });
  };

  const filteredMenuItems = FOOD_MENU_DATA.filter(
    (item) => item.category === selectedCategory
  );

  const cartItems: FoodOrderItem[] = Object.entries(cart)
    .filter(([_, qty]) => Number(qty) > 0)
    .map(([id, qty]) => {
      const menuItem = FOOD_MENU_DATA.find((item) => item.id === id)!;
      return { menuItem, quantity: Number(qty) };
    });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );
  const totalItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const gst = Math.round(subtotal * 0.05);
  const totalAmount = subtotal + gst;

  // Step 1 -> Step 2 transition validation
  const handleProceedToDetails = () => {
    if (cartItems.length === 0) {
      alert('Please select at least one dish from the menu.');
      return;
    }
    setStep('details');
  };

  // Step 2 -> Step 3 transition validation
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomOrTableNo || !guestName || !phone) {
      alert('Please fill room/table number, guest name and phone number.');
      return;
    }
    setStep('payment');
  };

  // Step 3 -> Final Submit Payment
  const handleFinalPaymentSubmit = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      const txnId = 'TXN-' + Math.floor(10000000 + Math.random() * 90000000);
      const orderDate = new Date().toISOString().split('T')[0];

      let paymentMethodText: string = 'Online Payment (UPI/Card)';
      if (paymentOption === 'upi') paymentMethodText = `UPI Payment (${upiId || 'GPay/PhonePe'})`;
      if (paymentOption === 'card') paymentMethodText = `Credit/Debit Card (${cardNumber.slice(-4) || '4242'})`;
      if (paymentOption === 'netbanking') paymentMethodText = `Net Banking (${selectedBank})`;
      if (paymentOption === 'cash') paymentMethodText = 'Cash Payment (Pay on Delivery / Room Bill)';

      const newOrder: FoodOrder = {
        id: orderId,
        guestName: guestName || 'Royal Guest',
        phone: phone || '+91 92743 96643',
        deliveryType,
        roomOrTableNo: roomOrTableNo || 'General',
        items: cartItems,
        subtotal,
        gst,
        totalAmount,
        paymentMethod: paymentMethodText as any,
        paymentStatus: paymentOption === 'cash' ? 'Pending (Pay on Delivery)' : 'Paid',
        orderStatus: 'Received',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + orderDate,
      };

      const newCustomer: CustomerRecord = {
        id: 'cust-' + Date.now(),
        name: guestName || 'Royal Guest',
        phone: phone || '+91 92743 96643',
        email: `${guestName.toLowerCase().replace(/\s+/g, '') || 'guest'}@infofourswayhotel.gmail.com`,
        bookingType: 'Food Order',
        details: `${cartItems.map(i => `${i.quantity}x ${i.menuItem.name}`).join(', ')} (${deliveryType} - ${roomOrTableNo})`,
        amount: totalAmount,
        paymentMethod: paymentOption === 'cash' ? 'Cash Payment' : 'Online Payment (UPI/Card)',
        paymentStatus: paymentOption === 'cash' ? 'Pending' : 'Paid',
        date: orderDate,
      };

      setTransactionId(txnId);
      setLastOrder(newOrder);
      onOrderPlaced(newOrder, newCustomer);
      setIsProcessingPayment(false);
      setStep('success');
    }, 1200);
  };

  const resetAndClose = () => {
    setStep('dishes');
    setCart({});
    setGuestName('');
    setPhone('');
    setRoomOrTableNo('');
    setUpiId('');
    setCardNumber('');
    setCardHolder('');
    setCardExpiry('');
    setCardCvv('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-stone-950/85 backdrop-blur-md overflow-y-auto no-scrollbar">
      <div className="relative w-full max-w-5xl bg-stone-900 border border-amber-800/40 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col no-scrollbar">
        {/* Header */}
        <div className="bg-linear-to-r from-stone-950 via-amber-950/60 to-stone-950 p-4 sm:p-5 border-b border-amber-800/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-amber-100 flex items-center gap-2">
                Royal Palace Food Ordering
              </h2>
              <p className="text-xs text-stone-400">
                1. Select Dishes • 2. Enter Room / Details • 3. Payment
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs font-serif">
            <span className={`px-3 py-1 rounded-full ${step === 'dishes' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 bg-stone-950'}`}>
              1. Dishes
            </span>
            <span className="text-stone-600">→</span>
            <span className={`px-3 py-1 rounded-full ${step === 'details' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 bg-stone-950'}`}>
              2. Room & Guest
            </span>
            <span className="text-stone-600">→</span>
            <span className={`px-3 py-1 rounded-full ${step === 'payment' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 bg-stone-950'}`}>
              3. Payment
            </span>
            <span className="text-stone-600">→</span>
            <span className={`px-3 py-1 rounded-full ${step === 'success' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 bg-stone-950'}`}>
              4. Invoice
            </span>
          </div>

          <button
            onClick={resetAndClose}
            className="text-stone-400 hover:text-amber-300 p-2 rounded-full hover:bg-stone-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* STEP 1: FOOD DISHES & MENU SELECTION */}
        {step === 'dishes' && (
          <div className="flex flex-col flex-1 overflow-hidden no-scrollbar relative">
            {/* Category Pills */}
            <div className="p-3 sm:p-4 bg-stone-950/90 border-b border-stone-800 overflow-x-auto flex gap-2 shrink-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-serif font-medium transition-all cursor-pointer ${selectedCategory === cat
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 hover:text-amber-200'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Menu Grid - Full Width displaying Food Photos and Details */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 no-scrollbar pb-24">
              <div className="flex items-center justify-between border-b border-stone-800/60 pb-3">
                <div>
                  <h3 className="font-serif font-bold text-stone-100 text-lg sm:text-xl flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-500" /> {selectedCategory} Delicacies
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Select your favorite dishes with authentic royal flavors
                  </p>
                </div>
                <span className="text-xs text-amber-400 font-mono bg-amber-950/60 border border-amber-800/40 px-3 py-1 rounded-full">
                  {filteredMenuItems.length} dishes
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filteredMenuItems.map((item) => {
                  const quantity = cart[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className={`bg-stone-950/90 border rounded-xl p-3.5 flex gap-3.5 transition-all shadow-md group ${quantity > 0 ? 'border-amber-500/80 bg-amber-950/10' : 'border-stone-800 hover:border-amber-600/60'
                        }`}
                    >
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 border border-stone-800">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-1 left-1 text-[9px] bg-stone-950/90 text-emerald-400 border border-emerald-600/50 px-1.5 py-0.5 rounded font-mono font-bold shadow">
                          PURE VEG
                        </span>
                      </div>

                      <div className="flex flex-col justify-between flex-1 min-w-0">
                        <div>
                          <h4 className="font-serif font-bold text-amber-100 text-sm sm:text-base truncate group-hover:text-amber-300 transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-800/80">
                          <span className="font-serif font-bold text-amber-400 text-base">
                            ₹{item.price}
                          </span>

                          {quantity > 0 ? (
                            <div className="flex items-center gap-2 bg-stone-900 border border-amber-500/70 rounded-lg px-2.5 py-1 shadow">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, -1)}
                                className="text-amber-400 hover:text-amber-200 cursor-pointer p-0.5"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-mono text-xs text-amber-100 font-bold px-1">
                                {quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="text-amber-400 hover:text-amber-200 cursor-pointer p-0.5"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-stone-950 border border-amber-500/50 text-xs font-serif font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 shadow"
                            >
                              <Plus className="w-3.5 h-3.5" /> Add Dish
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Persistent Floating Bottom Action Bar - APPERS ONLY AFTER FOOD IS SELECTED */}
            {cartItems.length > 0 ? (
              <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-stone-950 via-stone-950/95 to-stone-950/80 p-3 sm:p-4 border-t border-amber-500/40 backdrop-blur-md flex items-center justify-between gap-4 z-20 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/20 text-amber-400 p-2.5 rounded-xl border border-amber-500/40 font-bold font-mono text-sm flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-amber-400" />
                    <span>{totalItemsCount} {totalItemsCount === 1 ? 'Dish' : 'Dishes'} Selected</span>
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-xs text-stone-400 block">Total Amount</span>
                    <span className="text-lg font-serif font-bold text-amber-300">₹{totalAmount}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCart({})}
                    className="hidden sm:block text-xs text-stone-400 hover:text-red-400 px-3 py-2 cursor-pointer transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    onClick={handleProceedToDetails}
                    className="bg-linear-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-serif font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-xl transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Proceed to Room & Guest Details (₹{totalAmount})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-stone-950/80 border-t border-stone-800/80 p-3 text-center text-xs text-stone-400 font-serif">
                Please select your desired food dishes above by clicking "+ Add Dish". Once done, you can proceed to enter room details.
              </div>
            )}
          </div>
        )}

        {/* STEP 2: ROOM NUMBER & GUEST DETAILS PAGE */}
        {step === 'details' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 no-scrollbar">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <button
                type="button"
                onClick={() => setStep('dishes')}
                className="text-amber-400 hover:text-amber-200 text-xs font-serif flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Dish Menu
              </button>
              <div className="text-xs text-amber-300 font-serif">
                Step 2 of 3: Enter Delivery Location & Guest Info
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Form */}
              <div className="lg:col-span-2 bg-stone-950 p-5 rounded-xl border border-stone-800 space-y-5">
                <h3 className="font-serif font-bold text-stone-100 text-lg flex items-center gap-2 border-b border-stone-800 pb-3">
                  <Building2 className="w-5 h-5 text-amber-400" /> Room / Table Delivery Information
                </h3>

                <form onSubmit={handleProceedToPayment} className="space-y-4">
                  {/* Delivery Location Type */}
                  <div className="space-y-2">
                    <label className="text-xs font-serif text-amber-300 block">
                      Delivery Location Category *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Room Delivery', 'Table Dining', 'Takeaway'] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setDeliveryType(type)}
                          className={`py-2.5 px-3 rounded-lg text-xs font-medium transition-all text-center border cursor-pointer ${deliveryType === type
                            ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-md'
                            : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800'
                            }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Room or Table Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-serif text-amber-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {deliveryType === 'Room Delivery'
                        ? 'Room Number *'
                        : deliveryType === 'Table Dining'
                          ? 'Restaurant Table Number *'
                          : 'Takeaway Counter Location *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={
                        deliveryType === 'Room Delivery'
                          ? 'e.g., Maharaja Suite 101 or Room 204'
                          : deliveryType === 'Table Dining'
                            ? 'e.g., Deep Mahal Table 4 or Sheesh Mahal Table 2'
                            : 'e.g., Main Reception Desk'
                      }
                      value={roomOrTableNo}
                      onChange={(e) => setRoomOrTableNo(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3.5 py-2.5 text-xs text-stone-100 focus:border-amber-500 outline-none"
                    />
                  </div>

                  {/* Guest Name & Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-serif text-amber-300 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-amber-400" /> Guest Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Maharaval Digvijay Singh"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3.5 py-2.5 text-xs text-stone-100 focus:border-amber-500 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-serif text-amber-300 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-amber-400" /> Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 92743 96643"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3.5 py-2.5 text-xs text-stone-100 focus:border-amber-500 outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-linear-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950 font-serif font-bold text-sm py-3.5 rounded-xl shadow-xl hover:from-amber-500 hover:to-amber-400 transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                  >
                    <span>Proceed to Payment Gateway Page</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Right Column: Selected Order Summary */}
              <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-amber-200 text-base border-b border-stone-800 pb-2 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-amber-400" /> Order Summary ({cartItems.length} Dishes)
                  </h4>

                  <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-1 text-xs">
                    {cartItems.map(({ menuItem, quantity }) => (
                      <div key={menuItem.id} className="flex justify-between items-center bg-stone-900/80 p-2 rounded border border-stone-800">
                        <div>
                          <span className="font-medium text-stone-200 block">{menuItem.name}</span>
                          <span className="text-stone-400 text-[10px]">₹{menuItem.price} x {quantity}</span>
                        </div>
                        <span className="font-bold text-amber-400 font-mono">₹{menuItem.price * quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-stone-900 p-3 rounded-lg border border-stone-800 space-y-1 text-xs font-mono">
                    <div className="flex justify-between text-stone-400">
                      <span>Food Subtotal:</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-stone-400">
                      <span>GST (5%):</span>
                      <span>₹{gst}</span>
                    </div>
                    <div className="flex justify-between font-bold text-amber-400 pt-1.5 border-t border-stone-800 text-base">
                      <span>Grand Total:</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: DEDICATED PAYMENT GATEWAY PAGE */}
        {step === 'payment' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 no-scrollbar">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-amber-400 hover:text-amber-200 text-xs font-serif flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Room Details
              </button>
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-700/40 px-3 py-1 rounded-full font-mono">
                <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted Royal Payment
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Payment Options */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="font-serif font-bold text-stone-100 text-lg flex items-center gap-2">
                  Select Payment Option
                </h3>

                {/* Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentOption('upi')}
                    className={`p-3 rounded-xl border text-xs font-serif flex flex-col items-center gap-1.5 transition-all cursor-pointer ${paymentOption === 'upi'
                      ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-lg'
                      : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
                      }`}
                  >
                    <QrCode className="w-5 h-5" /> UPI / QR Code
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentOption('card')}
                    className={`p-3 rounded-xl border text-xs font-serif flex flex-col items-center gap-1.5 transition-all cursor-pointer ${paymentOption === 'card'
                      ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-lg'
                      : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
                      }`}
                  >
                    <CreditCard className="w-5 h-5" /> Credit / Debit Card
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentOption('netbanking')}
                    className={`p-3 rounded-xl border text-xs font-serif flex flex-col items-center gap-1.5 transition-all cursor-pointer ${paymentOption === 'netbanking'
                      ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-lg'
                      : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
                      }`}
                  >
                    <Building2 className="w-5 h-5" /> Net Banking
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentOption('cash')}
                    className={`p-3 rounded-xl border text-xs font-serif flex flex-col items-center gap-1.5 transition-all cursor-pointer ${paymentOption === 'cash'
                      ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-lg'
                      : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
                      }`}
                  >
                    <Banknote className="w-5 h-5" /> Pay at Hotel
                  </button>
                </div>

                {/* Option 1: UPI */}
                {paymentOption === 'upi' && (
                  <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 space-y-4">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="bg-white p-3 rounded-xl border-2 border-amber-500/50 shadow-md text-center">
                        <div className="w-32 h-32 bg-stone-900 p-2 rounded flex flex-col items-center justify-center text-amber-400 font-mono text-[10px]">
                         <img src={myQrCodeImg} alt="UPI QR Code" className="w-40 h-40 object-contain rounded-lg shadow-md" />
                          <span className="mt-1 font-bold text-amber-400">SCAN & PAY ₹{totalAmount}</span>
                        </div>
                        <span className="text-[10px] text-stone-600 font-sans block mt-1">GPay • PhonePe • Paytm</span>
                      </div>

                      <div className="flex-1 space-y-3 w-full">
                        <label className="text-xs font-serif text-amber-300 block">
                          Or enter your UPI ID (VPA)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., username@upi or mobile@paytm"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2.5 text-xs text-stone-100 focus:border-amber-500 outline-none"
                        />
                        <p className="text-[11px] text-stone-400">
                          A payment request of <strong className="text-amber-400">₹{totalAmount}</strong> will be sent to your UPI app instantly.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Option 2: CREDIT / DEBIT CARD */}
                {paymentOption === 'card' && (
                  <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 space-y-4">
                    <div className="w-full max-w-sm mx-auto h-44 rounded-2xl bg-linear-to-tr from-amber-900 via-stone-900 to-amber-950 border border-amber-500/40 p-4 shadow-xl text-stone-100 flex flex-col justify-between font-mono">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-serif tracking-widest text-amber-400 uppercase">
                          Khirasara Palace Card
                        </span>
                        <ShieldCheck className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="text-lg tracking-widest text-amber-200">
                        {cardNumber || '•••• •••• •••• ••••'}
                      </div>
                      <div className="flex justify-between text-[11px] text-stone-300 uppercase">
                        <div>
                          <span className="block text-[9px] text-stone-500">CARD HOLDER</span>
                          <span>{cardHolder || guestName || 'GUEST NAME'}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] text-stone-500">EXPIRES</span>
                          <span>{cardExpiry || 'MM/YY'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="sm:col-span-2">
                        <label className="text-stone-400 block mb-1">Card Number *</label>
                        <input
                          type="text"
                          maxLength={19}
                          placeholder="4532 1092 8831 4920"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-stone-400 block mb-1">Cardholder Name *</label>
                        <input
                          type="text"
                          placeholder="Name as on card"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-stone-400 block mb-1">Expiry Date *</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-stone-400 block mb-1">CVV Code *</label>
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="•••"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2.5 text-stone-100 focus:border-amber-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Option 3: NET BANKING */}
                {paymentOption === 'netbanking' && (
                  <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 space-y-3">
                    <label className="text-xs font-serif text-amber-300 block">Select Preferred Bank</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National'].map((bank) => (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => setSelectedBank(bank)}
                          className={`p-2.5 rounded-lg border text-xs text-left transition-all ${selectedBank === bank
                            ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold'
                            : 'bg-stone-900 border-stone-800 text-stone-400 hover:bg-stone-800'
                            }`}
                        >
                          {bank}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Option 4: PAY AT HOTEL */}
                {paymentOption === 'cash' && (
                  <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 space-y-2">
                    <h4 className="font-serif font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                      <Banknote className="w-4 h-4" /> Pay on Delivery / Room Checkout Bill
                    </h4>
                    <p className="text-xs text-stone-300">
                      You can pay <strong className="text-amber-300">₹{totalAmount}</strong> in cash or UPI directly when our palace room service staff delivers the food to <span className="text-amber-200">{roomOrTableNo}</span>.
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column: Order Review & Pay Button */}
              <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-amber-200 text-base border-b border-stone-800 pb-2">
                    Order Payment Summary
                  </h4>

                  <div className="text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Guest Name:</span>
                      <span className="font-semibold text-stone-100">{guestName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Location:</span>
                      <span className="font-semibold text-amber-300">{deliveryType} ({roomOrTableNo})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Dishes Ordered:</span>
                      <span className="font-semibold text-stone-200 text-right max-w-35 truncate">
                        {cartItems.map(i => `${i.quantity}x ${i.menuItem.name}`).join(', ')}
                      </span>
                    </div>
                  </div>

                  <div className="bg-stone-900 p-3 rounded-lg border border-stone-800 space-y-1 text-xs font-mono">
                    <div className="flex justify-between text-stone-400">
                      <span>Food Total:</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-stone-400">
                      <span>GST (5%):</span>
                      <span>₹{gst}</span>
                    </div>
                    <div className="flex justify-between font-bold text-amber-400 pt-1.5 border-t border-stone-800 text-base">
                      <span>Total Amount:</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFinalPaymentSubmit}
                  disabled={isProcessingPayment}
                  className="w-full bg-linear-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950 font-serif font-bold text-sm py-3.5 rounded-xl shadow-xl hover:from-amber-500 hover:to-amber-400 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isProcessingPayment ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                      Securing Encrypted Royal Payment...
                    </span>
                  ) : (
                    <span>Pay ₹{totalAmount} Now</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: SUCCESSFUL PAYMENT RECEIPT */}
        {step === 'success' && lastOrder && (
          <div className="p-8 text-center space-y-6 overflow-y-auto my-auto no-scrollbar">
            <div className="w-16 h-16 bg-amber-500/20 border border-amber-500/40 text-amber-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-800/40 px-3 py-1 rounded-full">
                Payment Success • Txn ID: {transactionId}
              </span>
              <h3 className="font-serif font-bold text-2xl text-stone-100 mt-2">
                Food Order & Payment Confirmed!
              </h3>
              <p className="text-stone-300 text-sm mt-2 max-w-md mx-auto">
                Your order has been dispatched to Khirasara Palace kitchen and is being cooked in pure ghee.
              </p>
            </div>

            <div className="bg-stone-950 p-6 rounded-xl border border-amber-800/40 text-left max-w-lg mx-auto space-y-3 text-xs sm:text-sm font-sans shadow-2xl">
              <div className="flex justify-between border-b border-stone-800 pb-2">
                <span className="text-stone-400">Order Reference:</span>
                <span className="font-mono font-bold text-amber-400">#{lastOrder.id}</span>
              </div>
              <div className="flex justify-between border-b border-stone-800 pb-2">
                <span className="text-stone-400">Delivery Location:</span>
                <span className="font-semibold text-amber-200">{lastOrder.deliveryType} ({lastOrder.roomOrTableNo})</span>
              </div>
              <div className="flex justify-between border-b border-stone-800 pb-2">
                <span className="text-stone-400">Guest Name:</span>
                <span className="font-medium text-stone-100">{lastOrder.guestName} ({lastOrder.phone})</span>
              </div>
              <div className="flex justify-between border-b border-stone-800 pb-2">
                <span className="text-stone-400">Selected Items:</span>
                <span className="text-stone-200 text-right">
                  {lastOrder.items.map(i => `${i.quantity}x ${i.menuItem.name}`).join(', ')}
                </span>
              </div>
              <div className="flex justify-between border-b border-stone-800 pb-2">
                <span className="text-stone-400">Total Paid Amount:</span>
                <span className="font-bold text-amber-400">₹{lastOrder.totalAmount} (incl. 5% GST)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Payment Mode:</span>
                <span className="font-medium text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> {lastOrder.paymentMethod}
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-serif text-xs font-semibold px-4 py-2.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Print Digital Invoice
              </button>
              <button
                type="button"
                onClick={resetAndClose}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-bold text-xs px-6 py-2.5 rounded-lg shadow-lg cursor-pointer transition-all"
              >
                Done & Return to Menu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

