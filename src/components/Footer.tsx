import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Globe } from 'lucide-react';
import logoImg from '../assets/images/fours_way_royal_logo_1785217821041.jpg';

interface FooterProps {
  onSelectView?: (view: 'home' | 'rooms' | 'dining' | 'weddings' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectView }) => {
  return (
    <footer className="relative bg-linear-to-b from-[#140a06] via-[#1c0f08] to-[#0a0503] text-stone-300 border-t-2 border-amber-600/40 font-sans text-xs pt-16 pb-8 overflow-hidden shadow-2xl">
      {/* Royal Ambient Glows & Gold Shimmer Line */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,119,6,0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(251,191,36,0.8)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-amber-500/60 shadow-xl flex items-center justify-center bg-stone-900 shrink-0 ring-4 ring-amber-500/20">
                <img
                  src={logoImg}
                  alt="Four's Way Hotel Logo"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-serif font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-100 via-amber-200 to-amber-400 text-base leading-tight block tracking-wider">
                FOUR'S WAY HOTEL
              </span>
            </div>

            <p className="text-stone-300/90 leading-relaxed text-[11px] font-light">
              An iconic 50-year royal luxury hotel located in the heart of Dubai, UAE, offering world-class hospitality and regal accommodations.
            </p>

            <div className="flex items-center gap-3 text-amber-400">
              <a href="#" className="hover:text-amber-200 hover:scale-105 transition-all p-2 bg-stone-900/90 hover:bg-amber-950/70 rounded-xl border border-amber-500/30 shadow-md">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-amber-200 hover:scale-105 transition-all p-2 bg-stone-900/90 hover:bg-amber-950/70 rounded-xl border border-amber-500/30 shadow-md">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-amber-200 hover:scale-105 transition-all p-2 bg-stone-900/90 hover:bg-amber-950/70 rounded-xl border border-amber-500/30 shadow-md">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-amber-300 text-sm tracking-wide uppercase border-b border-amber-800/40 pb-1.5 inline-block">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-stone-300/90 text-xs">
              <li>
                <button
                  onClick={() => onSelectView ? onSelectView('home') : window.location.href = '#'}
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer flex items-center gap-1.5 group"
                >
                  <span className="text-amber-500/60 group-hover:text-amber-400">❖</span> Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView ? onSelectView('rooms') : window.location.href = '#'}
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer flex items-center gap-1.5 group"
                >
                  <span className="text-amber-500/60 group-hover:text-amber-400">❖</span> Suites & Rooms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView ? onSelectView('dining') : window.location.href = '#dining'}
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer flex items-center gap-1.5 group"
                >
                  <span className="text-amber-500/60 group-hover:text-amber-400">❖</span> Fine Dining
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView ? onSelectView('contact') : window.location.href = '#contact'}
                  className="hover:text-amber-200 transition-colors text-left font-semibold text-amber-400 cursor-pointer flex items-center gap-1.5 group"
                >
                  <span className="text-amber-400">❖</span> Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-amber-300 text-sm tracking-wide uppercase border-b border-amber-800/40 pb-1.5 inline-block">
              Hotel Reservations
            </h4>
            <ul className="space-y-2 text-stone-300/90 text-xs font-mono">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" /> +91 92743 96643
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 font-sans shrink-0" /> infofourswayhotel@gmail.com
              </li>
            </ul>
          </div>

          {/* Address */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-amber-300 text-sm tracking-wide uppercase border-b border-amber-800/40 pb-1.5 inline-block">
              Location
            </h4>
            <p className="text-stone-300/90 text-xs leading-relaxed">
              Downtown Luxury District, Dubai, United Arab Emirates.
            </p>
            <p className="text-[11px] text-amber-300 font-serif font-bold flex items-center gap-1.5 bg-amber-950/60 px-3 py-1.5 rounded-lg border border-amber-700/50 w-max shadow-inner">
              <span>★ 50 Years of Royal Luxury</span>
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-amber-950/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Four's Way Hotel Dubai. All Royal Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-amber-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-300 transition-colors">Terms of Stay</a>
            <a href="#" className="hover:text-amber-300 transition-colors">GSTR-1 Tax Invoicing</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
