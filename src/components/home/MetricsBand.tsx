import { Tag, ArrowRight, MessageSquare, Sparkles, ShieldCheck } from 'lucide-react';
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
    <section className="bg-slate-950 text-white py-8 sm:py-10 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Winter & Festival Special Offers</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Flat 10% – 15% OFF on Popular Outstation Runs
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Limited-time seasonal fare discount on cab bookings starting from Berhampur. Use code:{' '}
              <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono font-bold border border-amber-400/30">
                WINTER15
              </span>
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs bg-slate-850 text-slate-200 border border-slate-700/80 px-3.5 py-1.5 rounded-full font-medium">
              Instant Chauffeur Dispatch
            </span>
          </div>
        </div>

        {/* 4 Conversion Deal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {seasonalDeals.map((deal, idx) => (
            <ScrollReveal key={deal.id} direction="up" delay={idx * 100} distance="20px">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 hover:bg-slate-850/80 transition-all duration-200 flex flex-col justify-between space-y-4 group h-full shadow-sm hover:shadow-lg">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {deal.tag}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-xs">
                      {deal.discount}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {deal.route}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {deal.label}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleBookDeal(deal.destination)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 text-xs font-bold py-2.5 px-3 rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.98]"
                  >
                    <span>Book with {deal.discount}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppDeal(deal.route, deal.discount)}
                    className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-sm active:scale-95"
                    title="Claim on WhatsApp"
                    aria-label="Claim deal on WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Guarantee Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-1">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            <span>Discount applies automatically to Sedan, Ertiga, and Innova Crysta bookings</span>
          </span>
          <span className="text-slate-300 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Free cancellation up to 6 hours before departure</span>
          </span>
        </div>
      </div>
    </section>
  );
}
