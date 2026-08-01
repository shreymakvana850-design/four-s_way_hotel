import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Crown,
  Sparkles,
  Calendar,
  Users,
  MapPin,
  Maximize2,
  Check,
  ChevronDown,
  Star,
  Phone,
  Mail,
  Instagram,
  Facebook,
  X as CloseIcon,
  Heart,
  Music,
  Utensils,
  Camera,
  ShieldCheck,
  Building2,
  Car,
  Clock,
  Send,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Info,
  ArrowLeft
} from 'lucide-react';
import { WeddingsSection } from './WeddingsSection';
import royalWeddingHeroImg from '../assets/images/royal_wedding_hero_1785300265250.jpg';
import royalIndianCoupleImg from '../assets/images/royal_indian_couple_1785386231352.jpg';

interface WeddingsPageProps {
  onOpenBookNow?: () => void;
  onGoBack?: () => void;
}

// 12 Gallery Images with Categories
const GALLERY_IMAGES = [
  {
    id: 1,
    title: 'Grand Palace Mandap Stage',
    category: 'Ceremonies',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    desc: 'Bespoke floral mandap illuminated with crystal chandeliers.'
  },
  {
    id: 2,
    title: 'Royal Garden Night Reception',
    category: 'Venues',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1200',
    desc: 'Fairytale open-air setup under star-lit Dubai skies.'
  },
  {
    id: 3,
    title: 'Royal Indian Wedding Couple',
    category: 'Bridal',
    url: royalIndianCoupleImg,
    desc: 'Grand royal wedding attire with exquisite jewelry and regal decor.'
  },
  {
    id: 4,
    title: 'Bridal Suite & Couture',
    category: 'Bridal',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200',
    desc: 'Royal bridal suite designed for peaceful preparation.'
  },
  {
    id: 5,
    title: 'Grand Ballroom Setup',
    category: 'Venues',
    url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200',
    desc: '18,000 sq.ft banquet decorated for 800 royal guests.'
  },
  {
    id: 6,
    title: 'Poolside Sunset Cocktail',
    category: 'Ceremonies',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200',
    desc: 'Shimmering waters backdrop for evening sundowners.'
  },
  {
    id: 7,
    title: 'Royal Banquet Table Setting',
    category: 'Decor',
    url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=1200',
    desc: 'Gold-plated cutlery and fine bone china arrangements.'
  },
  {
    id: 8,
    title: 'Exchange of Vows',
    category: 'Ceremonies',
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200',
    desc: 'Timeless moments captured in our heritage courtyard.'
  },
  {
    id: 9,
    title: 'Mehendi & Sangeet Lounge',
    category: 'Ceremonies',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1200',
    desc: 'Vibrant colors, folk music performance, and Henna artisans.'
  },
  {
    id: 10,
    title: 'Gourmet Culinary Display',
    category: 'Decor',
    url: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1200',
    desc: '5-star live cooking stations featuring global cuisines.'
  },
  {
    id: 11,
    title: 'Illuminated Palace Entrance',
    category: 'Venues',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200',
    desc: 'Grand procession entrance with traditional trumpeters.'
  },
  {
    id: 12,
    title: 'Royal Ring Ceremony',
    category: 'Bridal',
    url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=1200',
    desc: 'Exquisite diamond ring exchange under ambient chandeliers.'
  }
];

// Testimonials Data
const TESTIMONIALS = [
  {
    id: 1,
    couple: 'Rohan & Ananya',
    date: 'December 2025',
    venue: 'Royal Garden Lawn',
    image: royalIndianCoupleImg,
    quote: "Our wedding at Four's Way Hotel was nothing short of a fairytale. From the grand entrance to the exquisite catering and attentive staff, every detail exceeded our highest expectations!",
    rating: 5,
  },
  {
    id: 2,
    couple: 'Vikram & Devika',
    date: 'February 2026',
    venue: 'Grand Ballroom',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600',
    quote: "The team managed our 800+ guests effortlessly. The crystal chandeliers in the Grand Ballroom and the personalized concierge service made our families feel like true royalty.",
    rating: 5,
  },
  {
    id: 3,
    couple: 'Siddharth & Priya',
    date: 'January 2026',
    venue: 'Poolside & Banquet Hall',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600',
    quote: "Having our Mehendi poolside at sunset and the main wedding in the banquet hall was a dream combination. The culinary spreads and decoration were breathtaking!",
    rating: 5,
  },
];

