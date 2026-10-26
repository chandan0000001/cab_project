import { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  Snowflake, 
  ShieldCheck, 
  ArrowRight, 
  MessageSquare, 
  Car, 
  Clock, 
  Sparkles, 
  MapPin,
  Plane,
  Landmark,
  Mountain,
  Waves,
  Building2,
  LucideIcon
} from 'lucide-react';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { Button } from '@/components/ui/Button';
import { isWhatsAppConfigured, getWhatsAppUrl } from '@/lib/contactUtils';
import { sound } from '@/lib/sound';

interface VehicleShowcase {
  id: string;
  name: string;
  category: string;
  image: string;
  seats: string;
  luggage: string;
  ac: string;
  badge: string;
}

interface QuickRoute {
  id: string;
  name: string;
  destination: string;
  distance: string;
  duration: string;
  highlight: string;
  icon: LucideIcon;
}

const SHOWCASE_VEHICLES: VehicleShowcase[] = [
  {
    id: 'dzire',
    name: 'Maruti Suzuki Dzire',
    category: 'Comfort Sedan',
    image: '/images/fleet/dzire.webp',
    seats: '4+1 Seats',
    luggage: '3 Large Bags',
    ac: 'Chilled AC',
    badge: 'Most Popular',
  },
  {
    id: 'ertiga',
    name: 'Maruti Suzuki Ertiga',
    category: 'Spacious MPV',
    image: '/images/fleet/ertiga.webp',
    seats: '6+1 Seats',
    luggage: '4 Bags + Carrier',
    ac: 'Dual AC Vents',
    badge: 'Family Special',
  },
  {
    id: 'innova',
    name: 'Toyota Innova Crysta',
    category: 'Premium Executive',
    image: '/images/fleet/innova_crysta.webp',
    seats: '7+1 Seats',
    luggage: '5 Large Bags',
    ac: 'Multi-Zone Climate',
    badge: 'VIP Comfort',
  },
];

const QUICK_ROUTES: QuickRoute[] = [
  {
    id: 'airport',
    name: 'Bhubaneswar Airport',
    destination: 'Bhubaneswar Airport',
    distance: '170 km',
    duration: '~3.5 Hours',
    highlight: 'Direct NH-16 express drop to departure terminal gate',
    icon: Plane,
  },
  {
    id: 'puri',
    name: 'Puri Jagannath Temple',
    destination: 'Puri Jagannath Temple',
    distance: '185 km',
    duration: '~4 Hours',
    highlight: 'Same-day Jagannath Dham darshan with waiting included',
    icon: Landmark,
  },
  {
    id: 'daringbadi',
    name: 'Daringbadi Hill Station',
    destination: 'Daringbadi',
    distance: '125 km',
    duration: '~3.5 Hours',
    highlight: 'Pine forests, coffee gardens & scenic ghats tour',
    icon: Mountain,
  },
  {
    id: 'gopalpur',
    name: 'Gopalpur Beach & Tampara',
    destination: 'Gopalpur Beach',
    distance: '16 km',
    duration: '~30 Mins',
    highlight: 'Coastline picnic & Tampara lake water sports excursion',
    icon: Waves,
  },
  {
    id: 'station',
    name: 'BAM Station / MKCG',
    destination: 'Berhampur Railway Station (BAM)',
    distance: 'City Transit',
    duration: 'Immediate',
    highlight: 'BAM railway station, MKCG hospital & local city pickup',
    icon: Building2,
  },
];

