import React, { useState } from 'react';
import { MenuItem, DiningOrder, OrderItem, OutletName, Room } from '../types';
import { UtensilsCrossed, Plus, Minus, ShoppingBag, CheckCircle2, Clock, ChefHat, User, Send, Flame } from 'lucide-react';

interface DiningPOSViewProps {
  menuItems: MenuItem[];
  orders: DiningOrder[];
  rooms: Room[];
  onCreateOrder: (order: Omit<DiningOrder, 'id' | 'createdAt'>) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: DiningOrder['status']) => void;
}

export const DiningPOSView: React.FC<DiningPOSViewProps> = ({
  menuItems,
  orders,
  rooms,
  onCreateOrder,
  onUpdateOrderStatus
}) => {
  const [selectedOutlet, setSelectedOutlet] = useState<OutletName>('Deep Mahal');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedTable, setSelectedTable] = useState('Table 1');
  const [selectedRoomNumber, setSelectedRoomNumber] = useState('');
  const [guestName, setGuestName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Room Charge' | 'UPI / Cash / Card'>('Room Charge');

  // Cart state
  const [cart, setCart] = useState<OrderItem[]>([]);

  const categories = ['All', 'Gujarati Royal Thali', 'Mughlai & Heritage', 'Starters & Kebabs', 'Royal Desserts', 'Royal Mocktails & Beverages'];

  const filteredMenuItems = menuItems.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1, category: item.category }];
    });
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.qty + delta;
            return newQty > 0 ? { ...i, qty: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as OrderItem[]
    );
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert('Please add items to the order cart first.');
      return;
    }

    if (paymentMethod === 'Room Charge' && !selectedRoomNumber) {
      alert('Please select a suite number for posting room charges.');
      return;
    }

    onCreateOrder({
      outlet: selectedOutlet,
      tableNumber: selectedTable,
      roomNumber: selectedRoomNumber || undefined,
      guestName: guestName || (selectedRoomNumber ? rooms.find(r => r.number === selectedRoomNumber)?.currentGuestName : 'Walk-in Royal Guest'),
      items: cart,
      totalAmount: cartTotal,
      status: 'Received',
      paymentMethod
    });

    setCart([]);
    setSelectedRoomNumber('');
    setGuestName('');
    alert(`Royal Dining Order successfully sent to ${selectedOutlet} Kitchen!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Outlet Selector */}
      <div className="bg-stone-900/80 p-4 rounded-xl border border-amber-900/30 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
            <UtensilsCrossed className="w-5 h-5 text-amber-400" /> Royal Dining POS & Kitchen Sync
          </h2>
          <p className="text-xs text-stone-400">Manage orders for Deep Mahal, Sheesh Mahal & Jal Mahal Terrace</p>
        </div>

        {/* Outlet Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {(['Deep Mahal', 'Sheesh Mahal', 'Jal Mahal Terrace', 'In-Room Royal Dining'] as OutletName[]).map((outlet) => (
            <button
              key={outlet}
              onClick={() => setSelectedOutlet(outlet)}
              className={`px-3.5 py-2 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer ${
                selectedOutlet === outlet
                  ? 'bg-amber-800 text-amber-100 border border-amber-500/50 shadow'
                  : 'bg-stone-950 text-stone-300 hover:bg-stone-800'
              }`}
            >
              {outlet}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Menu Items Grid (Left 7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-amber-700 text-amber-100 border border-amber-400/50 shadow'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Items Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredMenuItems.map((item) => (
              <div
                key={item.id}
                className="bg-stone-900 border border-amber-900/30 hover:border-amber-500/60 p-3.5 rounded-xl flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif font-bold text-amber-100 text-sm">{item.name}</span>
                    <span className="text-amber-300 font-mono font-bold text-sm">₹{item.price}</span>
                  </div>

                  <p className="text-[11px] text-stone-400 mb-2 line-clamp-2">{item.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-800/60">
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    🌱 100% Royal Veg
                  </span>

                  <button
                    onClick={() => addToCart(item)}
                    className="bg-amber-900/80 hover:bg-amber-700 text-amber-100 text-xs px-3 py-1 rounded-lg flex items-center gap-1 border border-amber-600/40 cursor-pointer transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Order Cart (Right 5 Cols) */}
        <div className="lg:col-span-5 bg-stone-900 border border-amber-800/50 rounded-xl p-4 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="font-serif font-bold text-amber-100 text-base flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" /> Active Royal Order Basket
              </h3>
              <span className="text-xs bg-amber-950 text-amber-300 px-2 py-0.5 rounded font-mono border border-amber-800/60">
                {selectedOutlet}
              </span>
            </div>

            {/* Table / Room Details */}
            <div className="grid grid-cols-2 gap-2 my-3 text-xs">
              <div>
                <label className="block text-[11px] text-stone-400 mb-1">Table / Gazebo</label>
                <input
                  type="text"
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(e.target.value)}
                  placeholder="e.g. Table 4"
                  className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-stone-400 mb-1">Charge to Suite #</label>
                <select
                  value={selectedRoomNumber}
                  onChange={(e) => {
                    setSelectedRoomNumber(e.target.value);
                    const rmObj = rooms.find(r => r.number === e.target.value);
                    if (rmObj?.currentGuestName) setGuestName(rmObj.currentGuestName);
                  }}
                  className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200 outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="">Walk-in / Cash</option>
                  {rooms.filter(r => r.status === 'Occupied').map(r => (
                    <option key={r.id} value={r.number}>
                      Suite #{r.number} ({r.currentGuestName})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="space-y-2 max-h-56 overflow-y-auto my-2 pr-1">
              {cart.length === 0 ? (
                <div className="text-center py-10 text-stone-500 text-xs">
                  Basket is empty. Select items from the menu to build the order.
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="bg-stone-950 p-2.5 rounded-lg border border-stone-800 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-amber-200">{item.name}</p>
                      <p className="text-[11px] text-stone-400">₹{item.price} x {item.qty} = <span className="text-amber-300 font-bold">₹{item.price * item.qty}</span></p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQty(item.id, -1)}
                        className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono font-bold text-amber-300 w-4 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateCartQty(item.id, 1)}
                        className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Payment & Submit */}
          <div className="pt-3 border-t border-stone-800 space-y-3">
            <div className="flex justify-between items-center text-sm font-serif font-bold text-amber-200">
              <span>Grand Total</span>
              <span className="text-lg text-amber-300">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>

            <div>
              <label className="block text-[11px] text-stone-400 mb-1">Bill Settlement Method</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Room Charge')}
                  className={`py-1.5 rounded text-center border cursor-pointer font-medium ${
                    paymentMethod === 'Room Charge'
                      ? 'bg-amber-900/80 text-amber-100 border-amber-500'
                      : 'bg-stone-950 text-stone-400 border-stone-800'
                  }`}
                >
                  Room Folio Charge
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI / Cash / Card')}
                  className={`py-1.5 rounded text-center border cursor-pointer font-medium ${
                    paymentMethod === 'UPI / Cash / Card'
                      ? 'bg-amber-900/80 text-amber-100 border-amber-500'
                      : 'bg-stone-950 text-stone-400 border-stone-800'
                  }`}
                >
                  Direct UPI / Cash
                </button>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={cart.length === 0}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" /> Dispatch Order to Kitchen
            </button>
          </div>
        </div>
      </div>

      {/* Kitchen Display System (KDS) Active Orders Feed */}
      <div className="bg-stone-900/90 border border-amber-900/40 rounded-xl p-4 space-y-3 shadow-lg">
        <h3 className="text-base font-serif font-bold text-amber-100 flex items-center gap-2">
          <ChefHat className="w-5 h-5 text-amber-400" /> Kitchen Display System (KDS Live Feed)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {orders.map((ord) => (
            <div key={ord.id} className="bg-stone-950 border border-stone-800 p-3.5 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-200 font-mono">#{ord.id}</span>
                <span className="bg-stone-800 text-amber-300 text-[10px] px-2 py-0.5 rounded font-mono">
                  {ord.outlet} ({ord.tableNumber})
                </span>
              </div>

              {ord.roomNumber && (
                <p className="text-xs text-amber-400 font-semibold">
                  Post to Suite #{ord.roomNumber} ({ord.guestName})
                </p>
              )}

              <div className="space-y-1 text-xs text-stone-300 py-1 border-y border-stone-800">
                {ord.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-[11px]">
                    <span>{it.qty}x {it.name}</span>
                    <span className="font-mono text-stone-400">₹{it.price * it.qty}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="font-bold text-amber-300 font-mono">₹{ord.totalAmount}</span>
                <select
                  value={ord.status}
                  onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as any)}
                  className="bg-stone-900 text-stone-200 text-xs rounded border border-amber-900/60 px-2 py-1 outline-none cursor-pointer"
                >
                  <option value="Received">Received</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Served">Served</option>
                  <option value="Billed">Billed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