// FAQs Data
const FAQS = [
  {
    q: "How far in advance should we reserve our wedding date?",
    a: "We recommend booking 6 to 12 months in advance to secure your preferred dates, especially during the peak wedding season (October to April)."
  },
  {
    q: "Can we bring our own decorators or specialized caterers?",
    a: "Our hotel provides an in-house team of world-class 5-star master chefs and floral decorators. However, we also welcome empaneled external luxury decorators and specialized wedding planners."
  },
  {
    q: "What accommodation facilities are included for wedding guests?",
    a: "We offer 50+ luxury suites and rooms with preferential group booking tariffs, complimentary breakfast, VIP airport transfers, and access to private lounge facilities."
  },
  {
    q: "Do you have dedicated bridal suites and preparation lounges?",
    a: "Yes! All wedding packages include a dedicated, expansive Royal Bridal Suite complete with salon-grade vanity mirrors, private lounge, security safes, and 24x7 butler service."
  },
  {
    q: "Is customized menu planning available for regional or specific diets?",
    a: "Absolutely. Our Executive Chefs specialize in authentic regional cuisines (Jain, Gujarati, North Indian, Middle Eastern, Continental, etc.) and can curate completely personalized multi-course menus."
  },
  {
    q: "What is the venue capacity and parking arrangement?",
    a: "Our venues range from intimate poolside gatherings (120 guests) to grand garden lawns hosting up to 1,500 guests, supported by valet parking for over 300 vehicles."
  }
];

