import { useState } from 'react';
import { 
  Tag, 
  ArrowRight, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  Copy, 
  Check, 
  Plane, 
  Mountain, 
  Landmark, 
  Car, 
  CheckCircle2, 
  Clock, 
  Flame,
  LucideIcon 
} from 'lucide-react';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { isWhatsAppConfigured, getWhatsAppUrl } from '@/lib/contactUtils';

interface VehicleOption {
  id: string;
  name: string;
  shortName: string;
  seats: string;
}

const VEHICLE_OPTIONS: VehicleOption[] = [
  { id: 'dzire', name: 'Maruti Suzuki Dzire', shortName: 'Sedan', seats: '4+1 AC' },
  { id: 'ertiga', name: 'Maruti Suzuki Ertiga', shortName: 'Ertiga', seats: '6+1 AC' },
  { id: 'innova', name: 'Toyota Innova Crysta', shortName: 'Innova', seats: '7+1 VIP' },
];

interface SeasonalDeal {
  id: string;
  category: 'all' | 'airport' | 'hill' | 'temple';
  route: string;
  destination: string;
  distance: string;
  duration: string;
  tag: string;
  discount: string;
  highlight: string;
  features: string[];
  icon: LucideIcon;
  badge: string;
}

const SEASONAL_DEALS: SeasonalDeal[] = [
  {
    id: 'airport',
    category: 'airport',
    route: 'Berhampur → Bhubaneswar Airport',
    destination: 'Bhubaneswar Airport',
    distance: '170 km',
    duration: '~3.5 Hours',
    tag: 'Flight Catching',
    discount: '10% OFF',
    highlight: 'Direct NH-16 express drop to Terminal departure gate',
    features: ['Flight delay buffer guarantee', 'Toll receipt transparency', 'Clean AC interior'],
    icon: Plane,
    badge: 'BBI Express',
  },
  {
    id: 'daringbadi',
    category: 'hill',
    route: 'Berhampur → Daringbadi',
    destination: 'Daringbadi',
    distance: '125 km',
    duration: '~3.5 Hours',
    tag: 'Kashmir of Odisha',
    discount: '15% OFF',
    highlight: 'Hill station tour: Pine forests, coffee gardens & Midubanda falls',
    features: ['Ghats hairpin safety expert', 'Sightseeing wait included', 'Chilled mountain AC'],
    icon: Mountain,
    badge: 'Winter Special',
  },
  {
    id: 'puri',
    category: 'temple',
    route: 'Berhampur → Puri Temple',
    destination: 'Puri Jagannath Temple',
    distance: '185 km',
    duration: '~4.5 Hours',
    tag: 'Pilgrimage Special',
    discount: '15% OFF',
    highlight: 'Same-day Jagannath Dham darshan with temple waiting time',
    features: ['Temple parking wait included', 'Senior citizen care', 'Doorstep Berhampur pickup'],
    icon: Landmark,
    badge: 'Holy Dham',
  },
  {
    id: 'taptapani',
    category: 'hill',
    route: 'Berhampur → Taptapani & Jirang',
    destination: 'Taptapani',
    distance: '85 km',
    duration: '~2.5 Hours',
    tag: 'Monastery Circuit',
    discount: '15% OFF',
    highlight: 'Sulfur hot water springs & Chandragiri Tibetan Monastery',
    features: ['Tibetan settlement excursion', 'Ghat road safety certified', 'Same-day return option'],
    icon: Sparkles,
    badge: 'Day Excursion',
  },
];

