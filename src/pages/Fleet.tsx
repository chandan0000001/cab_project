import { useState } from 'react';
import { sampleVehicles } from '@/data/vehicles';
import { VehicleCard } from '@/components/cards/VehicleCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { brandConfig } from '@/data/brandConfig';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { isPhoneConfigured, isWhatsAppConfigured, getPhoneUrl, getWhatsAppUrl } from '@/lib/contactUtils';
import { sound } from '@/lib/sound';
import { 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Briefcase, 
  Snowflake, 
  ArrowRight,
  Calendar,
  Check
} from 'lucide-react';

export function Fleet() {
  useDocumentTitle(
    'Our Commercial Fleet | Subham Travelers Berhampur',
    'Explore our verified chauffeur-driven sedans, family SUVs, and tempo travellers across Odisha with Subham Travelers.'
  );

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeShowcaseId, setActiveShowcaseId] = useState<string>('sedan-dzire');
  const { openBooking } = useBookingFlow();

  const phoneReady = isPhoneConfigured();
  const whatsappReady = isWhatsAppConfigured();

  const filteredVehicles =
    selectedCategory === 'all'
      ? sampleVehicles
      : sampleVehicles.filter((v) => v.category === selectedCategory);

  const activeVehicle = sampleVehicles.find((v) => v.id === activeShowcaseId) || sampleVehicles[0];

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: `All Vehicles (${sampleVehicles.length})` },
    { id: 'sedan', label: 'Comfort Sedans' },
    { id: 'suv', label: 'Family SUVs' },
    { id: 'luxury', label: 'Premium MPVs' },
    { id: 'hatchback', label: 'Economy Hatchbacks' },
    { id: 'tempo-traveller', label: 'Tempo Travellers' },
  ];

  const handleBookVehicle = (vehicleName?: string) => {
    sound.playPop();
    openBooking({
      vehiclePreference: vehicleName || activeVehicle.name,
      pickupLocation: 'Berhampur',
    });
  };

  const handleWhatsAppDesk = (vehicleName?: string) => {
    sound.playTap();
    const name = vehicleName || activeVehicle.name;
    const text = `Hello Subham Travelers, I want to book a ${name} from Berhampur. Please share availability and rates.`;
    window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        <Breadcrumb items={[{ label: 'Our Fleet' }]} />

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-10 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Verified Commercial Fleet • Silk City, Berhampur</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 leading-[1.15]">
              Odisha Chauffeur Fleet for <span className="text-blue-600">Every Journey</span>.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Sanitized executive sedans, 7-seater family MPVs, and 17-seater luxury tempo travellers with upfront transparent rates. All vehicles hold valid commercial permits, passenger insurance, and verified chauffeurs.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleBookVehicle()}
                className="font-bold text-sm min-h-[48px] px-7 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                leftIcon={<Calendar className="w-4 h-4 text-white" />}
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
              >
                Book a Cab Now
              </Button>

              {whatsappReady && (
                <button
                  type="button"
                  onClick={() => handleWhatsAppDesk()}
                  className="flex items-center justify-center gap-2 bg-[#1F6F3F] hover:bg-[#155A30] text-white px-7 py-3 min-h-[48px] rounded-full text-sm font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Fleet Desk</span>
                </button>
              )}

              {phoneReady && (
                <a href={getPhoneUrl()} className="hidden md:inline-flex">
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-semibold text-slate-800 border-slate-200 bg-white hover:bg-slate-50 text-sm min-h-[48px] px-5 rounded-full"
                    leftIcon={<Phone className="w-4 h-4 text-blue-600" />}
                  >
                    Call {brandConfig.contact.phoneDisplay}
                  </Button>
                </a>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-4 sm:gap-6 flex-wrap text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Commercial RTO Permits</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Dual-Zone Chilled AC Guaranteed</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Local Drivers</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Zero Hidden Fees</span>
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-8 space-y-6 overflow-hidden max-w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Interactive Fleet Showcase
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Inspect Vehicle Specifications & Capacities
              </h2>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Tourist Fleet
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {sampleVehicles.map((v) => {
              const isSelected = activeShowcaseId === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {
                    sound.playTap();
                    setActiveShowcaseId(v.id);
                  }}
                  className={`p-2.5 sm:p-3 rounded-2xl text-left transition-all cursor-pointer border flex flex-col justify-between min-h-[58px] sm:min-h-[64px] ${
                    isSelected
                      ? 'bg-blue-50 border-2 border-blue-600 text-blue-950 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs font-bold truncate block">{v.name}</span>
                  <span className={`text-[10px] block mt-0.5 sm:mt-1 ${isSelected ? 'text-blue-700 font-bold' : 'text-slate-600'}`}>
                    {v.seatingCapacity} Seats • {v.categoryLabel}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-3.5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200 overflow-hidden max-w-full">
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden bg-white border border-slate-200 aspect-[16/10] flex items-center justify-center p-3 sm:p-4">
              <img
                src={activeVehicle.imageUrl}
                alt={activeVehicle.name}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-blue-50 text-blue-700 border border-blue-200 font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  {activeVehicle.categoryLabel}
                </span>
              </div>
              {activeVehicle.badge && (
                <div className="absolute top-3 right-3">
                  <span className="bg-slate-900 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    {activeVehicle.badge}
                  </span>
                </div>
              )}
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-sans">
                  {activeVehicle.categoryLabel}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {activeVehicle.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {activeVehicle.idealFor}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 p-2 sm:p-3 bg-white rounded-xl border border-slate-200 text-center">
                <div className="flex flex-col items-center">
                  <span className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-slate-900">
                    <Users className="w-3.5 h-3.5 text-blue-600" /> {activeVehicle.seatingCapacity}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-600 uppercase font-semibold">Capacity</span>
                </div>
                <div className="flex flex-col items-center border-x border-slate-200">
                  <span className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-slate-900">
                    <Briefcase className="w-3.5 h-3.5 text-blue-600" /> {activeVehicle.luggageCapacity}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-600 uppercase font-semibold">Bags</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-slate-900">
                    <Snowflake className="w-3.5 h-3.5 text-cyan-600" /> {activeVehicle.hasAC ? 'Dual AC' : 'Non-AC'}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-600 uppercase font-semibold">Climate</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Included Amenities:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeVehicle.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[11px] sm:text-xs bg-white text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200"
                    >
                      <Check className="w-3 h-3 text-emerald-600" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleBookVehicle(activeVehicle.name)}
                  className="w-full sm:flex-1 font-bold rounded-xl text-xs bg-blue-600 hover:bg-blue-700 text-white min-h-[44px]"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5 ml-1" />}
                >
                  Reserve {activeVehicle.name}
                </Button>
                {whatsappReady && (
                  <button
                    type="button"
                    onClick={() => handleWhatsAppDesk(activeVehicle.name)}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-[#1F6F3F] hover:bg-[#155A30] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors min-h-[44px] cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Quote</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Browse Entire Showroom
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                All Available Fleet Categories
              </h2>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    aria-pressed={isSelected}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-full transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white font-bold shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span>Our Maintenance & Chauffeur Standards</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Every commercial vehicle in our network is held to strict mechanical and cleanliness criteria before dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Commercial Permits</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Authorized commercial cabs with valid state fitness certificates and active passenger insurance.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Daily Sanitization</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Interiors, seat covers, and AC vents are cleaned and sanitized prior to every long-distance highway departure.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Highway Chauffeurs</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Experienced, verified local drivers familiar with Odisha tourist circuits, ghat sections, and highway tollways.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Boot & Luggage Space</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated trunk space for family luggage with optional rooftop carriers available for extended temple circuits.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Unsure Which Vehicle Fits Your Luggage & Family?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Connect directly with our reservation team. We will help you select the ideal vehicle category based on passenger count, highway terrain, and journey duration.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            {whatsappReady && (
              <a
                href={getWhatsAppUrl('Hello Subham Travelers, I need advice choosing a cab category for my journey.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="md" className="rounded-full font-bold px-5" leftIcon={<MessageSquare className="w-4 h-4" />}>
                  WhatsApp Help Desk
                </Button>
              </a>
            )}
            {phoneReady && (
              <a href={getPhoneUrl()}>
                <Button variant="outline" size="md" className="rounded-full border-slate-700 text-white bg-slate-900 hover:bg-slate-800 font-bold px-5" leftIcon={<Phone className="w-4 h-4 text-blue-400" />}>
                  Call {brandConfig.contact.phoneDisplay}
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