export const WeddingsPage: React.FC<WeddingsPageProps> = ({ onOpenBookNow, onGoBack }) => {
  // Gallery Filter State
  const [activeTab, setActiveTab] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof GALLERY_IMAGES[0] | null>(null);

  // Testimonial Index
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // FAQ Accordion Toggle State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Form State
  const [formData, setFormData] = useState({
    brideName: '',
    groomName: '',
    email: '',
    phone: '',
    weddingDate: '',
    guests: '500+',
    eventType: 'Full Wedding (3 Days)',
    specialRequirements: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredGallery = activeTab === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeTab);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      // scroll to confirmation or auto-close notice
    }, 500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#140a06] text-stone-100 font-sans selection:bg-[#C8A45D] selection:text-black min-h-screen">
      {/* SECTION 1: HERO SECTION */}
      <section id="wedding-hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src={royalWeddingHeroImg}
            alt="Luxury Royal Wedding Mandap at Four's Way Hotel"
            className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-110 scale-105 transition-transform duration-1000"
          />
          {/* Dark Overlay Vignette for rich text contrast */}
          <div className="absolute inset-0 bg-linear-to-t from-[#140a06] via-[#140a06]/60 to-black/75" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(20,10,6,0.85)_100%)]" />
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-[#C8A45D]/10 border border-[#C8A45D]/40 px-5 py-2 rounded-full text-[#C8A45D] text-xs font-serif uppercase tracking-widest backdrop-blur-md shadow-2xl"
          >
            <Crown className="w-4 h-4 text-[#C8A45D]" />
            <span>Dubai's Ultimate Destination Palace Wedding</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#F8F4ED] leading-[1.15] tracking-wide drop-shadow-2xl"
          >
            A Perfect Destination for <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#F8F4ED] via-[#C8A45D] to-[#F8F4ED]">
              Your Dream Wedding
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-stone-300 text-base sm:text-lg max-w-3xl mx-auto font-sans leading-relaxed font-light"
          >
            Celebrate timeless love with elegance, luxury, and unforgettable memories at <span className="text-[#C8A45D] font-medium">Four's Way Hotel</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-5 pt-4"
          >
            <button
              onClick={() => scrollToSection('wedding-enquiry')}
              className="bg-linear-to-r from-[#C8A45D] via-[#d8b66e] to-[#C8A45D] hover:from-[#d8b66e] hover:to-[#C8A45D] text-stone-950 font-serif font-bold text-sm px-8 py-4 rounded-xl shadow-2xl hover:shadow-[#C8A45D]/25 transition-all cursor-pointer flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <Heart className="w-4 h-4 fill-stone-950" />
              <span>Book Wedding</span>
            </button>

            <button
              onClick={() => scrollToSection('wedding-venues')}
              className="bg-stone-900/80 hover:bg-stone-800 text-[#F8F4ED] border border-[#C8A45D]/50 hover:border-[#C8A45D] font-serif font-semibold text-sm px-8 py-4 rounded-xl backdrop-blur-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-[#C8A45D]" />
              <span>Explore Venues</span>
            </button>
          </motion.div>

          {/* Quick Metrics Bar */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-[#C8A45D]/20 mt-10">
            <div className="text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#C8A45D]">1,500+</div>
              <div className="text-xs text-stone-400 font-sans uppercase tracking-wider">Max Capacity</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#C8A45D]">4</div>
              <div className="text-xs text-stone-400 font-sans uppercase tracking-wider">Royal Venues</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#C8A45D]">50+</div>
              <div className="text-xs text-stone-400 font-sans uppercase tracking-wider">Luxury Suites</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#C8A45D]">5★</div>
              <div className="text-xs text-stone-400 font-sans uppercase tracking-wider">5-Star Hospitality</div>
            </div>
          </div>
        </div>
      </section>

      {/* ROYAL WEDDINGS DESTINATIONS & VENUES */}
      <WeddingsSection onInquireWedding={() => scrollToSection('wedding-enquiry')} />


      {/* SECTION 2: WEDDING EXPERIENCE */}
      <section id="wedding-experience" className="py-24 bg-linear-to-b from-[#140a06] via-[#1c0e08] to-[#140a06] relative border-t-2 border-amber-600/30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,119,6,0.12),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 relative z-10">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-[#C8A45D] text-xs font-serif uppercase tracking-widest bg-[#C8A45D]/10 px-4 py-1.5 rounded-full border border-[#C8A45D]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Memorable Celebrations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F8F4ED]">
              Celebrate Every Moment
            </h2>
            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              From intimate ring exchanges to vibrant pre-wedding festivities and grand reception galas, every ceremony is crafted with imperial elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Engagement Ceremony */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-[#190c06]/90 border border-amber-600/40 hover:border-amber-400 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800"
                  alt="Engagement Ceremony"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#140a06] via-transparent to-transparent opacity-80" />
                <span className="absolute top-4 left-4 bg-[#140a06]/80 border border-[#C8A45D]/50 text-[#C8A45D] text-xs font-serif px-3 py-1 rounded-full backdrop-blur-md">
                  Pre-Wedding
                </span>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between bg-[#110703]/80">
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-[#F8F4ED] group-hover:text-[#C8A45D] transition-colors">
                    Engagement Ceremony
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                    Begin your forever in an enchanting setting with candle-lit tables, live violin acoustics, and champagne toasts under crystal chandeliers.
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-[#C8A45D]">
                  <span className="font-serif">Intimate & Elegant</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>

            {/* Card 2: Mehendi & Haldi */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-stone-900/90 border border-[#C8A45D]/40 hover:border-[#C8A45D] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800"
                  alt="Mehendi & Haldi"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-transparent to-transparent opacity-80" />
                <span className="absolute top-4 left-4 bg-stone-950/80 border border-[#C8A45D]/50 text-[#C8A45D] text-xs font-serif px-3 py-1 rounded-full backdrop-blur-md">
                  Festive Rituals
                </span>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between bg-stone-950/60">
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-[#F8F4ED] group-hover:text-[#C8A45D] transition-colors">
                    Mehendi & Haldi
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                    Vibrant open-air garden setup with marigold drapes, traditional Henna artists, live dhol beats, and artisanal culinary food stalls.
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-[#C8A45D]">
                  <span className="font-serif">Vibrant & Joyous</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>

            {/* Card 3: Wedding Ceremony */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-stone-900/90 border border-[#C8A45D]/40 hover:border-[#C8A45D] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800"
                  alt="Wedding Ceremony"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-transparent to-transparent opacity-80" />
                <span className="absolute top-4 left-4 bg-stone-950/80 border border-[#C8A45D]/50 text-[#C8A45D] text-xs font-serif px-3 py-1 rounded-full backdrop-blur-md">
                  Main Event
                </span>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between bg-stone-950/60">
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-[#F8F4ED] group-hover:text-[#C8A45D] transition-colors">
                    Wedding Ceremony
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                    Exchange vows on a regal mandap stage with bespoke floral artistry, grand procession entrances, and royal 5-star hospitality.
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-[#C8A45D]">
                  <span className="font-serif">Royal & Grand</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* SECTION 3: WEDDING VENUES */}
      <section id="wedding-venues" className="py-24 bg-stone-950 relative border-t border-[#C8A45D]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-[#C8A45D] text-xs font-serif uppercase tracking-widest bg-[#C8A45D]/10 px-4 py-1.5 rounded-full border border-[#C8A45D]/30">
              <Building2 className="w-3.5 h-3.5" />
              <span>Imperial Venues</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F8F4ED]">
              Exquisite Wedding Venues
            </h2>
            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              Four distinct, world-class venues tailored to accommodate every scale of luxury wedding celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Venue 1: Grand Ballroom */}
            <div className="bg-stone-900 border border-[#C8A45D]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col group hover:border-[#C8A45D] transition-all">
              <div className="relative h-72 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000"
                  alt="Grand Ballroom"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear -to-t from-stone-950 via-stone-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-serif">
                  <span className="bg-[#C8A45D] text-stone-950 font-bold px-3 py-1 rounded-full shadow">
                    Indoor Regal Ballroom
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl font-serif font-bold text-[#F8F4ED] group-hover:text-[#C8A45D] transition-colors">
                    1. Grand Ballroom
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                    Opulent pillarless hall featuring high ceilings, Austrian crystal chandeliers, dynamic LED lighting, and private pre-function foyers.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#C8A45D] pt-2 border-t border-stone-800">
                    <span className="flex items-center gap-1.5 bg-stone-950 px-3 py-1.5 rounded-lg border border-amber-900/40">
                      <Users className="w-3.5 h-3.5" /> Capacity: <strong>800 Guests</strong>
                    </span>
                    <span className="flex items-center gap-1.5 bg-stone-950 px-3 py-1.5 rounded-lg border border-amber-900/40">
                      <Maximize2 className="w-3.5 h-3.5" /> Area: <strong>18,000 Sq.ft</strong>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => scrollToSection('wedding-enquiry')}
                  className="w-full mt-4 bg-linear-to-r from-[#C8A45D] to-[#b38f49] hover:from-[#d8b66e] hover:to-[#C8A45D] text-stone-950 font-serif font-bold text-xs py-3 rounded-xl shadow cursor-pointer transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>Book Venue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Venue 2: Royal Garden Lawn */}
            <div className="bg-stone-900 border border-[#C8A45D]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col group hover:border-[#C8A45D] transition-all">
              <div className="relative h-72 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1000"
                  alt="Royal Garden Lawn"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-serif">
                  <span className="bg-[#C8A45D] text-stone-950 font-bold px-3 py-1 rounded-full shadow">
                    Open-Air Royal Lawn
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl font-serif font-bold text-[#F8F4ED] group-hover:text-[#C8A45D] transition-colors">
                    2. Royal Garden Lawn
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                    Expansive manicured emerald lawns surrounded by illuminated hotel architecture, perfect for grand wedding receptions and royal processions.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#C8A45D] pt-2 border-t border-stone-800">
                    <span className="flex items-center gap-1.5 bg-stone-950 px-3 py-1.5 rounded-lg border border-amber-900/40">
                      <Users className="w-3.5 h-3.5" /> Capacity: <strong>1,500 Guests</strong>
                    </span>
                    <span className="flex items-center gap-1.5 bg-stone-950 px-3 py-1.5 rounded-lg border border-amber-900/40">
                      <Maximize2 className="w-3.5 h-3.5" /> Area: <strong>25,000 Sq.ft</strong>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => scrollToSection('wedding-enquiry')}
                  className="w-full mt-4 bg-linear-to-r from-[#C8A45D] to-[#b38f49] hover:from-[#d8b66e] hover:to-[#C8A45D] text-stone-950 font-serif font-bold text-xs py-3 rounded-xl shadow cursor-pointer transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>Book Venue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Venue 3: Poolside Celebration */}
            <div className="bg-stone-900 border border-[#C8A45D]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col group hover:border-[#C8A45D] transition-all">
              <div className="relative h-72 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1000"
                  alt="Poolside Celebration"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-serif">
                  <span className="bg-[#C8A45D] text-stone-950 font-bold px-3 py-1 rounded-full shadow">
                    Sunset & Cocktail Arena
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl font-serif font-bold text-[#F8F4ED] group-hover:text-[#C8A45D] transition-colors">
                    3. Poolside Celebration
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                    Romantic aquatic setting with illuminated floating lights, plush cabanas, and open lounge seating ideal for cocktail parties and sundowners.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#C8A45D] pt-2 border-t border-stone-800">
                    <span className="flex items-center gap-1.5 bg-stone-950 px-3 py-1.5 rounded-lg border border-amber-900/40">
                      <Users className="w-3.5 h-3.5" /> Capacity: <strong>120 Guests</strong>
                    </span>
                    <span className="flex items-center gap-1.5 bg-stone-950 px-3 py-1.5 rounded-lg border border-amber-900/40">
                      <Maximize2 className="w-3.5 h-3.5" /> Area: <strong>6,500 Sq.ft</strong>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => scrollToSection('wedding-enquiry')}
                  className="w-full mt-4 bg-linear-to-r from-[#C8A45D] to-[#b38f49] hover:from-[#d8b66e] hover:to-[#C8A45D] text-stone-950 font-serif font-bold text-xs py-3 rounded-xl shadow cursor-pointer transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>Book Venue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Venue 4: Banquet Hall */}
            <div className="bg-stone-900 border border-[#C8A45D]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col group hover:border-[#C8A45D] transition-all">
              <div className="relative h-72 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=1000"
                  alt="Banquet Hall"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-serif">
                  <span className="bg-[#C8A45D] text-stone-950 font-bold px-3 py-1 rounded-full shadow">
                    Classic Indoor Banquet
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl font-serif font-bold text-[#F8F4ED] group-hover:text-[#C8A45D] transition-colors">
                    4. Banquet Hall
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                    Sophisticated climate-controlled venue tailored for engagement ceremonies, Sangeet performances, and traditional family feasts.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#C8A45D] pt-2 border-t border-stone-800">
                    <span className="flex items-center gap-1.5 bg-stone-950 px-3 py-1.5 rounded-lg border border-amber-900/40">
                      <Users className="w-3.5 h-3.5" /> Capacity: <strong>300 Guests</strong>
                    </span>
                    <span className="flex items-center gap-1.5 bg-stone-950 px-3 py-1.5 rounded-lg border border-amber-900/40">
                      <Maximize2 className="w-3.5 h-3.5" /> Area: <strong>8,500 Sq.ft</strong>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => scrollToSection('wedding-enquiry')}
                  className="w-full mt-4 bg-linear-to-r from-[#C8A45D] to-[#b38f49] hover:from-[#d8b66e] hover:to-[#C8A45D] text-stone-950 font-serif font-bold text-xs py-3 rounded-xl shadow cursor-pointer transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>Book Venue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 4: GALLERY */}
      <section id="wedding-gallery" className="py-24 bg-linear-to-b from-[#140a06] via-[#1b0d07] to-[#140a06] relative border-t-2 border-amber-600/30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(217,119,6,0.1),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 relative z-10">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-[#C8A45D] text-xs font-serif uppercase tracking-widest bg-[#C8A45D]/10 px-4 py-1.5 rounded-full border border-[#C8A45D]/30">
              <Camera className="w-3.5 h-3.5" />
              <span>Visual Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F8F4ED]">
              Luxury Wedding Gallery
            </h2>
            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              Explore 12 high-definition glimpses of unforgettable wedding moments, floral grandeur, and heritage venues.
            </p>

            {/* Gallery Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {['All', 'Ceremonies', 'Venues', 'Decor', 'Bridal'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs font-serif px-5 py-2 rounded-full border transition-all cursor-pointer ${activeTab === tab
                    ? 'bg-[#C8A45D] text-stone-950 border-[#C8A45D] font-bold shadow-lg'
                    : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:border-[#C8A45D]/50'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry / Grid Gallery */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filteredGallery.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedImage(item)}
                  className="group relative h-64 rounded-2xl overflow-hidden border border-[#C8A45D]/30 hover:border-[#C8A45D] shadow-xl cursor-pointer"
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                    <span className="text-[10px] uppercase font-serif text-[#C8A45D] tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-serif font-bold text-stone-100 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-stone-300 line-clamp-1 font-light pt-0.5">
                      {item.desc}
                    </p>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-950/70 border border-[#C8A45D]/40 text-[#C8A45D] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Gallery Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 text-stone-400 hover:text-amber-400 p-2 cursor-pointer transition-colors"
              >
                <CloseIcon className="w-8 h-8" />
              </button>

              <div className="max-w-4xl w-full space-y-4 text-center">
                <div className="relative max-h-[75vh] overflow-hidden rounded-2xl border border-[#C8A45D]/40 shadow-2xl">
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    className="w-full h-auto max-h-[75vh] object-contain mx-auto"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase font-serif text-[#C8A45D] tracking-widest">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F8F4ED]">
                    {selectedImage.title}
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm font-light">
                    {selectedImage.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>


      {/* SECTION 5: WEDDING PACKAGES */}
      <section id="wedding-packages" className="py-24 bg-linear-to-b from-[#140a06] via-[#1c0f08] to-[#140a06] relative border-t-2 border-amber-600/30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.12),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 relative z-10">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-[#C8A45D] text-xs font-serif uppercase tracking-widest bg-[#C8A45D]/10 px-4 py-1.5 rounded-full border border-[#C8A45D]/30">
              <Crown className="w-3.5 h-3.5" />
              <span>Tailored Curations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F8F4ED]">
              Bespoke Wedding Packages
            </h2>
            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              All-inclusive luxury wedding collections covering venue, gourmet catering, decor, photography, and suite stays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Package 1: Silver Package */}
            <div className="bg-stone-900/90 border border-stone-800 hover:border-[#C8A45D]/50 rounded-2xl p-8 space-y-8 flex flex-col justify-between transition-all duration-300 shadow-xl relative group">
              <div className="space-y-6">
                <div className="space-y-2 border-b border-stone-800 pb-6 text-center">
                  <span className="text-xs font-serif text-stone-400 uppercase tracking-widest">Intimate Gathering</span>
                  <h3 className="text-2xl font-serif font-bold text-[#F8F4ED]">Silver Package</h3>
                  <div className="text-3xl font-serif font-bold text-[#C8A45D] pt-2">
                    Ideal for 250 - 400 Guests
                  </div>
                </div>

                <ul className="space-y-3.5 text-xs text-stone-300 font-sans">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <span><strong>Decoration:</strong> Elegant floral stage, entry arch & pathway lights</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <span><strong>Food & Dining:</strong> 5-Course Royal Buffet (Veg/Non-Veg options)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <span><strong>Photography:</strong> 2 HD Photographers + Traditional Album</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <span><strong>Accommodation:</strong> 1 Bridal Suite + 10 Luxury Guest Rooms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <span><strong>Music:</strong> Professional DJ & Ambient Stage Sound</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <span><strong>Event Planning:</strong> Dedicated On-Site Assistant</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => scrollToSection('wedding-enquiry')}
                className="w-full bg-stone-800 hover:bg-[#C8A45D] text-[#F8F4ED] hover:text-stone-950 font-serif font-bold text-xs py-3.5 rounded-xl border border-[#C8A45D]/30 transition-all cursor-pointer text-center"
              >
                Inquire Silver Package
              </button>
            </div>

            {/* Package 2: Gold Package (Highlighted) */}
            <div className="bg-stone-900 border-2 border-[#C8A45D] rounded-2xl p-8 space-y-8 flex flex-col justify-between transition-all duration-300 shadow-2xl relative transform md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-[#C8A45D] to-[#b38f49] text-stone-950 text-[11px] font-serif font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                Most Popular Choice
              </div>

              <div className="space-y-6 pt-2">
                <div className="space-y-2 border-b border-stone-800 pb-6 text-center">
                  <span className="text-xs font-serif text-[#C8A45D] uppercase tracking-widest">Grand Celebration</span>
                  <h3 className="text-3xl font-serif font-bold text-[#F8F4ED]">Gold Package</h3>
                  <div className="text-3xl font-serif font-bold text-[#C8A45D] pt-2">
                    Ideal for 500 - 800 Guests
                  </div>
                </div>

                <ul className="space-y-3.5 text-xs text-stone-200 font-sans">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <span><strong>Decoration:</strong> Premium Orchid & Rose Mandap + LED Backdrop</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <span><strong>Food & Dining:</strong> 7-Course International & Regional Live Counters</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <span><strong>Photography:</strong> Cinematic 4K Videography + Drone + Album</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <span><strong>Accommodation:</strong> Royal Bridal Suite + 25 Deluxe Guest Rooms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <span><strong>Music:</strong> Live Shehnai / Fusion Band + DJ & Dhol Artists</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <span><strong>Event Planning:</strong> Senior Wedding Concierge & Logistics Team</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => scrollToSection('wedding-enquiry')}
                className="w-full bg-linear-to-r from-[#C8A45D] to-[#d8b66e] text-stone-950 font-serif font-bold text-xs py-4 rounded-xl shadow-xl hover:shadow-[#C8A45D]/30 transition-all cursor-pointer text-center"
              >
                Inquire Gold Package
              </button>
            </div>

            {/* Package 3: Royal Package */}
            <div className="bg-stone-900/90 border border-stone-800 hover:border-[#C8A45D]/50 rounded-2xl p-8 space-y-8 flex flex-col justify-between transition-all duration-300 shadow-xl relative group">
              <div className="space-y-6">
                <div className="space-y-2 border-b border-stone-800 pb-6 text-center">
                  <span className="text-xs font-serif text-stone-400 uppercase tracking-widest">Imperial Destination</span>
                  <h3 className="text-2xl font-serif font-bold text-[#F8F4ED]">Royal Package</h3>
                  <div className="text-3xl font-serif font-bold text-[#C8A45D] pt-2">
                    Ideal for 1,000+ Guests
                  </div>
                </div>

                <ul className="space-y-3.5 text-xs text-stone-300 font-sans">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <span><strong>Decoration:</strong> Custom Themed Heritage Palace & Garden Transformation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <span><strong>Food & Dining:</strong> Unlimited Gourmet Live Cuisines by 5-Star Executive Chefs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <span><strong>Photography:</strong> Celebrity Photography Team + Live Stream Feed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <span><strong>Accommodation:</strong> Presidential Maharaja Suite + 50 Luxury Suites</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <span><strong>Music:</strong> Celebrity Singer / Orchestra & Pyrotechnics Show</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <span><strong>Event Planning:</strong> Full 3-Day End-to-End Wedding Operations Manager</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => scrollToSection('wedding-enquiry')}
                className="w-full bg-stone-800 hover:bg-[#C8A45D] text-[#F8F4ED] hover:text-stone-950 font-serif font-bold text-xs py-3.5 rounded-xl border border-[#C8A45D]/30 transition-all cursor-pointer text-center"
              >
                Inquire Royal Package
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 6: WHY CHOOSE FOUR'S WAY HOTEL */}
      <section id="why-choose-us" className="py-24 bg-linear-to-b from-[#140a06] via-[#1b0d07] to-[#140a06] relative border-t-2 border-amber-600/30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,119,6,0.1),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 relative z-10">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-[#C8A45D] text-xs font-serif uppercase tracking-widest bg-[#C8A45D]/10 px-4 py-1.5 rounded-full border border-[#C8A45D]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Unmatched Excellence</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F8F4ED]">
              Why Choose Four's Way Hotel
            </h2>
            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              Eight reasons why royalty and international families trust us for their most sacred celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Luxury Accommodation', icon: Building2, desc: '50+ lavish suites with balcony views & round-the-clock butler service.' },
              { title: 'Professional Wedding Planner', icon: Crown, desc: 'Dedicated event orchestrators to execute every ritual effortlessly.' },
              { title: 'Premium Catering', icon: Utensils, desc: 'Live global culinary stations crafted by master Michelin-trained chefs.' },
              { title: 'Decoration Services', icon: Sparkles, desc: 'Bespoke floral setups, crystal chandeliers, and royal mandap stages.' },
              { title: 'Parking & Valet', icon: Car, desc: 'Secure parking lot with 300+ car capacity & professional valet team.' },
              { title: '24×7 Guest Support', icon: Clock, desc: 'Round-the-clock front desk, room service, and guest assistance.' },
              { title: 'Live Music & Entertainment', icon: Music, desc: 'Stage sound, traditional Folk / Shehnai artists, and celebrity DJs.' },
              { title: 'Royal Bridal Suite', icon: Heart, desc: 'Expansive private suite with salon vanity mirrors & lounge space.' },
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="bg-stone-900/80 border border-[#C8A45D]/30 hover:border-[#C8A45D] p-6 rounded-2xl space-y-4 shadow-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#C8A45D]/10 border border-[#C8A45D]/40 flex items-center justify-center text-[#C8A45D] group-hover:bg-[#C8A45D] group-hover:text-stone-950 transition-all shrink-0">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-serif font-bold text-[#F8F4ED] group-hover:text-[#C8A45D] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-stone-300 text-xs font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* SECTION 7: TESTIMONIALS */}
      <section id="wedding-testimonials" className="py-24 bg-stone-950 relative border-t border-[#C8A45D]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-[#C8A45D] text-xs font-serif uppercase tracking-widest bg-[#C8A45D]/10 px-4 py-1.5 rounded-full border border-[#C8A45D]/30">
              <Star className="w-3.5 h-3.5 fill-[#C8A45D]" />
              <span>Real Wedding Stories</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F8F4ED]">
              Couples' Experiences
            </h2>
          </div>

          {/* Testimonial Slider */}
          <div className="relative bg-stone-900/90 border border-[#C8A45D]/40 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#C8A45D]/30">
                <img
                  src={TESTIMONIALS[currentTestimonial].image}
                  alt={TESTIMONIALS[currentTestimonial].couple}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-xs font-serif text-[#C8A45D]">
                  Venue: {TESTIMONIALS[currentTestimonial].venue}
                </div>
              </div>

              <div className="md:col-span-7 space-y-6 text-left">
                <div className="flex items-center gap-1 text-[#C8A45D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C8A45D]" />
                  ))}
                </div>

                <blockquote className="text-stone-200 font-serif italic text-base sm:text-lg leading-relaxed">
                  "{TESTIMONIALS[currentTestimonial].quote}"
                </blockquote>

                <div>
                  <h4 className="text-xl font-serif font-bold text-[#C8A45D]">
                    {TESTIMONIALS[currentTestimonial].couple}
                  </h4>
                  <p className="text-xs text-stone-400 font-sans">
                    Married in {TESTIMONIALS[currentTestimonial].date}
                  </p>
                </div>

                {/* Slider Navigation Buttons */}
                <div className="flex items-center gap-3 pt-4">
                  <button
                    onClick={() =>
                      setCurrentTestimonial((prev) =>
                        prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
                      )
                    }
                    className="w-10 h-10 rounded-full border border-[#C8A45D]/40 text-[#C8A45D] hover:bg-[#C8A45D] hover:text-stone-950 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-xs text-stone-400 font-mono">
                    0{currentTestimonial + 1} / 0{TESTIMONIALS.length}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentTestimonial((prev) =>
                        prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="w-10 h-10 rounded-full border border-[#C8A45D]/40 text-[#C8A45D] hover:bg-[#C8A45D] hover:text-stone-950 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 8: WEDDING ENQUIRY FORM */}
      <section id="wedding-enquiry" className="py-24 bg-[#0B0B0B] relative border-t border-[#C8A45D]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-[#C8A45D] text-xs font-serif uppercase tracking-widest bg-[#C8A45D]/10 px-4 py-1.5 rounded-full border border-[#C8A45D]/30">
              <Send className="w-3.5 h-3.5" />
              <span>Personalized Planning</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F8F4ED]">
              Wedding Enquiry Form
            </h2>
            <p className="text-stone-300 text-sm font-light">
              Connect with our Senior Wedding Concierge team to receive customized venue layouts and pricing brochures.
            </p>
          </div>

          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-stone-900 border border-[#C8A45D] p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-[#C8A45D]/20 text-[#C8A45D] border border-[#C8A45D] flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#F8F4ED]">
                Thank You for Reaching Out!
              </h3>
              <p className="text-stone-300 text-sm max-w-md mx-auto leading-relaxed">
                Your wedding enquiry has been sent to our Wedding Operations Manager. Our team will contact you within 24 hours at <strong>{formData.phone}</strong> or <strong>{formData.email}</strong>.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="bg-[#C8A45D] text-stone-950 font-serif font-bold text-xs px-6 py-3 rounded-xl cursor-pointer"
              >
                Submit Another Enquiry
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleFormSubmit}
              className="bg-stone-900/90 border border-[#C8A45D]/40 p-6 sm:p-10 rounded-3xl shadow-2xl space-y-6 backdrop-blur-md"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-serif text-[#C8A45D] uppercase mb-2">
                    Bride's Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter bride's name"
                    value={formData.brideName}
                    onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-[#C8A45D] rounded-xl px-4 py-3 text-xs text-stone-200 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif text-[#C8A45D] uppercase mb-2">
                    Groom's Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter groom's name"
                    value={formData.groomName}
                    onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-[#C8A45D] rounded-xl px-4 py-3 text-xs text-stone-200 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif text-[#C8A45D] uppercase mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-[#C8A45D] rounded-xl px-4 py-3 text-xs text-stone-200 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif text-[#C8A45D] uppercase mb-2">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 50 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-[#C8A45D] rounded-xl px-4 py-3 text-xs text-stone-200 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif text-[#C8A45D] uppercase mb-2">
                    Tentative Wedding Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-[#C8A45D] rounded-xl px-4 py-3 text-xs text-stone-200 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif text-[#C8A45D] uppercase mb-2">
                    Estimated Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-[#C8A45D] rounded-xl px-4 py-3 text-xs text-stone-200 outline-none transition-colors"
                  >
                    <option value="100 - 250">100 - 250 Guests</option>
                    <option value="250 - 500">250 - 500 Guests</option>
                    <option value="500 - 800">500 - 800 Guests</option>
                    <option value="800 - 1500+">800 - 1,500+ Guests</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-serif text-[#C8A45D] uppercase mb-2">
                  Event Type
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 focus:border-[#C8A45D] rounded-xl px-4 py-3 text-xs text-stone-200 outline-none transition-colors"
                >
                  <option value="Full Wedding (3 Days)">Full Destination Wedding (3-Day Festivities)</option>
                  <option value="Engagement Ceremony">Engagement / Ring Ceremony</option>
                  <option value="Sangeet & Mehendi">Sangeet & Mehendi Evening</option>
                  <option value="Wedding Ceremony Only">Main Wedding Rituals & Feast</option>
                  <option value="Grand Reception">Reception Gala</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-serif text-[#C8A45D] uppercase mb-2">
                  Special Requirements / Notes
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your preferred themes, diet preferences, room counts, or special requests..."
                  value={formData.specialRequirements}
                  onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 focus:border-[#C8A45D] rounded-xl px-4 py-3 text-xs text-stone-200 outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-linear -to-r from-[#C8A45D] via-[#d8b66e] to-[#C8A45D] hover:from-[#d8b66e] hover:to-[#C8A45D] text-stone-950 font-serif font-bold text-sm py-4 rounded-xl shadow-2xl hover:shadow-[#C8A45D]/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 fill-stone-950" />
                <span>Submit Wedding Enquiry</span>
              </button>
            </form>
          )}
        </div>
      </section>


      {/* SECTION 9: FAQ */}
      <section id="wedding-faq" className="py-24 bg-stone-950 relative border-t border-[#C8A45D]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-[#C8A45D] text-xs font-serif uppercase tracking-widest bg-[#C8A45D]/10 px-4 py-1.5 rounded-full border border-[#C8A45D]/30">
              <Info className="w-3.5 h-3.5" />
              <span>Questions & Answers</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F8F4ED]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-stone-900/90 border border-stone-800 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-800/50 transition-colors"
                  >
                    <span className="font-serif font-semibold text-base text-[#F8F4ED]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#C8A45D] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-stone-300 font-light leading-relaxed border-t border-stone-800/60 pt-4 animate-in slide-in-from-top-1">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* SECTION 10: FOOTER */}
      <footer className="bg-black text-stone-300 pt-16 pb-12 border-t border-[#C8A45D]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C8A45D]/20 border border-[#C8A45D] flex items-center justify-center text-[#C8A45D]">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif font-bold text-[#F8F4ED] text-base tracking-wide block">
                  FOUR'S WAY HOTEL
                </span>
                <span className="text-[10px] text-[#C8A45D] uppercase tracking-widest block font-sans">
                  Weddings & Events • Dubai
                </span>
              </div>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed font-light">
              Crafting unforgettable 5-star palace destination weddings with timeless elegance, royal hospitality, and luxury service.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-[#C8A45D] text-sm uppercase tracking-wider">
              Wedding Navigation
            </h4>
            <ul className="space-y-2 text-xs font-sans text-stone-400">
              <li>
                <button onClick={() => scrollToSection('wedding-hero')} className="hover:text-[#C8A45D] transition-colors">
                  Dream Wedding Overview
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('wedding-experience')} className="hover:text-[#C8A45D] transition-colors">
                  Ceremony Experiences
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('wedding-venues')} className="hover:text-[#C8A45D] transition-colors">
                  Royal Wedding Venues
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('wedding-packages')} className="hover:text-[#C8A45D] transition-colors">
                  Wedding Packages
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('wedding-gallery')} className="hover:text-[#C8A45D] transition-colors">
                  Visual Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Map */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-[#C8A45D] text-sm uppercase tracking-wider">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs font-mono text-stone-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C8A45D]" /> +91 92743 96643
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C8A45D]" /> infofourswayhotel@gmail.com
              </p>
              <p className="flex items-center gap-2 font-sans">
                <MapPin className="w-3.5 h-3.5 text-[#C8A45D]" /> Downtown Luxury District, Dubai, UAE
              </p>
            </div>
          </div>

          {/* Col 4: Social Media & Map Button */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-[#C8A45D] text-sm uppercase tracking-wider">
              Connect With Us
            </h4>
            <div className="flex items-center gap-3">
              <a href="#instagram" className="w-9 h-9 rounded-full bg-stone-900 border border-[#C8A45D]/40 text-[#C8A45D] hover:bg-[#C8A45D] hover:text-stone-950 flex items-center justify-center transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-9 h-9 rounded-full bg-stone-900 border border-[#C8A45D]/40 text-[#C8A45D] hover:bg-[#C8A45D] hover:text-stone-950 flex items-center justify-center transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-[#C8A45D] border border-[#C8A45D]/40 text-xs px-4 py-2.5 rounded-xl font-serif transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>View Google Map</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 mt-8 border-t border-stone-900 text-center text-stone-500 text-[11px] font-sans">
          © {new Date().getFullYear()} Four's Way Hotel Dubai. All Rights Reserved. Royalty & Luxury Redefined.
        </div>
      </footer>
    </div>
  );
};
