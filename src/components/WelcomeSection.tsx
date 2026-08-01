import React from 'react';
import {
  Crown,
  Sparkles,
  CheckCircle2,
  Hotel,
  UtensilsCrossed,
  CalendarCheck,
  Building,
  Wifi,
  Clock,
  ConciergeBell,
  Sparkle,
  Car,
  Plane,
  ShieldCheck,
  Smile,
  Zap,
  Award,
  HeartHandshake
} from 'lucide-react';

export const WelcomeSection: React.FC<{ onOpenBookNow?: () => void }> = ({ onOpenBookNow }) => {
  const services = [
    { title: 'Luxury & Deluxe Rooms', icon: Hotel },
    { title: 'Family Suites', icon: Crown },
    { title: 'Restaurant & Fine Dining', icon: UtensilsCrossed },
    { title: 'Online Room Booking', icon: CalendarCheck },
    { title: 'Banquet & Conference Hall', icon: Building },
    { title: 'Free High-Speed Wi-Fi', icon: Wifi },
    { title: '24×7 Front Desk Support', icon: Clock },
    { title: 'Room Service', icon: ConciergeBell },
    { title: 'Housekeeping', icon: Sparkle },
    { title: 'Secure Parking', icon: Car },
    { title: 'Airport Pickup & Drop (Optional)', icon: Plane },
  ];

  const whyChooseUs = [
    { title: 'Comfortable and Modern Accommodation', icon: ShieldCheck },
    { title: 'Affordable Luxury', icon: Award },
    { title: 'Professional & Friendly Staff', icon: Smile },
    { title: 'Safe and Secure Environment', icon: ShieldCheck },
    { title: 'Premium Guest Experience', icon: HeartHandshake },
    { title: 'Easy Online Booking', icon: CalendarCheck },
    { title: 'Fast Check-In & Check-Out', icon: Zap },
    { title: 'Excellent Customer Support', icon: Clock },
  ];

  return (
    <section id="welcome" className="py-16 bg-stone-950 text-stone-100 relative border-t border-amber-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Main Welcome Header & Paragraphs */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-serif uppercase tracking-widest bg-amber-950/80 px-4 py-1.5 rounded-full border border-amber-800/40 shadow-inner">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>50 Years of Royal Luxury • Dubai</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 leading-tight">
            Welcome to Four's Way Hotel
          </h1>

          <h2 className="text-xl sm:text-2xl font-serif text-amber-400 font-semibold tracking-wide">
            Luxury, Comfort & Memorable Hospitality
          </h2>

          <div className="space-y-4 text-stone-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-sans">
            <p>
              Welcome to <strong className="text-amber-200">Four's Way Hotel</strong>, where elegance meets exceptional hospitality. Whether you're traveling for business, a family vacation, or a relaxing getaway, we are dedicated to making every stay comfortable, convenient, and unforgettable.
            </p>
            <p>
              Our hotel offers modern rooms, fine dining, outstanding customer service, and premium facilities designed to meet the needs of every guest. From seamless check-in to personalized room service, every detail is focused on providing a world-class experience.
            </p>
          </div>
        </div>

        {/* Our Services Grid */}
        <div id="services" className="space-y-8 scroll-mt-24">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-400" />
              Our Services
            </h3>
            <p className="text-xs text-stone-400 font-sans">Comprehensive world-class amenities designed for your comfort</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {services.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-stone-900/90 border border-amber-900/40 hover:border-amber-500/60 p-4 rounded-xl flex items-center gap-3.5 shadow-lg transition-all hover:-translate-y-0.5 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-stone-950 transition-all shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-serif font-semibold text-stone-200 group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Choose Four's Way Hotel */}
        <div id="why-us" className="space-y-8 scroll-mt-24">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200 flex items-center justify-center gap-2">
              <Crown className="w-6 h-6 text-amber-400" />
              Why Choose Four's Way Hotel?
            </h3>
            <p className="text-xs text-stone-400 font-sans">Unmatched standards of service, safety, and modern comfort</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyChooseUs.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-stone-900/80 border border-amber-800/30 hover:border-amber-400/50 p-5 rounded-xl space-y-3 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-serif font-bold text-amber-100 leading-snug">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Closing Highlight Banner */}
<<<<<<< HEAD
        <div className="bg-gradient-to-r from-amber-950/80 via-amber-900/40 to-amber-950/80 border border-amber-500/40 p-8 rounded-2xl text-center space-y-4 shadow-2xl backdrop-blur-sm">
=======
        <div className="bg-linear-to-r from-amber-950/80 via-amber-900/40 to-amber-950/80 border border-amber-500/40 p-8 rounded-2xl text-center space-y-4 shadow-2xl backdrop-blur-sm">
>>>>>>> 086ae4c44501e58da82521f9dca7fa9f0b513b99
          <Crown className="w-8 h-8 text-amber-400 mx-auto animate-pulse" />
          <p className="text-lg sm:text-2xl font-serif font-bold text-amber-100 max-w-2xl mx-auto leading-relaxed">
            Experience comfort, elegance, and hospitality like never before at Four's Way Hotel.
          </p>
          {onOpenBookNow && (
            <button
              onClick={onOpenBookNow}
<<<<<<< HEAD
              className="mt-2 inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-serif font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer"
=======
              className="mt-2 inline-flex items-center gap-2 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-serif font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer"
>>>>>>> 086ae4c44501e58da82521f9dca7fa9f0b513b99
            >
              <span>Book Your Stay Today</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