export function MetricsBand() {
  const { openBooking } = useBookingFlow();
  const whatsappReady = isWhatsAppConfigured();

  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'airport' | 'hill' | 'temple'>('all');
  const [selectedVehicles, setSelectedVehicles] = useState<Record<string, string>>({
    airport: 'dzire',
    daringbadi: 'ertiga',
    puri: 'ertiga',
    taptapani: 'dzire',
  });

  const handleCopyPromo = () => {
    navigator.clipboard.writeText('WINTER15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleBookDeal = (deal: SeasonalDeal) => {
    openBooking({
      tripType: 'one-way',
      pickupLocation: 'Berhampur',
      dropLocation: deal.destination,
    });
  };

  const handleWhatsAppDeal = (deal: SeasonalDeal) => {
    const vehicleId = selectedVehicles[deal.id] || 'dzire';
    const vehicleObj = VEHICLE_OPTIONS.find((v) => v.id === vehicleId);
    const vehicleName = vehicleObj ? vehicleObj.name : 'Cab';

    if (whatsappReady) {
      const msg = `Hello Subham Travelers, I want to book the ${deal.route} with ${vehicleName} using the ${deal.discount} Winter & Festival Offer (Code: WINTER15). Please provide quotation.`;
      window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
    } else {
      handleBookDeal(deal);
    }
  };

  const filteredDeals = activeCategory === 'all'
    ? SEASONAL_DEALS
    : SEASONAL_DEALS.filter((deal) => deal.category === activeCategory);

  return (
    <section className="bg-slate-950 text-white py-8 sm:py-12 border-y border-slate-800 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        {/* Interactive Header & Promo Code Tool */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 border-b border-slate-800/80 pb-5">
          <div className="space-y-2 max-w-2xl">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Winter & Festival Special Offers</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Flat 10% – 15% OFF on Outstation Runs
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Seasonal fare discounts on commercial yellow-plate cabs departing from Berhampur. Tap fleet classes below to customize your trip:
            </p>

            {/* Interactive Promo Code Action */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="text-xs text-slate-400 font-medium">Promo Voucher:</span>
              <button
                type="button"
                onClick={handleCopyPromo}
                aria-label="Copy WINTER15 Promo Code"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 active:bg-amber-400/35 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold transition-all cursor-pointer shadow-xs group"
              >
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span className="tracking-wider text-sm">WINTER15</span>
                {copied ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-emerald-400 bg-emerald-950/90 px-2 py-0.5 rounded-md border border-emerald-500/40 animate-in fade-in">
                    <Check className="w-3 h-3" /> Copied!
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold text-amber-200/90 group-hover:text-white transition-colors">
                    <Copy className="w-3 h-3" /> Click to Copy
                  </span>
                )}
              </button>
              <span className="text-[11px] text-slate-400">
                (Applies instantly at enquiry)
              </span>
            </div>
          </div>

          {/* Interactive Route Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar shrink-0">
            {(
              [
                { id: 'all', label: 'All Deals (4)', icon: Sparkles },
                { id: 'airport', label: 'Airport Drops', icon: Plane },
                { id: 'hill', label: 'Hill Stations', icon: Mountain },
                { id: 'temple', label: 'Pilgrimage', icon: Landmark },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  aria-pressed={isSelected}
                  className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md border border-blue-400/50'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredDeals.map((deal) => {
            const DealIcon = deal.icon;
            const chosenVehicleId = selectedVehicles[deal.id] || 'dzire';
            const chosenVehicle = VEHICLE_OPTIONS.find((v) => v.id === chosenVehicleId) || VEHICLE_OPTIONS[0];

            return (
              <div
                key={deal.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/60 hover:bg-slate-850/90 transition-all duration-200 flex flex-col justify-between space-y-4 group shadow-sm hover:shadow-xl relative overflow-hidden"
              >
                {/* Top Header Badge & Discount */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-blue-400">
                      <DealIcon className="w-3.5 h-3.5 text-blue-400" />
                      <span>{deal.tag}</span>
                    </span>
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-xs flex items-center gap-1">
                      <Flame className="w-3 h-3 text-slate-950" />
                      <span>{deal.discount}</span>
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-black text-white group-hover:text-blue-300 transition-colors leading-snug">
                      {deal.route}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 font-medium">
                      <Clock className="w-3 h-3 text-slate-500 shrink-0" />
                      <span>{deal.duration} • {deal.distance}</span>
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                    {deal.highlight}
                  </p>

                  {/* Interactive Fleet Selector Pills */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span>Select Vehicle:</span>
                      <span className="text-blue-400">{chosenVehicle.seats}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {VEHICLE_OPTIONS.map((v) => {
                        const isChosen = chosenVehicleId === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() =>
                              setSelectedVehicles((prev) => ({ ...prev, [deal.id]: v.id }))
                            }
                            className={`py-1.5 px-2 min-h-[36px] rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                              isChosen
                                ? 'bg-blue-600 text-white shadow-xs border border-blue-400'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                            }`}
                          >
                            {v.shortName}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Features Mini Checklist */}
                  <div className="space-y-1 pt-1 border-t border-slate-800/80">
                    {deal.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Dual Action CTA Buttons */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleBookDeal(deal)}
                    aria-label={`Book ${deal.route} in ${chosenVehicle.name} with ${deal.discount}`}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-bold py-2.5 px-3 min-h-[44px] rounded-xl transition-all cursor-pointer shadow-md hover:shadow-blue-500/20 active:scale-[0.98]"
                  >
                    <span>Book {chosenVehicle.shortName} ({deal.discount})</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppDeal(deal)}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-sm active:scale-95"
                    title={`Claim ${deal.discount} on WhatsApp for ${chosenVehicle.name}`}
                    aria-label={`Claim ${deal.discount} deal for ${deal.route} in ${chosenVehicle.name} on WhatsApp`}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Interactive Guarantee Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Car className="w-3.5 h-3.5 text-blue-400" />
            <span>Offer active on Sedan Dzire, Ertiga MPV, and Innova Crysta</span>
          </span>
          <span className="text-slate-300 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero surge pricing • Free cancellation up to 6 hours before pickup</span>
          </span>
        </div>
      </div>
    </section>
  );
}
