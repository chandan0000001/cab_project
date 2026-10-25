import { Link } from 'react-router-dom';
import { 
  Car, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { brandConfig } from '@/data/brandConfig';
import { isPhoneConfigured, isWhatsAppConfigured, getPhoneUrl, getWhatsAppUrl } from '@/lib/contactUtils';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const phoneReady = isPhoneConfigured();
  const whatsappReady = isWhatsAppConfigured();

  return (
    <footer id="site-footer" className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Sleek Trust Bar */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-bold text-white">Verified Chauffeur Fleet</span>
            <span className="text-slate-500 hidden sm:inline">• Verified Highway Drivers & GPS Tracked</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold">24×7 Berhampur Dispatch Active</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. MOBILE-ONLY ULTRA-COMPACT FOOTER (Prevents heavy vertical list dumps) */}
      {/* ========================================================================= */}
      <div className="sm:hidden px-4 py-6 space-y-4 text-center">
        {/* Brand Identity */}
        <div className="flex items-center justify-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 shrink-0">
            <Car className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-base font-black text-white">
            Subham <span className="text-blue-500 text-xs tracking-wider uppercase font-bold">Travelers</span>
          </span>
          <span className="text-[10px] text-slate-400 border-l border-slate-700 pl-2">
            Berhampur Cabs
          </span>
        </div>

        {/* 2 Quick Mobile Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {phoneReady && (
            <a
              href={getPhoneUrl()}
              aria-label={`Call Subham Travelers at ${brandConfig.contact.phoneDisplay}`}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 min-h-[44px] rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold hover:bg-slate-800 active:bg-slate-800 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>Call Desk</span>
            </a>
          )}

          {whatsappReady && (
            <a
              href={getWhatsAppUrl('Hello Subham Travelers, I have a cab enquiry.')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enquire on WhatsApp"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 min-h-[44px] rounded-xl bg-[#1F6F3F] text-white text-xs font-bold hover:bg-[#155A30] active:bg-[#0F4222] transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          )}
        </div>

        {/* Mobile Quick Links - Full WCAG & Lighthouse Compliant Touch Targets (min 44px) */}
        <div className="grid grid-cols-3 gap-2 text-xs pt-1">
          <Link
            to="/routes"
            className="flex items-center justify-center min-h-[44px] px-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 font-medium transition-colors"
          >
            All Routes
          </Link>
          <Link
            to="/fleet"
            className="flex items-center justify-center min-h-[44px] px-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 font-medium transition-colors"
          >
            Our Fleet
          </Link>
          <Link
            to="/destinations"
            className="flex items-center justify-center min-h-[44px] px-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 font-medium transition-colors"
          >
            Destinations
          </Link>
          <Link
            to="/about"
            className="flex items-center justify-center min-h-[44px] px-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 font-medium transition-colors"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="flex items-center justify-center min-h-[44px] px-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 font-medium transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/terms"
            className="flex items-center justify-center min-h-[44px] px-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 font-medium transition-colors"
          >
            Terms & Safety
          </Link>
        </div>

        {/* Station Road Address & Copyright in 2 Lines */}
        <div className="pt-2 border-t border-slate-900 text-xs text-slate-400 space-y-1">
          <p className="flex items-center justify-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>Station Road, Berhampur (BAM), Odisha</span>
          </p>
          <p>© {currentYear} {brandConfig.brandName}. All rights reserved.</p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP-ONLY STRUCTURED 4-COLUMN FOOTER (Hidden on mobile)           */}
      {/* ========================================================================= */}
      <div className="hidden sm:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-8 border-b border-slate-800">
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 shadow-sm shrink-0">
                <Car className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white block">
                  Subham <span className="text-blue-500 text-xs tracking-widest uppercase font-bold">Travelers</span>
                </span>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-0.5">
                  ODISHA INTERCITY CABS
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Silk City's direct transport service. Providing point-to-point one-way cabs, dedicated round trips, airport drops, and temple pilgrimage tours across Odisha.
            </p>

            {/* Direct Contact Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              {phoneReady && (
                <a
                  href={getPhoneUrl()}
                  className="inline-flex items-center gap-2 text-xs text-white hover:text-blue-400 transition-colors font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Call: {brandConfig.contact.phoneDisplay}</span>
                </a>
              )}

              {whatsappReady && (
                <a
                  href={getWhatsAppUrl('Hello Subham Travelers, I have a cab enquiry.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>WhatsApp Reservation Desk</span>
                </a>
              )}

              <div className="flex items-start gap-2 text-xs text-slate-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>Station Road, Berhampur (Brahmapur), Ganjam, Odisha - 760001</span>
              </div>
            </div>
          </div>

          {/* Column 2: Popular Berhampur Routes */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Top Routes from Berhampur
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/routes" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Bhubaneswar Airport</span>
                </Link>
              </li>
              <li>
                <Link to="/routes" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Puri Jagannath Temple</span>
                </Link>
              </li>
              <li>
                <Link to="/routes" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Daringbadi Hill Station</span>
                </Link>
              </li>
              <li>
                <Link to="/routes" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Gopalpur Beach & Tampara</span>
                </Link>
              </li>
              <li>
                <Link to="/routes" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Taptapani Hot Springs & Jirang</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Commercial Fleet */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Commercial Fleet Classes
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/fleet" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Maruti Suzuki Dzire (Sedan • 4+1)</span>
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Maruti Suzuki Ertiga (MPV • 6+1)</span>
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Toyota Innova Crysta (SUV • 7+1)</span>
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Force Tempo Traveller (17-Seater)</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>MKCG Hospital & Station Transit</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Information & Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>About Subham Travelers</span>
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Passenger Reviews & Feedback</span>
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Odisha Destination Guide</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Clean Coordinates & Email Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pt-6">
          <p>© {currentYear} {brandConfig.brandName}. All rights reserved.</p>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href={`mailto:${brandConfig.contact.email}`}
              aria-label={`Send email to ${brandConfig.contact.email}`}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>{brandConfig.contact.email}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
