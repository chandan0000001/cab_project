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
    name: 'Bhubaneswar Airport Transfer',
    destination: 'Bhubaneswar Airport',
    distance: '170 km',
    duration: '~3.5 Hours',
    highlight: 'NH-16 Express (Direct to Departure Terminal)',
    icon: Plane,
  },
  {
    id: 'puri',
    name: 'Puri Jagannath Temple',
    destination: 'Puri Jagannath Temple',
    distance: '185 km',
    duration: '~4 Hours',
    highlight: 'Same-Day Darshan with Temple Waiting',
    icon: Landmark,
  },
  {
    id: 'daringbadi',
    name: 'Daringbadi Hill Station',
    destination: 'Daringbadi',
    distance: '125 km',
    duration: '~3.5 Hours',
    highlight: 'Pine Forests & Scenic Ghat Road Tour',
    icon: Mountain,
  },
  {
    id: 'gopalpur',
    name: 'Gopalpur Beach & Tampara',
    destination: 'Gopalpur Beach',
    distance: '16 km',
    duration: '~30 Mins',
    highlight: 'Coastline Picnic & Tampara Lake Excursion',
    icon: Waves,
  },
  {
    id: 'station',
    name: 'BAM Station / MKCG',
    destination: 'Berhampur Railway Station (BAM)',
    distance: 'City Transit',
    duration: 'Immediate',
    highlight: 'BAM Railway Station, MKCG Hospital & Local Hubs',
    icon: Building2,
  },
];

export function HeroDispatchShowcase() {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleShowcase>(SHOWCASE_VEHICLES[0]);
  const [selectedRoute, setSelectedRoute] = useState<QuickRoute>(QUICK_ROUTES[0]);
  const { openBooking } = useBookingFlow();
  const whatsappReady = isWhatsAppConfigured();

  const handleBookSelected = () => {
    openBooking({
      tripType: 'one-way',
      pickupLocation: 'Berhampur',
      dropLocation: selectedRoute.destination,
      vehiclePreference: selectedVehicle.name,
    });
  };

  const handleWhatsAppSelected = () => {
    if (whatsappReady) {
      const msg = `Hello Subham Travelers, I want to book a ${selectedVehicle.name} from Berhampur to ${selectedRoute.destination} (${selectedRoute.duration}). Please share fare quote.`;
      window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
    } else {
      handleBookSelected();
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden text-slate-900 transition-all duration-300 hover:shadow-2xl">
      {/* Live Operational Dispatch Status Header */}
      <div className="bg-slate-950 text-white px-3.5 sm:px-5 py-2.5 flex items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2 min-w-0">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-bold text-white tracking-wide truncate">
            Berhampur Live Dispatch Active
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-blue-200 font-semibold bg-blue-900/60 px-2 sm:px-2.5 py-1 rounded-full border border-blue-700/60 shrink-0">
          <Sparkles className="w-3 h-3 text-blue-300" />
          <span>Winter 15% OFF</span>
        </div>
      </div>

      {/* Vehicle Category Tabs */}
      <div className="p-2.5 sm:p-3.5 bg-slate-50 border-b border-slate-200">
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {SHOWCASE_VEHICLES.map((v) => {
            const isSelected = selectedVehicle.id === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVehicle(v)}
                aria-pressed={isSelected}
                aria-label={`Select vehicle category: ${v.name}`}
                className={`py-2 px-1.5 sm:px-2.5 rounded-xl text-center transition-all cursor-pointer border min-w-0 min-h-[48px] flex flex-col justify-center ${
                  isSelected
                    ? 'bg-white border-blue-600 shadow-sm text-slate-900 ring-2 ring-blue-500/20'
                    : 'bg-white/70 border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900'
                }`}
              >
                <div className="flex items-center justify-center gap-1 min-w-0">
                  <Car className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className="text-xs font-black truncate">{v.name.replace('Maruti Suzuki ', '').replace('Toyota ', '')}</span>
                </div>
                <span className="text-[10px] text-slate-500 block truncate mt-0.5">{v.category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Vehicle Visual Showcase */}
      <div className="p-3.5 sm:p-5 space-y-3.5">
        <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-[16/9] group">
          <img
            src={selectedVehicle.image}
            alt={selectedVehicle.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="eager"
            decoding="async"
          />

          {/* Top Overlays - Responsive Single Row (Never Collides) */}
          <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-1.5 pointer-events-none">
            <span className="inline-flex items-center gap-1 bg-black/85 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm truncate max-w-[62%]">
              <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">OD Commercial Plate</span>
            </span>

            <span className="bg-blue-600 text-white text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm shrink-0">
              {selectedVehicle.badge}
            </span>
          </div>

          {/* Bottom Specs Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2.5 sm:p-3 pt-6 text-white flex items-center justify-between text-[11px] sm:text-xs font-medium">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-blue-300 shrink-0" />
              <span className="truncate">{selectedVehicle.seats}</span>
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-blue-300 shrink-0" />
              <span className="truncate">{selectedVehicle.luggage}</span>
            </span>
            <span className="flex items-center gap-1">
              <Snowflake className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
              <span className="truncate">{selectedVehicle.ac}</span>
            </span>
          </div>
        </div>

        {/* Popular Berhampur Routes Quick-Select (No Emojis, Clean SVG Icons) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-1 text-xs">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              Routes from Berhampur:
            </span>
            <span className="text-[10px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200 shrink-0">
              Berhampur Hub
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
                  onClick={() => setSelectedRoute(route)}
                  aria-pressed={isSelected}
                  aria-label={`Select route: ${route.name}`}
                  className={`p-2 rounded-xl text-left transition-all cursor-pointer border min-w-0 min-h-[48px] flex flex-col justify-center ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-600 shadow-xs ring-1 ring-blue-500'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Icon className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {route.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1 pl-6">
                    <span className="truncate">{route.distance}</span>
                    <span className="font-semibold text-slate-700 shrink-0">{route.duration}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Route Highlight Detail Pill */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 text-xs text-slate-700">
            <span className="flex items-center gap-1.5 truncate min-w-0">
              <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <strong className="text-slate-900 truncate shrink-0">{selectedRoute.name}:</strong>
              <span className="text-slate-500 truncate">{selectedRoute.highlight}</span>
            </span>
            <span className="text-emerald-700 font-bold shrink-0 text-[11px]">
              Fixed Quote
            </span>
          </div>
        </div>

        {/* High-Converting Action CTAs */}
        <div className="space-y-2 pt-0.5">
          <Button
            variant="primary"
            size="lg"
            onClick={handleBookSelected}
            className="w-full justify-center text-sm font-bold shadow-md min-h-[48px]"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            <span>Book {selectedVehicle.name.replace('Maruti Suzuki ', '').replace('Toyota ', '')} & Get Quote</span>
          </Button>

          {whatsappReady && (
            <button
              type="button"
              onClick={handleWhatsAppSelected}
              aria-label="Contact WhatsApp Dispatch Desk"
              className="w-full flex items-center justify-center gap-2 bg-[#1F6F3F] hover:bg-[#155A30] active:bg-[#0F4222] text-white py-3 px-4 min-h-[44px] rounded-full text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Dispatch Desk (Fast Reply in 5 Mins)</span>
            </button>
          )}
        </div>

        {/* Bottom Trust Guarantee Strip */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <span className="flex items-center gap-1 text-slate-600 font-medium truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Direct fleet • Zero broker markup</span>
          </span>
          <span className="text-slate-600 font-medium shrink-0">
            Berhampur Pickup
          </span>
        </div>
      </div>
    </div>
  );
}
