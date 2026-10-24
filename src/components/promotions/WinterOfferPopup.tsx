import { useState, useEffect } from 'react';
import { Sparkles, X, Copy, Check, MessageSquare, ArrowRight, Tag, Gift, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { isWhatsAppConfigured, getWhatsAppUrl } from '@/lib/contactUtils';

export function WinterOfferPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const { openBooking } = useBookingFlow();
  const whatsappReady = isWhatsAppConfigured();

  const promoCode = 'WINTER15';

  // Automatically hide floating trigger when user reaches or nears the footer
  useEffect(() => {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsFooterVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.02,
        rootMargin: '0px 0px 50px 0px',
      }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Check if user has already dismissed in this session
    const dismissed = sessionStorage.getItem('st_winter_offer_dismissed');
    if (dismissed) return;

    let hasScrolledDown = false;
    let lastScrollY = window.scrollY;
    let triggered = false;

    const triggerPopup = () => {
      if (triggered) return;
      if (sessionStorage.getItem('st_winter_offer_dismissed')) return;
      triggered = true;
      setIsOpen(true);
      cleanup();
    };

    // 1. Mandatory Scroll Up trigger: when user scrolls down and then scrolls upward
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 40) {
        hasScrolledDown = true;
      }
      if (hasScrolledDown && lastScrollY - currentScrollY > 15) {
        triggerPopup();
      }
      lastScrollY = currentScrollY;
    };

    // 2. Mandatory Touch / Window Interaction trigger: when user touches or clicks the window
    const handleTouchOrClick = (e: Event) => {
      const target = e.target as HTMLElement | null;
      // Do not prematurely trigger if user is interacting with close/reopen controls
      if (
        target?.closest('button[aria-label="Close offer popup"]') ||
        target?.closest('button[aria-label="Open Winter Offer: 15% OFF"]')
      ) {
        return;
      }
      triggerPopup();
    };

    // 3. Desktop exit intent: mouse moves toward browser chrome / tab bar
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) {
        triggerPopup();
      }
    };

    const cleanup = () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchOrClick);
      window.removeEventListener('pointerdown', handleTouchOrClick);
      window.removeEventListener('click', handleTouchOrClick);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchOrClick, { passive: true });
    window.addEventListener('pointerdown', handleTouchOrClick, { passive: true });
    window.addEventListener('click', handleTouchOrClick, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cleanup();
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('st_winter_offer_dismissed', 'true');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleClaimBooking = () => {
    handleClose();
    openBooking({
      tripType: 'one-way',
      pickupLocation: 'Berhampur',
    });
  };

  const handleWhatsAppClaim = () => {
    handleClose();
    if (whatsappReady) {
      const msg = `Hello Subham Travelers, I want to claim the 15% Winter & Festival Discount (Promo Code: ${promoCode}) for a cab booking from Berhampur.`;
      window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
    }
  };

  if (!isOpen) {
    // When user scrolls down to footer, completely hide floating badge to prevent covering footer links
    if (isFooterVisible) {
      return null;
    }

    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2 bg-slate-950 text-white min-h-[48px] py-2.5 px-4 rounded-full text-xs font-bold shadow-xl hover:bg-slate-900 transition-all duration-300 cursor-pointer border border-blue-500/50 hover:scale-105 animate-in fade-in"
        aria-label="Open Winter Offer: 15% OFF"
      >
        <Gift className="w-4 h-4 text-blue-400" />
        <span>Winter Offer: 15% OFF</span>
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="winter-offer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900">
        {/* Executive Midnight & Royal Blue Header (Zero Harsh Orange) */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-5 sm:p-6 pb-6 sm:pb-8 relative overflow-hidden text-center">
          {/* Subtle Decorative Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-28 h-28 bg-blue-400/10 rounded-full blur-xl pointer-events-none" />

          {/* Top Bar with Badge & In-Flow Close Button (Zero Overflow) */}
          <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider truncate">
              <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate">Winter & Festival Special</span>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Close offer popup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 id="winter-offer-title" className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
            Flat 10% – 15% OFF
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 max-w-xs mx-auto">
            On all Outstation Cabs & Airport Drops Starting from Berhampur!
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 -mt-3 bg-white rounded-t-3xl relative space-y-4">
          {/* Promo Code Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Use Promo Code</p>
                <p className="text-base font-black text-slate-900 tracking-wider font-mono">{promoCode}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              aria-label="Copy promotional code WINTER15"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-100 transition-colors shadow-xs cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Applied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-blue-600" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Value Points */}
          <div className="space-y-2 text-xs text-slate-700 pt-1">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 text-emerald-700" />
              </span>
              <span><strong>15% Instant Savings:</strong> Daringbadi, Puri, Gopalpur & Taptapani tours</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 text-emerald-700" />
              </span>
              <span><strong>10% Off:</strong> Berhampur to Bhubaneswar Airport transfers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 text-emerald-700" />
              </span>
              <span><strong>Doorstep Pickup:</strong> In Berhampur with verified commercial AC cabs</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-200 text-center">
            <p className="text-[11px] text-blue-800 font-bold flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Limited seasonal allocation for bookings from Berhampur
            </p>
          </div>

          {/* High-Converting Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <Button
              variant="primary"
              size="lg"
              onClick={handleClaimBooking}
              className="w-full justify-center text-sm font-bold shadow-md min-h-[46px]"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Claim 15% OFF & Book Cab Now
            </Button>

            {whatsappReady && (
              <button
                type="button"
                onClick={handleWhatsAppClaim}
                aria-label="Claim 15 percent discount via WhatsApp"
                className="w-full flex items-center justify-center gap-2 bg-[#1F6F3F] hover:bg-[#155A30] active:bg-[#0F4222] text-white py-3 px-4 min-h-[44px] rounded-full text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Claim 15% via WhatsApp (1-Tap Fast)</span>
              </button>
            )}
          </div>

          <div className="text-center pt-1">
            <button
              type="button"
              onClick={handleClose}
              className="text-xs text-slate-400 hover:text-slate-600 font-medium transition-colors cursor-pointer"
            >
              Continue browsing without discount
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
