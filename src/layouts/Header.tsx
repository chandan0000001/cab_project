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
      <header className="sticky top-0 z-40 w-full transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900">
        {/* Main Navigation Bar */}
        <nav
          aria-label="Main Navigation"
          className={`transition-all duration-300 ${
            isScrolled ? 'shadow-xs bg-white/98' : 'bg-white/90'
          }`}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
            {/* Brand Logo & Identifier */}
            <Link
              to="/"
              className="flex items-center gap-2.5 sm:gap-3 group focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-0.5 shrink-0"
              aria-label={`${brandConfig.brandName} - Return to Homepage`}
            >
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-slate-950 flex items-center justify-center text-blue-400 shadow-sm shrink-0 transition-transform group-hover:scale-105">
                <Car className="w-4 h-4 sm:w-6 sm:h-6 text-blue-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-2xl font-black tracking-tight text-slate-950 leading-none whitespace-nowrap">
                  Subham <span className="text-blue-600">Travelers</span>
                </span>
                <span className="text-[8px] sm:text-[10px] tracking-wider uppercase font-bold text-slate-500 leading-tight mt-1 whitespace-nowrap">
                  ODISHA INTERCITY CABS
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
                    `px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all relative ${
                      isActive
                        ? 'text-blue-600 bg-blue-50 border border-blue-200 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Action Buttons: Book a Cab, Call Now & Mobile Hamburger */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <Button
                variant="primary"
                size="sm"
                onClick={() => openBooking({ tripType: 'one-way' })}
                className="font-bold text-xs min-h-[38px] sm:min-h-[42px] px-3.5 sm:px-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm whitespace-nowrap transition-transform active:scale-95"
                leftIcon={<Calendar className="w-3.5 h-3.5 text-white shrink-0" />}
              >
                <span className="hidden sm:inline">Book a Cab</span>
                <span className="sm:hidden">Book Cab</span>
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
                    className="font-semibold border-slate-200 text-slate-800 bg-white hover:bg-slate-50 text-xs rounded-full min-h-[38px] sm:min-h-[42px] px-3.5"
                    leftIcon={<Phone className="w-3.5 h-3.5 text-blue-600" />}
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
                    className="text-xs rounded-full min-h-[38px] sm:min-h-[42px] px-3.5 bg-[#1F6F3F] hover:bg-[#155A30] text-white font-semibold shadow-sm"
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
                className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 active:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-50 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Content */}
      <div
        id="mobile-nav-menu"
        className={`fixed top-0 right-0 bottom-0 w-5/6 max-w-sm bg-white text-slate-900 z-50 shadow-2xl border-l border-slate-200 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-blue-400">
              <Car className="w-4 h-4 text-blue-400" />
            </div>
            <span className="font-black text-slate-900 text-lg tracking-tight">
              Subham <span className="text-blue-600">Travelers</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="pb-3 mb-2 border-b border-slate-100">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setIsMobileMenuOpen(false);
                openBooking({ tripType: 'one-way' });
              }}
              className="w-full font-bold justify-center min-h-[46px] rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              leftIcon={<Calendar className="w-4 h-4 text-white" />}
            >
              Book a Cab Online
            </Button>
          </div>

          <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Navigation Menu
          </p>
          {brandConfig.navigation.main.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                }`
              }
            >
              <span>{item.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </NavLink>
          ))}

          <div className="pt-4 mt-4 border-t border-slate-100 space-y-1">
            <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Support & Policies
            </p>
            <NavLink
              to="/feedback"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            >
              <span>Customer Feedback</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </NavLink>
            <NavLink
              to="/terms"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            >
              <span>Terms & Policies</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </NavLink>
          </div>
        </div>

        {/* Drawer Footer Contact */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 space-y-3">
          {phoneReady && (
            <a
              href={getPhoneUrl()}
              className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm hover:border-slate-300 transition-colors shadow-2xs"
            >
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-normal">Direct Booking Helpline</p>
                <p className="text-sm font-bold text-slate-900">{brandConfig.contact.phoneDisplay}</p>
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
                className="w-full rounded-full bg-[#1F6F3F] hover:bg-[#155A30] text-white font-semibold text-xs"
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
