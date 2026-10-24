import { Tag, ArrowRight, MessageSquare, Zap, CheckCircle2 } from 'lucide-react';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { isWhatsAppConfigured, getWhatsAppUrl } from '@/lib/contactUtils';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface SeasonalDeal {
  id: string;
  route: string;
  label: string;
  discount: string;
  tag: string;
  destination: string;
}

export function MetricsBand() {
  const { openBooking } = useBookingFlow();
  const whatsappReady = isWhatsAppConfigured();

  const seasonalDeals: SeasonalDeal[] = [
    {
      id: 'daringbadi',
      route: 'Berhampur → Daringbadi',
      label: 'Hill Station Winter Excursion • 125 km',
      discount: '15% OFF',
      tag: 'Winter Hill Tour',
      destination: 'Daringbadi',
    },
    {
      id: 'airport',
      route: 'Berhampur → BBI Airport',
      label: 'Flight Catching Guarantee • NH-16 Express',
      discount: '10% OFF',
      tag: 'Airport Drop',
      destination: 'Bhubaneswar Airport (BBI)',
    },
    {
      id: 'puri',
      route: 'Berhampur → Puri Temple',
      label: 'Jagannath Dham Same-Day Darshan • 185 km',
      discount: '15% OFF',
      tag: 'Pilgrimage Special',
      destination: 'Puri Jagannath Temple',
    },
    {
      id: 'taptapani',
      route: 'Berhampur → Taptapani & Jirang',
      label: 'Hot Springs & Tibetan Monastery • 55 km',
      discount: '15% OFF',
      tag: 'Day Excursion',
      destination: 'Taptapani',
    },
  ];

  const handleBookDeal = (destination: string) => {
    openBooking({
      tripType: 'one-way',
      pickupLocation: 'Berhampur',
      dropLocation: destination,
    });
  };

  const handleWhatsAppDeal = (dealRoute: string, discount: string) => {
    if (whatsappReady) {
      const msg = `Hello Subham Travelers, I want to book the ${dealRoute} with the ${discount} Winter & Festival Offer (Code: WINTER15). Please confirm quotation.`;
      window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
    } else {
      handleBookDeal(dealRoute);
    }
  };

  return (
    <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-8 sm:py-10 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-orange-400" />
              <span>Winter & Festival Special Offers</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Flat 10% – 15% OFF on Popular Outstation Runs
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Limited-time seasonal fare discount on cab bookings starting from Berhampur. Use code: <strong className="text-orange-400 font-mono">WINTER15</strong>
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-[11px] bg-orange-500/20 text-orange-300 border border-orange-500/40 px-3 py-1.5 rounded-full font-bold">
              Instant Driver Allotment
            </span>
          </div>
        </div>

        {/* 4 Conversion Deal Cards - Bold Orange with Black Border */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {seasonalDeals.map((deal, idx) => (
            <ScrollReveal key={deal.id} direction="up" delay={idx * 100} distance="20px">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 hover:border-orange-500 transition-all flex flex-col justify-between space-y-3 group h-full shadow-md">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {deal.tag}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-500 text-black border border-black shadow-xs">
                      {deal.discount}
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-white group-hover:text-orange-400 transition-colors">
                    {deal.route}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {deal.label}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleBookDeal(deal.destination)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-black text-xs font-black py-2 px-3 rounded-full transition-all cursor-pointer border-2 border-black shadow-[0_2px_0_0_#000] active:translate-y-0.5"
                  >
                    <span>Book with {deal.discount}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-black" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppDeal(deal.route, deal.discount)}
                    className="w-8 h-8 rounded-full bg-[#1F6F3F] hover:bg-[#155A30] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer border border-black shadow-xs"
                    title="Claim on WhatsApp"
                    aria-label="Claim deal on WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Guarantee Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-1">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Tag className="w-3.5 h-3.5 text-orange-400" />
            <span>Discount applies automatically to Sedan, Ertiga, and Innova Crysta bookings</span>
          </span>
          <span className="text-slate-300 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Free cancellation up to 6 hours before departure</span>
          </span>
        </div>
      </div>
    </section>
  );
}
