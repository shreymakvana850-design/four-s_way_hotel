import React, { useState } from 'react';
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

import {
  Suite,
  DiningVenue,
  RoomRecord,
  CustomerRecord,
  FoodOrder,
  INITIAL_ROOMS_DATA,
  INITIAL_CUSTOMERS_DATA,
} from './data/websiteData';

export default function App() {
  // Navigation View State ('home' active by default)
  const [currentView, setCurrentView] = useState<'home' | 'weddings'>('home');

  // Modals Visibility
  const [isBookNowSelectorOpen, setIsBookNowSelectorOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isFoodOrderingOpen, setIsFoodOrderingOpen] = useState(false);
  const [isManagementOpen, setIsManagementOpen] = useState(false);

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

  const handleOpenTableReservation = (venue: DiningVenue) => {
    setSelectedDiningVenue(venue);
    setIsTableModalOpen(true);
  };

  // State Updates from Modals
  const handleBookingConfirmed = (customer: CustomerRecord) => {
    setCustomers((prev) => [customer, ...prev]);
  };

  const handleTableReserved = (customer: CustomerRecord) => {
    setCustomers((prev) => [customer, ...prev]);
  };

  const handleFoodOrderPlaced = (order: FoodOrder, customer: CustomerRecord) => {
    setFoodOrders((prev) => [order, ...prev]);
    setCustomers((prev) => [customer, ...prev]);
  };

  // Management State Handlers
  const handleUpdateRoomStatus = (roomId: string, newStatus: RoomRecord['status']) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, status: newStatus } : r))
    );
  };

  const handleAddRoom = (newRoom: RoomRecord) => {
    setRooms((prev) => [...prev, newRoom]);
  };

  const handleUpdateCustomerPayment = (customerId: string, newStatus: 'Paid' | 'Pending') => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, paymentStatus: newStatus } : c))
    );
  };

  const handleAddCustomer = (newCust: CustomerRecord) => {
    setCustomers((prev) => [newCust, ...prev]);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: FoodOrder['orderStatus']) => {
    setFoodOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-stone-100 font-sans selection:bg-[#C8A45D] selection:text-black">
      {/* Navigation Header */}
      <Navbar
        onOpenBookNowSelector={handleOpenBookNowSelector}
        onOpenManagement={() => setIsManagementOpen(true)}
        onOpenFoodOrdering={() => setIsFoodOrderingOpen(true)}
        currentView={currentView}
        onSelectView={(view) => setCurrentView(view)}
      />

      {currentView === 'weddings' ? (
        <>
          <WeddingsPage onOpenBookNow={handleOpenBookNowSelector} />
          <Footer />
        </>
      ) : (
        <>
          {/* Hero Banner with Quick Booking Bar */}
          <HeroSection onSearch={handleHeroSearch} />

          {/* Welcome & Overview Section with Services & Why Choose Us */}
          <WelcomeSection onOpenBookNow={handleOpenBookNowSelector} />

          {/* Suites & Rooms Showcase */}
          <SuitesSection onSelectSuite={handleSelectSuite} />

          {/* Fine Dining & Restaurants */}
          <DiningSection onOpenTableReservation={handleOpenTableReservation} />

          {/* Royal Weddings Teaser */}
          <WeddingsSection onInquireWedding={() => setCurrentView('weddings')} />

          {/* Royal Experiences & Amenities */}
          <ExperienceSection />

          {/* Guest Reviews & Testimonials */}
          <TestimonialsSection />

          {/* Direct Contact & Location */}
          <ContactSection />

          {/* Footer */}
          <Footer />
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

      {/* Food Ordering Modal (Rajasthani, Punjabi, Gujarati, South Indian, Chinese, Foreign) */}
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
    </div>
  );
}

