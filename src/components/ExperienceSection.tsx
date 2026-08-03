import React from 'react';
import { EXPERIENCES_DATA } from '../data/websiteData';
import { Crown, Sparkles, Car, Music, Waves, Compass } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car':
        return <Car className="w-6 h-6 text-amber-400" />;
      case 'Music':
        return <Music className="w-6 h-6 text-amber-400" />;
      case 'Waves':
        return <Waves className="w-6 h-6 text-amber-400" />;
      default:
        return <Compass className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="experiences" className="py-20 bg-stone-950 text-stone-100 relative border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-serif uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
            <Crown className="w-3.5 h-3.5" /> Curated Royal Indulgences
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100">
            Unforgettable Palace Experiences
          </h2>
          <p className="text-stone-300 text-sm">
            Immerse yourself in authentic royal traditions, vintage automobile rides, and cultural Kathiyawadi evening music under Gujarat’s starlit skies.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPERIENCES_DATA.map((exp, idx) => (
            <div
              key={idx}
              className="bg-stone-900 border border-amber-900/40 hover:border-amber-500/60 p-6 rounded-2xl shadow-xl transition-all duration-300 space-y-4 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-600/40 flex items-center justify-center shadow-inner">
                {getIcon(exp.icon)}
              </div>

              <h3 className="text-lg font-serif font-bold text-amber-100">{exp.title}</h3>
              <p className="text-stone-300 text-xs leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>

        {/* Video / Photo Highlight Banner */}
        <div className="bg-linear-to-r from-stone-900 via-amber-950/40 to-stone-900 border border-amber-700/40 p-8 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> Complimentary Royal Welcome Ceremony
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Every guest checking into Heritage Four's way is greeted with traditional Aarti, Tilak, floral garlands, Shehnai music, and a refreshing royal saffron-infused welcome drink.
            </p>
          </div>

          <a
            href="#suites"
            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition-all shrink-0"
          >
            Explore Royal Stay
          </a>
        </div>

      </div>
    </section>
  );
};
