import React from 'react';
import { Crown } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="history" className="py-20 bg-stone-950 text-stone-100 relative border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Text Narrative */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-serif uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
              <Crown className="w-3.5 h-3.5" /> 50 Years of Royal Glory
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100 leading-tight">
              A Magnificent Luxury Hotel <br />
              <span className="text-amber-400">Designed For Modern Royalty</span>
            </h2>

            <p className="text-stone-300 text-sm leading-relaxed">
              Situated in the heart of Dubai, <strong>Four's Way Hotel</strong> stands as a monumental testimony to 50 years of royal luxury and architectural prowess. Meticulously designed for refined comfort, the hotel offers world-class hospitality and regal experiences.
            </p>

            <p className="text-stone-300 text-sm leading-relaxed">
              Every stone, carved Jharokha, and open courtyard whispers stories of brave warriors, royal durbars, and festive celebrations. Spanning across 7 acres of serene hilltop landscapes, the palace offers a 360-degree panoramic view of Rajkot’s pristine countryside.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-stone-900 p-4 rounded-xl border border-amber-900/40 space-y-1">
                <div className="text-amber-400 font-serif font-bold text-2xl">50+</div>
                <div className="text-xs text-stone-300 font-medium">Years of Royal Heritage</div>
              </div>

              <div className="bg-stone-900 p-4 rounded-xl border border-amber-900/40 space-y-1">
                <div className="text-amber-400 font-serif font-bold text-2xl">7 Acres</div>
                <div className="text-xs text-stone-300 font-medium">360° Hilltop Royal Property</div>
              </div>

              <div className="bg-stone-900 p-4 rounded-xl border border-amber-900/40 space-y-1">
                <div className="text-amber-400 font-serif font-bold text-2xl">28 Suites</div>
                <div className="text-xs text-stone-300 font-medium">Bespoke Royal Accommodations</div>
              </div>

              <div className="bg-stone-900 p-4 rounded-xl border border-amber-900/40 space-y-1">
                <div className="text-amber-400 font-serif font-bold text-2xl">1,200+</div>
                <div className="text-xs text-stone-300 font-medium">Grand Wedding Guest Capacity</div>
              </div>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-600/40 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                alt="Four's Way  Courtyard"
                referrerPolicy="no-referrer"
                className="w-full h-112.5 object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-stone-900/90 backdrop-blur-sm border border-amber-500/40 p-4 rounded-xl text-xs text-stone-200">
                <p className="font-serif font-bold text-amber-200 mb-0.5">The Central Heritage Courtyard</p>
                <p className="text-stone-300">Features hand-carved sandstone arches, illuminated fountains, and starlight folk performances.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
