import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Globe } from 'lucide-react';
import logoImg from '../assets/images/fours_way_logo_1785079291655.jpg';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-amber-900/40 font-sans text-xs pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-amber-500/50 shadow-md flex items-center justify-center bg-stone-900 shrink-0 ring-2 ring-amber-500/20">
                <img
                  src={logoImg}
                  alt="Four's Way Hotel Logo"
                  className="w-full h-full object-cover object-center scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-serif font-bold text-amber-100 text-base leading-tight block">
                FOUR'S WAY HOTEL
              </span>
            </div>

            <p className="text-stone-400 leading-relaxed text-[11px]">
              An iconic 50-year royal luxury hotel located in the heart of Dubai, UAE, offering world-class hospitality and regal accommodations.
            </p>

            <div className="flex items-center gap-3 text-amber-400">
              <a href="#" className="hover:text-amber-300 p-1.5 bg-stone-900 rounded-lg border border-stone-800">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-amber-300 p-1.5 bg-stone-900 rounded-lg border border-stone-800">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-amber-300 p-1.5 bg-stone-900 rounded-lg border border-stone-800">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-amber-200 text-sm">Quick Navigation</h4>
            <ul className="space-y-2 text-stone-400 text-xs">
              <li><a href="#home" className="hover:text-amber-300 transition-colors">Home Page</a></li>
              <li><a href="#welcome" className="hover:text-amber-300 transition-colors">Welcome Overview</a></li>
              <li><a href="#services" className="hover:text-amber-300 transition-colors">Our Services</a></li>
              <li><a href="#why-us" className="hover:text-amber-300 transition-colors">Why Choose Us</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-amber-200 text-sm">Hotel Reservations</h4>
            <ul className="space-y-2 text-stone-400 text-xs font-mono">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" /> +91 92743 96643
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 font-sans" /> infofourswayhotel@gmail.com
              </li>
            </ul>
          </div>

          {/* Address */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-amber-200 text-sm">Location</h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Downtown Luxury District, Dubai, United Arab Emirates.
            </p>
            <p className="text-[10px] text-amber-400/80 font-mono">
              ★ 50 Years of Royal Luxury
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Four's Way Hotel Dubai. All Royal Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Stay</a>
            <a href="#" className="hover:underline">GSTR-1 Tax Invoicing</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
