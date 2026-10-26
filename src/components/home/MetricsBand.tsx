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
  CheckCircle2, 
  Clock, 
  Flame,
  LucideIcon 
} from 'lucide-react';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { isWhatsAppConfigured, getWhatsAppUrl } from '@/lib/contactUtils';
import { sound } from '@/lib/sound';

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
    badge: 'Special Tour',
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
    badge: 'Pilgrimage',
  },
  {
    id: 'taptapani',
    category: 'hill',
    route: 'Berhampur → Taptapani & Jirang',
    destination: 'Taptapani Hot Springs',
    distance: '85 km',
    duration: '~2.5 Hours',
    tag: 'Monastery Circuit',
    discount: '15% OFF',
    highlight: 'Sulfur hot springs bath & Chandragiri Tibetan Buddhist monastery',
    features: ['Tibetan settlement excursion', 'Ghat road safety certified', 'Same-day return option'],
    icon: Mountain,
    badge: 'Scenic Hill',
  },
];

export function MetricsBand() {
  const [selectedVehicles, setSelectedVehicles] = useState<Record<string, string>>({
    airport: 'dzire',
    daringbadi: 'ertiga',
    puri: 'ertiga',
    taptapani: 'dzire',
  });
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'airport' | 'hill' | 'temple'>('all');
  const { openBooking } = useBookingFlow();
  const whatsappReady = isWhatsAppConfigured();

  const handleCopyPromo = () => {
    sound.playCopy();
    navigator.clipboard.writeText('WINTER15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleBookDeal = (deal: SeasonalDeal) => {
    sound.playQuote();
    const vehicleId = selectedVehicles[deal.id] || 'dzire';
    const vehicleObj = VEHICLE_OPTIONS.find((v) => v.id === vehicleId);
    openBooking({
      tripType: 'one-way',
      pickupLocation: 'Berhampur',
      dropLocation: deal.destination,
      vehiclePreference: vehicleObj ? vehicleObj.name : undefined,
    });
  };

  const handleWhatsAppDeal = (deal: SeasonalDeal) => {
    sound.playWhatsApp();
    const vehicleId = selectedVehicles[deal.id] || 'dzire';
    const vehicleObj = VEHICLE_OPTIONS.find((v) => v.id === vehicleId);
    const vehicleName = vehicleObj ? vehicleObj.name : 'Cab';

    if (whatsappReady) {
      const msg = `Hello Subham Travelers, I want to book the ${deal.route} with ${vehicleName} using the ${deal.discount} special fare offer (Code: WINTER15). Please provide quotation.`;
      window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
    } else {
      handleBookDeal(deal);
    }
  };

  const filteredDeals = activeCategory === 'all'
    ? SEASONAL_DEALS
    : SEASONAL_DEALS.filter((deal) => deal.category === activeCategory);

  return (
    <section className="bg-white text-slate-900 py-10 sm:py-16 border-y border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Signature Corridors • Direct Silk City Cabs</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Popular Highway Routes & <span className="text-blue-600">Fixed Tariffs</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Dedicated chauffeur-driven AC cabs departing from Berhampur. Select your vehicle class below for instant transparent quotes:
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="text-xs text-slate-600 font-semibold">Special Offer:</span>
              <button
                type="button"
                onClick={handleCopyPromo}
                aria-label="Copy WINTER15 Promo Code"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 active:bg-blue-200 border border-blue-200 text-blue-700 text-xs font-mono font-bold transition-all cursor-pointer shadow-2xs group"
              >
                <Tag className="w-3.5 h-3.5 text-blue-600" />
                <span className="tracking-wider text-xs">CODE: WINTER15</span>
                {copied ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-sans font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <Check className="w-3 h-3" /> Copied!
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-sans font-semibold text-blue-600 group-hover:text-blue-800 transition-colors">
                    <Copy className="w-3 h-3" /> Click to Copy
                  </span>
                )}
              </button>
              <span className="text-xs text-slate-600">
                (Flat 15% outstation discount applied at enquiry)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden shrink-0">
            {(
              [
                { id: 'all', label: 'All Routes (4)', icon: Sparkles },
                { id: 'airport', label: 'Airport Drops', icon: Plane },
                { id: 'hill', label: 'Hill Tours', icon: Mountain },
                { id: 'temple', label: 'Pilgrimage Dham', icon: Landmark },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    sound.playTap();
                    setActiveCategory(tab.id);
                  }}
                  aria-pressed={isSelected}
                  className={`min-h-[40px] px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredDeals.map((deal) => {
            const DealIcon = deal.icon;
            const chosenVehicleId = selectedVehicles[deal.id] || 'dzire';
            const chosenVehicle = VEHICLE_OPTIONS.find((v) => v.id === chosenVehicleId) || VEHICLE_OPTIONS[0];

            return (
              <div
                key={deal.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 group shadow-xs relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
                      <DealIcon className="w-3.5 h-3.5 text-blue-600" />
                      <span>{deal.tag}</span>
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-orange-600" />
                      <span>{deal.discount}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {deal.route}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5 font-medium">
                      <Clock className="w-3 h-3 text-blue-600 shrink-0" />
                      <span>{deal.duration} • {deal.distance}</span>
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {deal.highlight}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      <span>Vehicle Tier:</span>
                      <span className="text-blue-600">{chosenVehicle.seats}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {VEHICLE_OPTIONS.map((v) => {
                        const isChosen = chosenVehicleId === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => {
                              sound.playSwitch();
                              setSelectedVehicles((prev) => ({ ...prev, [deal.id]: v.id }));
                            }}
                            className={`py-1.5 px-2 min-h-[36px] rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                              isChosen
                                ? 'bg-blue-600 text-white shadow-2xs'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {v.shortName}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    {deal.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleBookDeal(deal)}
                    aria-label={`Book ${deal.route} in ${chosenVehicle.name}`}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold py-2.5 px-3 min-h-[42px] rounded-full transition-all cursor-pointer shadow-xs"
                  >
                    <span>Book {chosenVehicle.shortName}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppDeal(deal)}
                    className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-[#1F6F3F] hover:bg-[#155A30] text-white flex items-center justify-center shrink-0 border border-emerald-500/30 shadow-2xs transition-all cursor-pointer active:scale-95"
                    title={`Claim deal on WhatsApp for ${chosenVehicle.name}`}
                    aria-label={`Claim deal for ${deal.route} on WhatsApp`}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 pt-3 border-t border-slate-200">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Verified commercial fleet • Valid passenger permits & comprehensive insurance</span>
          </span>
          <span className="font-semibold text-blue-700">
            Silk City Direct Dispatch
          </span>
        </div>
      </div>
    </section>
  );
}
