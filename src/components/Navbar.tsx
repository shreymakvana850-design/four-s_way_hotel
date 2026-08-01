import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, ShieldCheck, Utensils, Building2 } from 'lucide-react';
import logoImg from '../assets/images/fours_way_logo_1785079291655.jpg';

interface NavbarProps {
  onOpenBookNowSelector: () => void;
  onOpenManagement: () => void;
  onOpenFoodOrdering: () => void;
  currentView: 'home' | 'weddings';
  onSelectView: (view: 'home' | 'weddings') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBookNowSelector,
  onOpenManagement,
  onOpenFoodOrdering,
  currentView,
  onSelectView,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const homeNavLinks = [
    { name: 'About Us', href: '#welcome', isWeddings: false },
    { name: 'Suites & Rooms', href: '#suites', isWeddings: false },
    { name: 'Fine Dining', href: '#dining', isWeddings: false },
    { name: '👑 Royal Weddings', href: '#wedding-hero', isWeddings: true },
    { name: 'Experiences', href: '#experiences', isWeddings: false },
    { name: 'Contact Us', href: '#contact', isWeddings: false },
  ];

  const weddingNavLinks = [
    { name: 'Overview', href: '#wedding-hero' },
    { name: 'Experiences', href: '#wedding-experience' },
    { name: 'Venues', href: '#wedding-venues' },
    { name: 'Gallery', href: '#wedding-gallery' },
    { name: 'Packages', href: '#wedding-packages' },
    { name: 'Why Us', href: '#why-choose-us' },
    { name: 'Enquiry', href: '#wedding-enquiry' },
    { name: 'FAQ', href: '#wedding-faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-stone-950/95 backdrop-blur-md py-3 border-b border-amber-900/40 shadow-2xl'
          : 'bg-gradient-to-b from-stone-950/90 via-stone-950/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => onSelectView('home')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full overflow-hidden border border-amber-500/50 shadow-lg flex items-center justify-center bg-stone-900 group-hover:border-amber-400 group-hover:scale-105 transition-all shrink-0 ring-2 ring-amber-500/20">
            <img
              src={logoImg}
              alt="Four's Way Hotel Logo"
              className="w-full h-full object-cover object-center scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="font-serif font-bold text-amber-100 text-base sm:text-lg tracking-wide block leading-tight">
              FOUR'S WAY HOTEL
            </span>
            <span className="text-[10px] text-amber-400/90 uppercase tracking-widest block font-sans">
              50 Years of Royal Luxury • Dubai
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-4 text-xs font-serif font-medium tracking-wide">
          {currentView === 'weddings' ? (
            <>
              <button
                onClick={() => onSelectView('home')}
                className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full flex items-center gap-1.5 font-bold transition-all cursor-pointer mr-2"
              >
                <span>← Hotel Home</span>
              </button>

              {weddingNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-stone-300 hover:text-amber-300 transition-colors py-1 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </>
          ) : (
            <>
              {homeNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (link.isWeddings) {
                      e.preventDefault();
                      onSelectView('weddings');
                    }
                  }}
                  className={`transition-colors py-1 relative group cursor-pointer ${
                    link.isWeddings
                      ? 'text-amber-400 hover:text-amber-300 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/40'
                      : 'text-stone-300 hover:text-amber-300'
                  }`}
                >
                  {link.name}
                  {!link.isWeddings && (
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full" />
                  )}
                </a>
              ))}
            </>
          )}

          <button
            onClick={onOpenFoodOrdering}
            className="text-stone-300 hover:text-amber-300 transition-colors py-1 relative group cursor-pointer"
          >
            Food Menu
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full" />
          </button>
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenManagement}
            className="bg-stone-900/90 hover:bg-stone-800 text-amber-300 border border-amber-500/40 text-xs font-serif font-semibold px-3 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow"
          >
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Management</span>
          </button>

          <button
            onClick={onOpenBookNowSelector}
            className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-serif font-bold text-xs px-4 py-2 rounded-lg shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Now</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden text-amber-200 hover:text-amber-400 p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-stone-950/98 border-b border-amber-900/50 p-6 space-y-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-3 font-serif text-sm">
            {currentView === 'weddings' ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSelectView('home');
                  }}
                  className="text-left bg-amber-500/10 text-amber-300 border border-amber-500/40 px-3 py-2 rounded-lg font-bold flex items-center gap-2"
                >
                  <span>← Switch to Main Hotel Home</span>
                </button>

                {weddingNavLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-stone-200 hover:text-amber-300 py-1 border-b border-stone-800/60"
                  >
                    {link.name}
                  </a>
                ))}
              </>
            ) : (
              <>
                {homeNavLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (link.isWeddings) {
                        e.preventDefault();
                        onSelectView('weddings');
                      }
                    }}
                    className={`py-1 border-b border-stone-800/60 ${
                      link.isWeddings
                        ? 'text-amber-400 font-bold flex items-center gap-2'
                        : 'text-stone-200 hover:text-amber-300'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenFoodOrdering();
              }}
              className="text-left text-stone-200 hover:text-amber-300 py-1 border-b border-stone-800/60"
            >
              Food Menu
            </button>
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookNowSelector();
              }}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 font-serif font-bold text-xs py-3 rounded-lg shadow cursor-pointer text-center"
            >
              Book Now (Rooms, Tables, Food)
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenManagement();
              }}
              className="w-full bg-stone-900 text-amber-300 border border-amber-500/40 font-serif font-bold text-xs py-2.5 rounded-lg shadow cursor-pointer text-center flex items-center justify-center gap-1.5"
            >
              <Building2 className="w-4 h-4 text-amber-400" /> Room & Customer Management
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

