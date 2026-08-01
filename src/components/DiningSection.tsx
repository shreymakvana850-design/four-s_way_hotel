import React from 'react';
import { DINING_DATA, DiningVenue } from '../data/websiteData';
import { UtensilsCrossed, Crown, Clock, CheckCircle2, Calendar } from 'lucide-react';

interface DiningSectionProps {
  onOpenTableReservation: (venue: DiningVenue) => void;
}

export const DiningSection: React.FC<DiningSectionProps> = ({ onOpenTableReservation }) => {
  return (
    <section id="dining" className="py-20 bg-stone-950 text-stone-100 relative border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-serif uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
            <UtensilsCrossed className="w-3.5 h-3.5" /> Royal Gastronomy
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100">
            Royal Dining Destinations
          </h2>
          <p className="text-stone-300 text-sm">
            Experience authentic Kathiyawadi royal recipes, Mughlai banquets, and starlight fine dining crafted by hereditary palace chefs.
          </p>
        </div>

        {/* Venues Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DINING_DATA.map((venue) => (
            <div
              key={venue.id}
              className="bg-stone-900 border border-amber-900/40 hover:border-amber-500/60 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group transition-all"
            >
              <div>
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-amber-950/90 text-amber-300 border border-amber-700/60 text-[11px] px-2.5 py-1 rounded-full font-serif flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" /> {venue.timing}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <span className="text-[10px] text-amber-400 font-serif uppercase tracking-widest block font-bold">
                    {venue.type}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-amber-100">{venue.name}</h3>

                  <p className="text-stone-300 text-xs leading-relaxed">
                    {venue.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <p className="text-[11px] font-serif font-bold text-amber-300">Highlights:</p>
                    <ul className="grid grid-cols-2 gap-1 text-[11px] text-stone-300">
                      {venue.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-amber-400 flex-shrink-0" />
                          <span className="truncate">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenTableReservation(venue)}
                  className="w-full bg-stone-950 hover:bg-amber-700 text-amber-200 hover:text-stone-950 border border-amber-700/50 hover:border-amber-500 font-serif font-bold text-xs py-2.5 rounded-xl shadow cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve Table at {venue.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
