import React, { useState, useEffect } from 'react';
import { Calendar, Menu, X, Building2, Sparkles } from 'lucide-react';
import logoImg from '../assets/images/fours_way_royal_logo_1785217821041.jpg';

interface NavbarProps {
  onOpenBookNowSelector: () => void;
  onOpenManagement: () => void;
  onOpenFoodOrdering: () => void;
  onOpenAIAssistant: () => void;
  currentView: 'home' | 'rooms' | 'dining' | 'weddings' | 'contact';
  onSelectView: (view: 'home' | 'rooms' | 'dining' | 'weddings' | 'contact') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBookNowSelector,
  onOpenManagement,
  onOpenAIAssistant,
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
    { name: 'Suites & Rooms', view: 'rooms' as const, isWeddings: false },
    { name: 'Fine Dining', view: 'dining' as const, isWeddings: false },
    { name: '👑 Royal Weddings', view: 'weddings' as const, isWeddings: true },
    { name: 'Experiences', href: '#experiences', isWeddings: false },
    { name: 'Contact Us', view: 'contact' as const, isWeddings: false },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-stone-950/95 backdrop-blur-md py-3 border-b border-amber-900/40 shadow-2xl'
        : 'bg-linear-to-b from-stone-950/90 via-stone-950/60 to-transparent py-5'
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
              className="w-full h-full object-cover object-center"
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

        {/* Desktop & Tablet Nav Links */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3 xl:gap-4 text-[11px] lg:text-xs font-serif font-medium tracking-wide">
          {currentView !== 'home' && (
            <button
              onClick={() => onSelectView('home')}
              className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-full flex items-center gap-1 font-bold transition-all cursor-pointer mr-1 whitespace-nowrap"
            >
              <span>← Hotel Home</span>
            </button>
          )}

          {currentView === 'weddings' ? (
            <>
              {weddingNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-stone-300 hover:text-amber-300 transition-colors py-1 relative group whitespace-nowrap"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </>
          ) : (
            <>
              {homeNavLinks.map((link) => {
                if ('view' in link) {
                  return (
                    <button
                      key={link.name}
                      onClick={() => onSelectView(link.view!)}
                      className={`${currentView === link.view
                        ? 'text-amber-400 font-bold border-b border-amber-400'
                        : link.isWeddings
                          ? 'text-amber-300 hover:text-amber-200 font-bold bg-amber-950/40 border border-amber-500/30 px-2.5 py-0.5 rounded-full'
                          : 'text-stone-300 hover:text-amber-300'
                        } transition-all py-1 relative group cursor-pointer whitespace-nowrap`}
                    >
                      {link.name}
                    </button>
                  );
                }
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-stone-300 hover:text-amber-300 transition-colors py-1 relative group whitespace-nowrap"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full" />
                  </a>
                );
              })}
            </>
          )}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenAIAssistant}
            className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/50 text-xs font-serif font-semibold px-3 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow ring-1 ring-amber-500/30 animate-pulse"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Royal AI</span>
          </button>

          <button
            onClick={onOpenManagement}
            className="bg-stone-900/90 hover:bg-stone-800 text-amber-300 border border-amber-500/40 text-xs font-serif font-semibold px-3 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow"
          >
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Management</span>
          </button>

          <button
            onClick={onOpenBookNowSelector}
            className="bg-linear-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-serif font-bold text-xs px-4 py-2 rounded-lg shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Now</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-amber-200 hover:text-amber-400 p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-950/98 border-b border-amber-900/50 p-6 space-y-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-3 font-serif text-sm">
            {currentView !== 'home' && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSelectView('home');
                }}
                className="text-left bg-amber-500/10 text-amber-300 border border-amber-500/40 px-3 py-2 rounded-lg font-bold flex items-center gap-2"
              >
                <span>← Switch to Main Hotel Home</span>
              </button>
            )}

            {currentView === 'weddings' ? (
              <>
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
                {homeNavLinks.map((link) => {
                  if ('view' in link) {
                    return (
                      <button
                        key={link.name}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onSelectView(link.view!);
                        }}
                        className={`text-left py-1 border-b border-stone-800/60 ${currentView === link.view!
                          ? 'text-amber-400 font-bold'
                          : link.isWeddings
                            ? 'text-amber-300 font-bold'
                            : 'text-stone-200 hover:text-amber-300'
                          }`}
                      >
                        {link.name}
                      </button>
                    );
                  }
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-stone-200 hover:text-amber-300 py-1 border-b border-stone-800/60"
                    >
                      {link.name}
                    </a>
                  );
                })}
              </>
            )}
          </nav>

          <div className="pt-2 flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAIAssistant();
              }}
              className="w-full bg-amber-500/10 text-amber-300 border border-amber-500/50 text-xs font-serif font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Royal AI Assistant</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenManagement();
              }}
              className="w-full bg-stone-900 text-amber-300 border border-amber-500/40 text-xs font-serif font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Management Portal</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookNowSelector();
              }}
              className="w-full bg-amber-500 text-stone-950 font-serif font-bold text-xs px-4 py-2.5 rounded-lg flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
