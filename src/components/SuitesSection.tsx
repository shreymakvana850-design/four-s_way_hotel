import React, { useState } from 'react';
import { SUITES_DATA, Suite } from '../data/websiteData';
import { Crown, Check, ArrowRight, BedDouble, Users, ArrowLeft } from 'lucide-react';

interface SuitesSectionProps {
  onSelectSuite: (suite: Suite) => void;
  onGoBack?: () => void;
  isStandalonePage?: boolean;
}

export const SuitesSection: React.FC<SuitesSectionProps> = ({
  onSelectSuite,
  onGoBack,
  isStandalonePage = false,
}) => {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Royal Presidential Suite', 'Heritage Luxury Suite', 'Panoramic Sun Suite'];

  const filteredSuites = SUITES_DATA.filter((s) => {
    if (filter === 'All') return true;
    return s.category === filter;
  });

  return (
    <section
      id="suites"
      className={`${isStandalonePage ? 'pt-28 pb-20' : 'py-20'
        } bg-stone-900 text-stone-100 relative border-t border-amber-900/30`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {onGoBack && (
          <div className="flex justify-start">
            <button
              onClick={onGoBack}
              className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-amber-300 hover:text-amber-100 bg-amber-950/60 border border-amber-800/40 px-3.5 py-1.5 rounded-full hover:bg-amber-900/60 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Hotel Overview
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-serif uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
            <Crown className="w-3.5 h-3.5" /> Royal Accommodations
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100">
            Bespoke Suites Fit For Royalty
          </h2>
          <p className="text-stone-300 text-sm">
            Each suite at Four's Way Hotel is individually designed with antique Kathiawadi brasswork, four-poster beds, and modern luxury amenities.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-serif font-semibold transition-all cursor-pointer ${filter === cat
                  ? 'bg-amber-700 text-amber-100 border border-amber-400/60 shadow-lg'
                  : 'bg-stone-950 text-stone-300 hover:bg-stone-800 border border-stone-800'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Suites Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSuites.map((suite) => (
            <div
              key={suite.id}
              className="bg-stone-950 border border-amber-900/40 hover:border-amber-500/60 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={suite.image}
                  alt={suite.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-transparent to-transparent" />

                {suite.featured && (
                  <span className="absolute top-3 right-3 bg-amber-500 text-stone-950 text-[10px] uppercase font-bold font-serif px-2.5 py-1 rounded-full shadow">
                    ★ Premier Choice
                  </span>
                )}

                <span className="absolute bottom-3 left-3 bg-stone-900/90 text-amber-300 border border-amber-700/50 text-xs px-2.5 py-1 rounded-full font-serif">
                  {suite.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="text-xl font-serif font-bold text-amber-100">{suite.name}</h3>
                    <div className="text-right">
                      <span className="text-amber-400 font-mono font-bold text-lg">₹{suite.pricePerNight.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-stone-400 block font-sans">/ night + GST</span>
                    </div>
                  </div>

                  <p className="text-stone-300 text-xs line-clamp-2 mb-3 leading-relaxed">
                    {suite.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-stone-400 pb-3 border-b border-stone-800">
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-amber-400" /> {suite.capacity}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5 text-amber-400" /> {suite.size}</span>
                  </div>

                  {/* Amenities List */}
                  <div className="pt-3 space-y-1">
                    <p className="text-[10px] uppercase text-amber-400 font-serif font-bold tracking-wider">Key Amenities:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {suite.amenities.slice(0, 4).map((amenity, idx) => (
                        <span key={idx} className="bg-stone-900 text-stone-300 text-[10px] px-2 py-0.5 rounded border border-stone-800 flex items-center gap-1">
                          <Check className="w-2.5 h-2.5 text-amber-400" /> {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => onSelectSuite(suite)}
                  className="w-full bg-linear-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-stone-950 font-serif font-bold text-xs py-2.5 rounded-xl shadow cursor-pointer flex items-center justify-center gap-1.5 transition-all mt-2"
                >
                  <span>Reserve {suite.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
