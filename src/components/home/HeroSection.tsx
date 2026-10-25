import { useState } from 'react';
import { 
  MessageSquare, 
  Plane, 
  Landmark, 
  Waves, 
  Mountain, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Briefcase, 
  Snowflake, 
  MapPin,
  Building2,
  Calendar,
  Car
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { HeroDispatchShowcase } from '@/components/home/HeroDispatchShowcase';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { isWhatsAppConfigured, getWhatsAppUrl } from '@/lib/contactUtils';
import { sound } from '@/lib/sound';

interface QuickChip {
  id: string;
  name: string;
  duration: string;
  highway: string;
  icon: typeof Plane;
  destination: string;
}

const QUICK_CHIPS: QuickChip[] = [
  { id: 'airport', name: 'Bhubaneswar Airport (BBI)', duration: '~3.5h', highway: 'NH-16 Express', icon: Plane, destination: 'Bhubaneswar Airport' },
  { id: 'puri', name: 'Puri Jagannath Dham', duration: '~4h', highway: 'Coastal Corridor', icon: Landmark, destination: 'Puri Jagannath Temple' },
  { id: 'gopalpur', name: 'Gopalpur-on-Sea & Tampara', duration: '~30m', highway: 'Beach Road', icon: Waves, destination: 'Gopalpur Beach' },
  { id: 'daringbadi', name: 'Daringbadi Hill Station', duration: '~3.5h', highway: 'Sorada Ghats', icon: Mountain, destination: 'Daringbadi' },
  { id: 'station', name: 'BAM Station & MKCG Transit', duration: 'Immediate', highway: 'City Transit', icon: Building2, destination: 'Berhampur Railway Station (BAM)' },
];

const MOBILE_VEHICLES = [
  { 
    id: 'dzire', 
    name: 'Sedan Dzire', 
    fullName: 'Maruti Suzuki Dzire',
    capacity: '4+1 Seats', 
    luggage: '3 Large Bags', 
    ac: 'Chilled AC', 
    image: '/images/fleet/dzire.webp', 
    badge: 'Most Popular' 
  },
  { 
    id: 'ertiga', 
    name: 'Ertiga MPV', 
    fullName: 'Maruti Suzuki Ertiga',
    capacity: '6+1 Seats', 
    luggage: '4 Bags + Carrier', 
    ac: 'Dual AC Vents', 
    image: '/images/fleet/ertiga.webp', 
    badge: 'Family Special' 
  },
  { 
    id: 'innova', 
    name: 'Innova Crysta', 
    fullName: 'Toyota Innova Crysta',
    capacity: '7+1 VIP', 
    luggage: '5 Large Bags', 
    ac: 'Multi Climate', 
    image: '/images/fleet/innova_crysta.webp', 
    badge: 'Executive VIP' 
  },
];

export function HeroSection() {
  const { openBooking } = useBookingFlow();
  const whatsappReady = isWhatsAppConfigured();
  const [selectedChip, setSelectedChip] = useState<string>('airport');
  const [selectedMobileVehicle, setSelectedMobileVehicle] = useState<string>('dzire');

  const activeChip = QUICK_CHIPS.find((c) => c.id === selectedChip) || QUICK_CHIPS[0];
  const activeVehicle = MOBILE_VEHICLES.find((v) => v.id === selectedMobileVehicle) || MOBILE_VEHICLES[0];

  const handleChipClick = (chip: QuickChip) => {
    sound.playRouteSelect();
    setSelectedChip(chip.id);
  };

  const handleBookNow = () => {
    sound.playPop();
    openBooking({
      tripType: 'one-way',
      pickupLocation: 'Berhampur',
      dropLocation: activeChip.destination,
      vehiclePreference: activeVehicle.fullName,
    });
  };

  const handleWhatsAppDesk = () => {
    sound.playWhatsApp();
    if (whatsappReady) {
      window.open(
        getWhatsAppUrl(`Hello Subham Travelers, I want to book a ${activeVehicle.fullName} from Berhampur to ${activeChip.destination}. Please share quotation.`),
        '_blank',
        'noopener,noreferrer'
      );
    } else {
      handleBookNow();
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/50 text-slate-900 pt-6 pb-12 sm:pt-12 sm:pb-16 border-b border-slate-200 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Direct Fleet Operator • Silk City, Berhampur</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight text-slate-950 leading-[1.14]">
              Cab Service Starting from{' '}
              <span className="text-blue-600">Berhampur</span>{' '}
              to Everywhere in Odisha.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl">
              Reliable one-way cabs, round trips & Bhubaneswar Airport transfers across Odisha with transparent fixed quotes.
            </p>

            <div className="lg:hidden space-y-4 pt-1">
              <div className="space-y-2.5">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleBookNow}
                  className="w-full justify-center text-sm font-bold shadow-xs min-h-[48px] rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                  leftIcon={<Car className="w-4 h-4 text-white" />}
                >
                  Plan Journey / Get Quote
                </Button>

                {whatsappReady && (
                  <button
                    type="button"
                    onClick={handleWhatsAppDesk}
                    className="w-full flex items-center justify-center gap-2 bg-[#1F6F3F] hover:bg-[#155A30] text-white py-3 px-4 min-h-[48px] rounded-full text-sm font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Dispatch Desk</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs text-left">
                  <span className="text-base font-black text-blue-600 tracking-tight block">24×7</span>
                  <p className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mt-0.5">
                    Direct Dispatch
                  </p>
                  <p className="text-[10px] text-slate-500">Active phone & chat</p>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs text-left">
                  <span className="text-base font-black text-blue-600 tracking-tight block">100%</span>
                  <p className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mt-0.5">
                    Commercial AC
                  </p>
                  <p className="text-[10px] text-slate-500">Chauffeur fleet</p>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs text-left">
                  <span className="text-base font-black text-blue-600 tracking-tight block">30</span>
                  <p className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mt-0.5">
                    Districts
                  </p>
                  <p className="text-[10px] text-slate-500">All Odisha routes</p>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs text-left">
                  <span className="text-base font-black text-blue-600 tracking-tight block">15m</span>
                  <p className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mt-0.5">
                    Fast Quote
                  </p>
                  <p className="text-[10px] text-slate-500">Quick WhatsApp desk</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 space-y-3.5 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-900">
                      Berhampur Live Dispatch Active
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    Winter 15% OFF
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  {MOBILE_VEHICLES.map((v) => {
                    const isSelected = selectedMobileVehicle === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => {
                          sound.playCarSelect();
                          setSelectedMobileVehicle(v.id);
                        }}
                        className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer border flex flex-col items-center justify-center min-h-[46px] ${
                          isSelected
                            ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-2xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-xs font-bold truncate block">{v.name}</span>
                        <span className={`text-[9px] block ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                          {v.capacity}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="relative rounded-xl overflow-hidden bg-slate-50 border border-slate-200/80 aspect-[16/9] flex items-center justify-center p-2 group">
                  <img
                    src={activeVehicle.image}
                    alt={activeVehicle.fullName}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Verified Fleet</span>
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                      {activeVehicle.badge}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-700 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="flex items-center gap-1 font-medium">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span>{activeVehicle.capacity}</span>
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                    <span>{activeVehicle.luggage}</span>
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Snowflake className="w-3.5 h-3.5 text-cyan-600" />
                    <span>{activeVehicle.ac}</span>
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-600" />
                      Corridors from Berhampur:
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Zero Surge
                    </span>
                  </div>

                  <div className="flex items-stretch gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {QUICK_CHIPS.map((chip) => {
                      const Icon = chip.icon;
                      const isSelected = selectedChip === chip.id;
                      return (
                        <button
                          key={chip.id}
                          type="button"
                          onClick={() => handleChipClick(chip)}
                          className={`p-2.5 rounded-xl text-left transition-all shrink-0 cursor-pointer border flex flex-col justify-between min-w-[170px] max-w-[200px] ${
                            isSelected
                              ? 'bg-blue-50 border-2 border-blue-600 text-blue-950 shadow-2xs'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-1">
                            <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                            }`}>
                              <Icon className="w-3 h-3" />
                            </div>
                            <span className="text-[9px] font-bold text-slate-700 bg-white px-1.5 py-0.5 rounded-full border border-slate-200">
                              {chip.duration}
                            </span>
                          </div>
                          <div>
                            <span className="text-xs font-bold block text-slate-900 truncate">
                              {chip.name}
                            </span>
                            <span className="text-[10px] text-slate-500 block">
                              {chip.highway}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 text-xs text-slate-700">
                    <span className="flex items-center gap-1.5 truncate font-medium">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="text-slate-900 font-bold truncate">{activeChip.destination}</span>
                    </span>
                    <span className="text-emerald-700 font-bold text-[10px] uppercase tracking-wider shrink-0 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Flat Quote
                    </span>
                  </div>
                </div>

                <div className="pt-1 space-y-2">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleBookNow}
                    className="w-full justify-center text-xs font-bold shadow-xs min-h-[44px] rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5 ml-1" />}
                  >
                    Reserve {activeVehicle.name} & Quote
                  </Button>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 px-1 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>Verified Tourist Cab</span>
                    </span>
                    <span className="text-blue-700 font-semibold">
                      Berhampur Doorstep Pickup
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block space-y-6">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    Curated Corridors from Berhampur
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Fixed Pricing • Zero Surge
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {QUICK_CHIPS.slice(0, 4).map((chip) => {
                    const Icon = chip.icon;
                    const isSelected = selectedChip === chip.id;
                    return (
                      <button
                        key={chip.id}
                        type="button"
                        onClick={() => handleChipClick(chip)}
                        className={`p-3 rounded-xl text-left transition-all cursor-pointer border flex flex-col justify-between min-h-[70px] ${
                          isSelected
                            ? 'bg-blue-50 border-2 border-blue-600 text-blue-950 shadow-xs'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-600' : 'text-slate-500'}`} />
                          <span className="text-[10px] font-semibold text-slate-500">{chip.duration}</span>
                        </div>
                        <div className="mt-1.5">
                          <span className="text-xs font-bold block truncate text-slate-900">
                            {chip.name}
                          </span>
                          <span className="text-[10px] text-slate-500 block truncate">
                            {chip.highway}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-row items-center gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleBookNow}
                  className="font-bold shadow-sm min-h-[48px] px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm"
                  leftIcon={<Calendar className="w-4 h-4 text-white" />}
                  rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                >
                  Book a Cab Online
                </Button>

                <Button
                  variant="whatsapp"
                  size="lg"
                  onClick={handleWhatsAppDesk}
                  className="font-semibold shadow-xs min-h-[48px] px-6 rounded-full bg-[#1F6F3F] hover:bg-[#155A30] text-white text-sm"
                  leftIcon={<MessageSquare className="w-4 h-4" />}
                >
                  WhatsApp Dispatch Desk
                </Button>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <div className="grid grid-cols-4 gap-2.5 text-left">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-lg font-black text-blue-600 tracking-tight">24×7</span>
                    <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mt-0.5">
                      Dispatch Desk
                    </p>
                    <p className="text-[10px] text-slate-500">Direct coordinator</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-lg font-black text-blue-600 tracking-tight">100%</span>
                    <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mt-0.5">
                      Commercial AC
                    </p>
                    <p className="text-[10px] text-slate-500">Chauffeur fleet</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-lg font-black text-blue-600 tracking-tight">30</span>
                    <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mt-0.5">
                      Districts
                    </p>
                    <p className="text-[10px] text-slate-500">All Odisha coverage</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-lg font-black text-blue-600 tracking-tight">Fixed</span>
                    <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mt-0.5">
                      Tariff Guarantee
                    </p>
                    <p className="text-[10px] text-slate-500">Zero hidden fees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-6">
            <HeroDispatchShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
