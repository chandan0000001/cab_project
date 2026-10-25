import { useState } from 'react';
import { MessageSquare, Phone, X } from 'lucide-react';
import { brandConfig } from '@/data/brandConfig';
import { isPhoneConfigured, isWhatsAppConfigured, getPhoneUrl, getWhatsAppUrl } from '@/lib/contactUtils';

export function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneReady = isPhoneConfigured();
  const whatsappReady = isWhatsAppConfigured();

  const handleWhatsAppClick = () => {
    window.open(
      getWhatsAppUrl('Hello Subham Travelers, I would like to enquire about booking a cab.'),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Expanded quick drawer */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-elevated border border-slate-200 p-4 w-72 sm:w-80 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-navy-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-navy-950 uppercase tracking-wider">
                Direct Dispatch Desk
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 rounded-full hover:bg-sand-100 flex items-center justify-center text-navy-400 hover:text-navy-900 transition-colors"
              aria-label="Close contact drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-navy-600 leading-relaxed">
            Need an instant quote or vehicle advice? Chat directly with our Berhampur operations desk:
          </p>

          <div className="space-y-2 pt-1">
            {whatsappReady ? (
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="w-full flex items-center justify-center gap-2 bg-[#1F6F3F] hover:bg-[#155A30] text-white py-2.5 px-4 rounded-full text-xs font-bold shadow-whatsapp transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp (Instant)</span>
              </button>
            ) : (
              <div className="p-2 text-[11px] bg-sand-100 text-navy-600 rounded-lg text-center">
                WhatsApp Desk: +{brandConfig.contact.whatsappRaw} (Pending Setup)
              </div>
            )}

            {phoneReady ? (
              <a
                href={getPhoneUrl()}
                className="w-full flex items-center justify-center gap-2 bg-navy-950 hover:bg-black text-white py-2.5 px-4 rounded-full text-xs font-bold shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <Phone className="w-3.5 h-3.5 text-brand-400" />
                <span>Call {brandConfig.contact.phoneDisplay}</span>
              </a>
            ) : (
              <div className="p-2 text-[11px] bg-sand-100 text-navy-600 rounded-lg text-center">
                Direct Support: {brandConfig.contact.phoneDisplay} (Pending Setup)
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-[#1F6F3F] hover:bg-[#155A30] text-white py-3 px-5 rounded-full shadow-elevated border-2 border-white/80 transition-all hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/30"
        aria-label="Direct booking contact options"
        aria-expanded={isOpen}
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
        </span>
        <MessageSquare className="w-5 h-5 text-white" />
        <span className="text-xs font-extrabold tracking-wide hidden sm:inline">
          {isOpen ? 'Close' : 'Direct Dispatch Desk'}
        </span>
      </button>
    </div>
  );
}
