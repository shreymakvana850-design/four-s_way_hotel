import React from 'react';
import { TESTIMONIALS_DATA } from '../data/websiteData';
import { Star, Quote, MapPin } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-stone-900 text-stone-100 relative border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-serif uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Guest Memories & Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100">
            Loved By Royal Travelers & Families
          </h2>
          <p className="text-stone-300 text-sm">
            Read what distinguished guests, couples, and grand wedding hosts say about their experience at Four's Way Hotel.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <div
              key={idx}
              className="bg-stone-950 border border-amber-900/40 p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-4 relative"
            >
              <Quote className="w-8 h-8 text-amber-700/40 absolute top-4 right-4" />

              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-stone-300 text-xs italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-800">
                <p className="font-serif font-bold text-amber-200 text-sm">{t.author}</p>
                <p className="text-[10px] text-stone-400 flex items-center gap-1 font-mono">
                  <MapPin className="w-3 h-3 text-amber-400" /> {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
