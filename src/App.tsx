import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WelcomeSection } from './components/WelcomeSection';
import { SuitesSection } from './components/SuitesSection';
import { DiningSection } from './components/DiningSection';
import { WeddingsSection } from './components/WeddingsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { WeddingsPage } from './components/WeddingsPage';
import { Footer } from './components/Footer';

import { BookingModal } from './components/BookingModal';
import { TableReservationModal } from './components/TableReservationModal';
import { FoodOrderingModal } from './components/FoodOrderingModal';
import { ManagementModal } from './components/ManagementModal';
import { BookNowSelectorModal } from './components/BookNowSelectorModal';
import { AIAssistantModal } from './components/AIAssistantModal';

import { getApiUrl } from './config/api';

import {
  Suite,
  DiningVenue,
  RoomRecord,
  CustomerRecord,
  FoodOrder,
  INITIAL_ROOMS_DATA,
  INITIAL_CUSTOMERS_DATA,
} from './data/websiteData';

type AppView = 'home' | 'rooms' | 'dining' | 'weddings' | 'contact';

export default function App() {
  // Navigation View State ('home' active by default)
  const [currentView, setCurrentView] = useState<AppView>('home');

  // Modals Visibility
  const [isBookNowSelectorOpen, setIsBookNowSelectorOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isFoodOrderingOpen, setIsFoodOrderingOpen] = useState(false);
  const [isManagementOpen, setIsManagementOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  // Selections & Parameters
  const [selectedSuite, setSelectedSuite] = useState<Suite | null>(null);
  const [searchParams, setSearchParams] = useState<{ checkIn: string; checkOut: string; suite: string; guests: number } | null>(null);
  const [selectedDiningVenue, setSelectedDiningVenue] = useState<DiningVenue | null>(null);

  // Application Dynamic State (Rooms, Customers, Food Orders)
  const [rooms, setRooms] = useState<RoomRecord[]>(INITIAL_ROOMS_DATA);
  const [customers, setCustomers] = useState<CustomerRecord[]>(INITIAL_CUSTOMERS_DATA);
  const [foodOrders, setFoodOrders] = useState<FoodOrder[]>([
    {
      id: 'ORD-108293',
      guestName: 'Maharaval Digvijay Singh',
      phone: '+91 98980 11223',
      deliveryType: 'Room Delivery',
      roomOrTableNo: 'Room 101',
      items: [
        {
          menuItem: {
            id: 'raj-1',
            name: 'Royal Dal Baati Churma',
            category: 'Rajasthani',
            price: 450,
            isVeg: true,
            description: 'Traditional wood-baked wheat baatis with Panchmel dal',
            image: '',
          },
          quantity: 2,
        },
      ],
      subtotal: 900,
      gst: 45,
      totalAmount: 945,
      paymentMethod: 'Online Payment (UPI/Card)',
      paymentStatus: 'Paid',
      orderStatus: 'Preparing',
      timestamp: '08:30 PM, 2026-07-26',
    },
  ]);

  // Fetch live database records on mount
  useEffect(() => {
    async function loadDbData() {
      try {
        const resRooms = await fetch(getApiUrl('/api/rooms'));
        if (resRooms.ok) {
          const dataRooms = await resRooms.json();
          if (Array.isArray(dataRooms) && dataRooms.length > 0) {
            setRooms(dataRooms.map((r: any) => ({
              id: r.id || r._id,
              roomNumber: r.number || r.roomNumber,
              suiteName: r.category || r.suiteName || 'Maharaja Suite',
              floor: r.floor || '1st Floor',
              status: r.status || 'Available',
              tariffPerNight: r.pricePerNight || r.tariffPerNight || 25000,
            })));
          }
        }
      } catch (err) {
        console.warn('API /api/rooms fallback to local state:', err);
      }

      try {
        const resGuests = await fetch(getApiUrl('/api/guests'));
        if (resGuests.ok) {
          const dataGuests = await resGuests.json();
          if (Array.isArray(dataGuests) && dataGuests.length > 0) {
            setCustomers(dataGuests.map((g: any) => ({
              id: g.id || g._id,
              name: g.name || g.guestName || 'Royal Guest',
              guestName: g.name || g.guestName || 'Royal Guest',
              phone: g.phone,
              email: g.email,
              bookingType: 'Room Stay',
              details: `Room ${g.roomNumber} (${g.checkIn} to ${g.checkOut})`,
              amount: g.totalAmount || 25000,
              paymentStatus: g.status === 'CheckedIn' ? 'Paid' : 'Pending',
              paymentMethod: 'Online Payment (UPI/Card)',
              date: g.checkIn || new Date().toISOString().split('T')[0],
              timestamp: g.checkIn || new Date().toISOString(),
            })));
          }
        }
      } catch (err) {
        console.warn('API /api/guests fallback to local state:', err);
      }
    }

    loadDbData();
  }, []);

  // Handlers for Navbar & Book Now
  const handleOpenBookNowSelector = () => {
    setIsBookNowSelectorOpen(true);
  };

  const handleSelectBookNowOption = (option: 'room' | 'table' | 'food') => {
    if (option === 'room') {
      setSelectedSuite(null);
      setSearchParams(null);
      setIsBookingOpen(true);
    } else if (option === 'table') {
      setSelectedDiningVenue(null);
      setIsTableModalOpen(true);
    } else if (option === 'food') {
      setIsFoodOrderingOpen(true);
    }
  };

  const handleSelectSuite = (suite: Suite) => {
    setSelectedSuite(suite);
    setSearchParams(null);
    setIsBookingOpen(true);
  };

  const handleHeroSearch = (params: { checkIn: string; checkOut: string; suite: string; guests: number }) => {
    setSearchParams(params);
    setSelectedSuite(null);
    setIsBookingOpen(true);
  };

  const handleSelectView = (view: AppView) => {
    setCurrentView(view);
  };

  const handleOpenTableReservation = (venue: DiningVenue) => {
    setSelectedDiningVenue(venue);
    setIsTableModalOpen(true);
  };

  // State Updates from Modals & API Sync
  const handleBookingConfirmed = async (customer: CustomerRecord) => {
    setCustomers((prev) => [customer, ...prev]);
    try {
      await fetch(getApiUrl('/api/guests'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customer.name,
          phone: customer.phone,
          email: customer.email || 'guest@khirasarapalace.in',
          idType: 'Aadhaar Card',
          idNumber: 'AUTO-GEN-ID',
          roomNumber: '101',
          checkIn: new Date().toISOString().split('T')[0],
          checkOut: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
          totalAmount: customer.amount,
          status: 'CheckedIn',
          vipTier: 'Royal VIP',
          notes: customer.details,
        }),
      });
    } catch (e) {
      console.warn('Could not post guest to DB:', e);
    }
  };

  const handleTableReserved = async (customer: CustomerRecord) => {
    setCustomers((prev) => [customer, ...prev]);
  };

  const handleFoodOrderPlaced = async (order: FoodOrder, customer: CustomerRecord) => {
    setFoodOrders((prev) => [order, ...prev]);
    setCustomers((prev) => [customer, ...prev]);
    try {
      await fetch(getApiUrl('/api/orders'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          outlet: 'In-Room Royal Dining',
          tableNumber: order.roomOrTableNo,
          guestName: order.guestName,
          totalAmount: order.totalAmount,
          status: 'Received',
          paymentMethod: 'Room Charge',
          items: order.items.map((i) => ({
            id: i.menuItem.id,
            name: i.menuItem.name,
            price: i.menuItem.price,
            qty: i.quantity,
            category: i.menuItem.category,
          })),
        }),
      });
    } catch (e) {
      console.warn('Could not post food order to DB:', e);
    }
  };

  // Management State Handlers
  const handleUpdateRoomStatus = async (roomId: string, newStatus: RoomRecord['status']) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, status: newStatus } : r))
    );
    try {
      await fetch(getApiUrl(`/api/rooms/${roomId}/status`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (e) {
      console.warn('Could not sync room status to DB:', e);
    }
  };

  const handleAddRoom = async (newRoom: RoomRecord) => {
    setRooms((prev) => [...prev, newRoom]);
    try {
      await fetch(getApiUrl('/api/rooms'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          number: newRoom.roomNumber,
          category: newRoom.suiteName,
          floor: newRoom.floor,
          status: newRoom.status,
          pricePerNight: newRoom.tariffPerNight,
          capacity: 2,
          features: ['Heritage Royal Terrace', 'Antique Teakwood Furniture'],
        }),
      });
    } catch (e) {
      console.warn('Could not add room to DB:', e);
    }
  };

  const handleUpdateCustomerPayment = (customerId: string, newStatus: 'Paid' | 'Pending') => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, paymentStatus: newStatus } : c))
    );
  };

  const handleAddCustomer = (newCust: CustomerRecord) => {
    setCustomers((prev) => [newCust, ...prev]);
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: FoodOrder['orderStatus']) => {
    setFoodOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
    try {
      await fetch(getApiUrl(`/api/orders/${orderId}/status`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (e) {
      console.warn('Could not sync order status to DB:', e);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-stone-100 font-sans selection:bg-[#C8A45D] selection:text-black">
      {/* Navigation Header */}
      <Navbar
        onOpenBookNowSelector={handleOpenBookNowSelector}
        onOpenManagement={() => setIsManagementOpen(true)}
        onOpenFoodOrdering={() => setIsFoodOrderingOpen(true)}
        onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
        currentView={currentView}
        onSelectView={handleSelectView}
      />

      {currentView === 'rooms' ? (
        <>
          <SuitesSection
            onSelectSuite={handleSelectSuite}
            onGoBack={() => setCurrentView('home')}
            isStandalonePage={true}
          />
          <Footer onSelectView={setCurrentView} />
        </>
      ) : currentView === 'dining' ? (
        <>
          <DiningSection
            onOpenTableReservation={handleOpenTableReservation}
            onGoBack={() => setCurrentView('home')}
            onOpenFoodOrdering={() => setIsFoodOrderingOpen(true)}
            isStandalonePage={true}
          />
          <Footer onSelectView={setCurrentView} />
        </>
      ) : currentView === 'weddings' ? (
        <>
          <WeddingsPage onOpenBookNow={handleOpenBookNowSelector} onGoBack={() => setCurrentView('home')} />
          <Footer onSelectView={setCurrentView} />
        </>
      ) : currentView === 'contact' ? (
        <>
          <div className="pt-20 sm:pt-24 bg-stone-950">
            <ContactSection isStandalonePage={true} onGoBack={() => setCurrentView('home')} />
          </div>
          <Footer onSelectView={setCurrentView} />
        </>
      ) : (
        <>
          {/* Hero Banner with Quick Booking Bar */}
          <HeroSection onSearch={handleHeroSearch} />

          {/* Welcome & Overview Section with Services & Why Choose Us */}
          <WelcomeSection onOpenBookNow={handleOpenBookNowSelector} />

          {/* Royal Experiences & Amenities */}
          <ExperienceSection />

          {/* Guest Reviews & Testimonials */}
          <TestimonialsSection />

          {/* Footer */}
          <Footer onSelectView={setCurrentView} />
        </>
      )}

      {/* Master Book Now Selector Modal */}
      <BookNowSelectorModal
        isOpen={isBookNowSelectorOpen}
        onClose={() => setIsBookNowSelectorOpen(false)}
        onSelectOption={handleSelectBookNowOption}
      />

      {/* Room Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedSuite={selectedSuite}
        searchParams={searchParams}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* Table Reservation Modal */}
      <TableReservationModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        venue={selectedDiningVenue}
        onTableReserved={handleTableReserved}
      />

      {/* Food Ordering Modal */}
      <FoodOrderingModal
        isOpen={isFoodOrderingOpen}
        onClose={() => setIsFoodOrderingOpen(false)}
        onOrderPlaced={handleFoodOrderPlaced}
      />

      {/* Room Management & Customer Management Portal */}
      <ManagementModal
        isOpen={isManagementOpen}
        onClose={() => setIsManagementOpen(false)}
        rooms={rooms}
        customers={customers}
        orders={foodOrders}
        onUpdateRoomStatus={handleUpdateRoomStatus}
        onAddRoom={handleAddRoom}
        onUpdateCustomerPayment={handleUpdateCustomerPayment}
        onAddCustomer={handleAddCustomer}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      {/* Royal Gemini AI Concierge & Rate Optimizer Assistant */}
      <AIAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
      />
    </div>
  );
}