export function HeroDispatchShowcase() {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleShowcase>(SHOWCASE_VEHICLES[0]);
  const [selectedRoute, setSelectedRoute] = useState<QuickRoute>(QUICK_ROUTES[0]);
  const { openBooking } = useBookingFlow();
  const whatsappReady = isWhatsAppConfigured();

  const handleBookSelected = () => {
    sound.playPop();
    openBooking({
      tripType: 'one-way',
      pickupLocation: 'Berhampur',
      dropLocation: selectedRoute.destination,
      vehiclePreference: selectedVehicle.name,
    });
  };

  const handleWhatsAppSelected = () => {
    sound.playTap();
    if (whatsappReady) {
      const msg = `Hello Subham Travelers, I want to book a ${selectedVehicle.name} from Berhampur to ${selectedRoute.destination} (${selectedRoute.duration}). Please share fare quote.`;
      window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
    } else {
      handleBookSelected();
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden text-slate-900 transition-all duration-300">
      <div className="bg-slate-50 text-slate-900 px-4 sm:px-5 py-3 flex items-center justify-between gap-2 border-b border-slate-200">
        <div className="flex items-center gap-2 min-w-0">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-bold text-slate-900 tracking-wide truncate">
            Berhampur Fleet Terminal Active
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Zero Surge Pricing</span>
        </div>
      </div>

      <div className="p-2 sm:p-3 bg-slate-50/60 border-b border-slate-200">
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {SHOWCASE_VEHICLES.map((v) => {
            const isSelected = selectedVehicle.id === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => {
                  sound.playCarSelect();
                  setSelectedVehicle(v);
                }}
                aria-pressed={isSelected}
                aria-label={`Select vehicle category: ${v.name}`}
                className={`py-2 px-1.5 sm:px-2.5 rounded-xl text-center transition-all cursor-pointer border min-w-0 min-h-[48px] flex flex-col justify-center ${
                  isSelected
                    ? 'bg-blue-600 text-white font-bold shadow-sm border-blue-600'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center justify-center gap-1 min-w-0">
                  <Car className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                  <span className="text-xs font-bold truncate">{v.name.replace('Maruti Suzuki ', '').replace('Toyota ', '')}</span>
                </div>
                <span className={`text-[10px] block truncate mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-600'}`}>{v.category}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 aspect-[16/9] flex items-center justify-center p-3 group">
          <img
            src={selectedVehicle.image}
            alt={selectedVehicle.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="eager"
            decoding="async"
          />

          <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-1.5 pointer-events-none">
            <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-md text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">Verified Tourist Fleet</span>
            </span>

            <span className="bg-slate-900 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-2xs shrink-0">
              {selectedVehicle.badge}
            </span>
          </div>

          <div className="absolute bottom-2.5 inset-x-2.5 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-2 sm:p-2.5 text-slate-800 flex items-center justify-between text-xs font-medium shadow-2xs">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">{selectedVehicle.seats}</span>
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">{selectedVehicle.luggage}</span>
            </span>
            <span className="flex items-center gap-1">
              <Snowflake className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
              <span className="truncate">{selectedVehicle.ac}</span>
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-1 text-xs">
            <span className="font-bold text-slate-600 uppercase tracking-wider text-[11px] flex items-center gap-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              Corridors from Berhampur:
            </span>
            <span className="text-[10px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 shrink-0">
              Direct Highway
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
            {QUICK_ROUTES.map((route) => {
              const isSelected = selectedRoute.id === route.id;
              const Icon = route.icon;
              return (
                <button
                  key={route.id}
                  type="button"
                  onClick={() => {
                    sound.playRouteSelect();
                    setSelectedRoute(route);
                  }}
                  aria-pressed={isSelected}
                  aria-label={`Select route: ${route.name}`}
                  className={`p-2 rounded-xl text-left transition-all cursor-pointer border min-w-0 min-h-[50px] flex flex-col justify-center ${
                    isSelected
                      ? 'bg-blue-50 border-2 border-blue-600 text-blue-950 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      <Icon className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {route.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-600 mt-1 pl-6">
                    <span className="truncate">{route.distance}</span>
                    <span className="font-bold text-blue-600 shrink-0">{route.duration}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 text-xs text-slate-700">
            <span className="flex items-center gap-1.5 truncate min-w-0">
              <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <strong className="text-slate-900 truncate shrink-0">{selectedRoute.name}:</strong>
              <span className="text-slate-600 truncate">{selectedRoute.highlight}</span>
            </span>
            <span className="text-emerald-700 font-bold shrink-0 text-[10px] uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Flat Quote
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <Button
            variant="primary"
            size="lg"
            onClick={handleBookSelected}
            className="w-full justify-center text-sm font-bold shadow-md min-h-[48px] rounded-full bg-blue-600 hover:bg-blue-700 text-white border-0"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            <span>Reserve {selectedVehicle.name.replace('Maruti Suzuki ', '').replace('Toyota ', '')} & Quote</span>
          </Button>

          {whatsappReady && (
            <button
              type="button"
              onClick={handleWhatsAppSelected}
              aria-label="Contact WhatsApp Dispatch Desk"
              className="w-full flex items-center justify-center gap-2 bg-[#1F6F3F] hover:bg-[#155A30] text-white py-3 px-4 min-h-[44px] rounded-full text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Dispatch Desk (Fast Reply in 5 Mins)</span>
            </button>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-200">
          <span className="flex items-center gap-1 font-medium truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Direct fleet • Zero broker markup</span>
          </span>
          <span className="text-blue-700 font-semibold shrink-0">
            Berhampur Doorstep Pickup
          </span>
        </div>
      </div>
    </div>
  );
}
