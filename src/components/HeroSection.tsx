import React from 'react';
import { Crown, Sparkles, MapPin } from 'lucide-react';
import heroImg from '../assets/images/fours_way_hero_1785071929126.jpg';

interface HeroSectionProps {
  onSearch?: (params: { checkIn: string; checkOut: string; suite: string; guests: number }) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Dark Vignette & Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Four's Way Hotel Dubai"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-amber-950/80 border border-amber-500/40 px-4 py-1.5 rounded-full text-amber-200 text-xs font-serif shadow-xl backdrop-blur-sm">
          <Crown className="w-4 h-4 text-amber-400" />
          <span>Dubai's Premier Luxury Heritage Hotel</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-amber-100 leading-tight tracking-wide drop-shadow-md">
          Step Into 50 Years of <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-amber-400 to-amber-200">
            Royal Splendor & Luxury
          </span>
        </h1>

        <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed">
          Situated in the heart of Dubai, UAE. Experience opulent royal hospitality, majestic suites, world-class fine dining, and grand event celebrations.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-amber-300/90 font-serif pt-2">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400" /> Dubai, UAE
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 50-Year Royal Heritage
          </span>
          <span>•</span>
          <span>👑 Iconic Luxury Residence</span>
        </div>
      </div>
    </section>
  );
};

