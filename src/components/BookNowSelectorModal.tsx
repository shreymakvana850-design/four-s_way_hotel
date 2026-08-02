import React from 'react';
import { X, Hotel, UtensilsCrossed, Utensils, Sparkles, ChevronRight, Crown } from 'lucide-react';

interface BookNowSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: 'room' | 'table' | 'food') => void;
}

export const BookNowSelectorModal: React.FC<BookNowSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectOption,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-stone-900 border border-amber-600/60 rounded-2xl p-6 shadow-2xl text-stone-100 my-auto animate-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-amber-200 p-1"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/50 rounded-full flex items-center justify-center text-amber-400 mx-auto mb-3">
            <Crown className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-2xl text-amber-100">
            Four's way Hotel Booking
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            Choose what you would like to book or order today
          </p>
        </div>

        <div className="space-y-3">
          {/* Option 1: Room Booking */}
          <button
            onClick={() => {
              onSelectOption('room');
              onClose();
            }}
            className="w-full bg-stone-950 hover:bg-amber-950/40 border border-stone-800 hover:border-amber-600/60 p-4 rounded-xl text-left flex items-center justify-between group transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Hotel className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-amber-100 text-sm group-hover:text-amber-300">
                  Room & Royal Suite Booking
                </h4>
                <p className="text-[11px] text-stone-400">
                  Maharaja, Maharani, Suryavanshi & Heritage Suites
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </button>

          {/* Option 2: Table Booking */}
          <button
            onClick={() => {
              onSelectOption('table');
              onClose();
            }}
            className="w-full bg-stone-950 hover:bg-amber-950/40 border border-stone-800 hover:border-amber-600/60 p-4 rounded-xl text-left flex items-center justify-between group transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-amber-100 text-sm group-hover:text-amber-300">
                  Table Reservation
                </h4>
                <p className="text-[11px] text-stone-400">
                  Deep Mahal, Sheesh Mahal & Jal Mahal Poolside
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </button>

          {/* Option 3: Food Ordering */}
          <button
            onClick={() => {
              onSelectOption('food');
              onClose();
            }}
            className="w-full bg-stone-950 hover:bg-amber-950/40 border border-stone-800 hover:border-amber-600/60 p-4 rounded-xl text-left flex items-center justify-between group transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-amber-100 text-sm group-hover:text-amber-300">
                  Food Ordering Menu
                </h4>
                <p className="text-[11px] text-stone-400">
                  Rajasthani, Punjabi, Gujarati, South Indian, Chinese & Foreign
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
};
