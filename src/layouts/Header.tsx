import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Car, MessageSquare, ChevronRight, Calendar } from 'lucide-react';
import { brandConfig } from '@/data/brandConfig';
import { Button } from '@/components/ui/Button';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { isPhoneConfigured, isWhatsAppConfigured, getPhoneUrl, getWhatsAppUrl } from '@/lib/contactUtils';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { openBooking } = useBookingFlow();

  const phoneReady = isPhoneConfigured();
  const whatsappReady = isWhatsAppConfigured();

  // Close mobile drawer on route transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Track scroll position for subtle header elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full transition-shadow duration-200 bg-white">
        {/* Main Navigation Bar */}
        <nav
          aria-label="Main Navigation"
          className={`border-b transition-all duration-200 ${
            isScrolled ? 'border-slate-200 shadow-md bg-white/95 backdrop-blur-md' : 'border-slate-100 bg-white'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
            {/* Brand Logo & Identifier */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
              aria-label={`${brandConfig.brandName} - Return to Homepage`}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-white shadow-md transition-all group-hover:scale-105">
                <Car className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-sans">
                  Subham <span className="text-blue-600">Travelers</span>
                </span>
                <span className="text-[10px] sm:text-xs tracking-wider uppercase font-extrabold text-slate-500">
                  Odisha Intercity Cabs
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {brandConfig.navigation.main.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3.5 py-1.5 text-xs font-bold rounded-full transition-all relative ${
                      isActive
                        ? 'text-blue-700 bg-blue-50 border border-blue-200 shadow-xs'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Action Buttons: Book a Cab & Call Now */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <Button
                variant="book-cab"
                size="sm"
                onClick={() => openBooking({ tripType: 'one-way' })}
                className="font-bold text-xs"
                leftIcon={<Calendar className="w-4 h-4" />}
              >
                Book a Cab
              </Button>

              {phoneReady && (
                <a
                  href={getPhoneUrl()}
                  className="hidden sm:inline-flex"
                  aria-label={`Call Now at ${brandConfig.contact.phoneDisplay}`}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-semibold border-navy-300 text-navy-800"
                    leftIcon={<Phone className="w-3.5 h-3.5 text-brand-600" />}
                  >
                    Call Now
                  </Button>
                </a>
              )}

              {whatsappReady && (
                <a
                  href={getWhatsAppUrl(`Hello ${brandConfig.brandName}, I would like to enquire about cab availability.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex"
                  aria-label="Chat on WhatsApp"
                >
                  <Button
                    variant="whatsapp"
                    size="sm"
                    leftIcon={<MessageSquare className="w-4 h-4" />}
                  >
                    WhatsApp
                  </Button>
                </a>
              )}

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav-menu"
                aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                className="lg:hidden p-2 rounded-lg text-navy-800 hover:bg-navy-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-50 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Content */}
      <div
        id="mobile-nav-menu"
        className={`fixed top-0 right-0 bottom-0 w-5/6 max-w-sm bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-white">
              <Car className="w-4 h-4 text-blue-400" />
            </div>
            <span className="font-bold text-slate-900 text-lg">Subham Travelers</span>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            className="p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="pb-3 mb-2 border-b border-slate-200">
            <Button
              variant="book-cab"
              size="md"
              onClick={() => {
                setIsMobileMenuOpen(false);
                openBooking({ tripType: 'one-way' });
              }}
              className="w-full font-bold justify-center"
              leftIcon={<Calendar className="w-4 h-4" />}
            >
              Book a Cab Online
            </Button>
          </div>

          <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Navigation Menu
          </p>
          {brandConfig.navigation.main.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-800 font-bold border-l-4 border-blue-600'
                    : 'text-slate-800 hover:bg-slate-50'
                }`
              }
            >
              <span>{item.label}</span>
              <ChevronRight className="w-4 h-4 text-navy-400" />
            </NavLink>
          ))}

          <div className="pt-4 mt-4 border-t border-navy-100 space-y-1">
            <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy-400">
              Customer Center
            </p>
            <NavLink
              to="/feedback"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm text-navy-700 hover:bg-navy-50"
            >
              <span>Customer Feedback</span>
              <ChevronRight className="w-4 h-4 text-navy-400" />
            </NavLink>
            <NavLink
              to="/terms"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm text-navy-700 hover:bg-navy-50"
            >
              <span>Terms & Policies</span>
              <ChevronRight className="w-4 h-4 text-navy-400" />
            </NavLink>
          </div>
        </div>

        {/* Drawer Footer Contact */}
        <div className="p-4 sm:p-5 border-t border-navy-100 bg-sand-50 space-y-3">
          {phoneReady && (
            <a
              href={getPhoneUrl()}
              className="flex items-center gap-3 p-3 rounded-lg bg-white border border-navy-200 text-navy-900 font-semibold text-sm hover:border-navy-300 transition-colors shadow-subtle"
            >
              <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-700 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-navy-500 font-normal">Direct Reservation Desk</p>
                <p className="text-sm font-bold text-navy-900">{brandConfig.contact.phoneDisplay}</p>
              </div>
            </a>
          )}

          {whatsappReady && (
            <a
              href={getWhatsAppUrl(`Hello ${brandConfig.brandName}, I would like to book a cab.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block"
            >
              <Button
                variant="whatsapp"
                size="md"
                className="w-full"
                leftIcon={<MessageSquare className="w-4 h-4" />}
              >
                Chat on WhatsApp
              </Button>
            </a>
          )}
        </div>
      </div>
    </>
  );
}
