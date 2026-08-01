import React from 'react';
import { WEDDING_VENUES_DATA, WeddingVenue } from '../data/websiteData';
import { CalendarDays, Crown, Users, Sparkles, CheckCircle2, Heart } from 'lucide-react';

interface WeddingsSectionProps {
  onInquireWedding: (venue: WeddingVenue) => void;
}

export const WeddingsSection: React.FC<WeddingsSectionProps> = ({ onInquireWedding }) => {
  return (
    <section id="weddings" className="py-20 bg-stone-900 text-stone-100 relative border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-serif uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> Royal Destination Weddings
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100">
            Fairytale Palace Weddings & Celebrations
          </h2>
          <p className="text-stone-300 text-sm">
            Host your wedding amidst royal luxury. From grand processions and flower-bedecked mandaps to starlight gala banquets in Dubai.
          </p>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WEDDING_VENUES_DATA.map((venue) => (
            <div
              key={venue.id}
              className="bg-stone-950 border border-amber-900/40 hover:border-amber-500/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 bg-amber-500 text-stone-950 text-xs font-serif font-bold px-3 py-1 rounded-full shadow flex items-center gap-1">
                    <Users className="w-3 h-3" /> {venue.capacity}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[10px] text-amber-400 font-serif uppercase tracking-widest block font-bold">
                    {venue.type}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-amber-100">{venue.name}</h3>

                  <p className="text-stone-300 text-xs leading-relaxed">
                    {venue.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <p className="text-[11px] font-serif font-bold text-amber-300">Venue Highlights:</p>
                    <ul className="space-y-1 text-[11px] text-stone-300">
                      {venue.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-amber-400 flex-shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onInquireWedding(venue)}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-serif font-bold text-xs py-2.5 rounded-xl shadow cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Inquire for {venue.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
