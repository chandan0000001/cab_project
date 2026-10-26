import { useState } from 'react';
import { sampleDestinations } from '@/data/destinations';
import { DestinationCard } from '@/components/cards/DestinationCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { isWhatsAppConfigured, isPhoneConfigured, getWhatsAppUrl, getPhoneUrl } from '@/lib/contactUtils';
import { sound } from '@/lib/sound';
import { 
  MapPin, 
  MessageSquare, 
  Phone, 
  Sparkles, 
  Navigation, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  ShieldCheck,
  Calendar
} from 'lucide-react';

interface CuratedPackage {
  id: string;
  title: string;
  duration: string;
  recommendedCar: string;
  stops: string[];
  description: string;
  highlight: string;
}

const FEATURED_PACKAGES: CuratedPackage[] = [
  {
    id: 'puri-konark',
    title: 'Puri Dham & Konark Marine Special',
    duration: '1 Full Day (~12 Hours)',
    recommendedCar: 'Ertiga MPV / Dzire',
    stops: ['Berhampur Doorstep', 'Puri Jagannath Temple', 'Chandrabhaga Beach', 'Konark Sun Temple', 'Marine Drive'],
    description: 'Same-day round trip covering sacred darshan, coastal highway drive, and architectural wonders with zero parking hassles.',
    highlight: 'Temple waiting included',
  },
  {
    id: 'daringbadi-hill',
    title: 'Kashmir of Odisha: Daringbadi & Ghats',
    duration: '2 Days / 1 Night',
    recommendedCar: 'Maruti Ertiga / Innova',
    stops: ['Berhampur', 'Sorada Reservoir', 'Pine Forest', 'Coffee Plantations', 'Midubanda Waterfalls', 'Sunset Point'],
    description: 'Chilled mountain getaway through picturesque Eastern Ghats passes. Safe ghat-certified drivers experienced in hairpins.',
    highlight: 'Ghat safety certified driver',
  },
  {
    id: 'taptapani-jirang',
    title: 'Healing Springs & Tibetan Monastery Circuit',
    duration: '1 Day (~8 Hours)',
    recommendedCar: 'Sedan Dzire / Aura',
    stops: ['Berhampur', 'Taptapani Hot Springs', 'Khasada Waterfall', 'Chandragiri Jirang Monastery', 'Tibetan Settlement'],
    description: 'Explore natural sulfur healing pools followed by peaceful meditation at the largest Buddhist monastery in Eastern India.',
    highlight: 'Most scenic hill corridor',
  },
];

export function Destinations() {
  useDocumentTitle(
    'Odisha Tourism & Pilgrimage Circuits | Subham Travelers Berhampur',
    'Discover iconic tourist, pilgrimage, and nature destinations across Odisha with Subham Travelers.'
  );

  const [selectedCircuit, setSelectedCircuit] = useState<string>('all');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('puri-konark');
  const { openBooking } = useBookingFlow();

  const whatsappReady = isWhatsAppConfigured();
  const phoneReady = isPhoneConfigured();

  const filteredDestinations =
    selectedCircuit === 'all'
      ? sampleDestinations
      : sampleDestinations.filter((d) => d.circuit === selectedCircuit);

  const activePackage = FEATURED_PACKAGES.find((p) => p.id === selectedPackageId) || FEATURED_PACKAGES[0];

  const circuits = [
    { id: 'all', label: `All Circuits (${sampleDestinations.length})` },
    { id: 'coastal-pilgrimage', label: 'Coastal & Pilgrimage (Puri, Konark, Gopalpur)' },
    { id: 'heritage-culture', label: 'Heritage & Temples (Bhubaneswar, Dhauli)' },
    { id: 'hills-nature', label: 'Hills & Nature (Daringbadi, Similipal, Chilika)' },
  ];

  const handlePlanCustom = () => {
    sound.playPop();
    openBooking({
      tripType: 'round-trip',
      pickupLocation: 'Berhampur',
      dropLocation: activePackage.stops[1] || 'Puri Jagannath Temple',
    });
  };

  const handleWhatsAppTour = (pkgTitle?: string) => {
    sound.playTap();
    const title = pkgTitle || activePackage.title;
    const text = `Hello Subham Travelers, I want to plan the "${title}" tour from Berhampur. Please share custom itinerary and cab quotation.`;
    window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        <Breadcrumb items={[{ label: 'Odisha Destinations' }]} />

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Curated Odisha Travel Circuits • Silk City, Berhampur</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 leading-[1.15]">
              Handcrafted Odisha Cab Tours, <span className="text-blue-600">Temples & Hill Circuits</span>.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Experience sacred Jagannath Dham, misty Daringbadi pine valleys, Gopalpur coastal retreats, and ancient Shakti Peethas with dedicated outstation drivers who know every highway shortcut and temple timing.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={handlePlanCustom}
                className="font-bold text-sm min-h-[48px] px-7 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                leftIcon={<Calendar className="w-4 h-4 text-white" />}
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
              >
                Plan Custom Circuit
              </Button>

              {whatsappReady && (
                <button
                  type="button"
                  onClick={() => handleWhatsAppTour()}
                  className="flex items-center justify-center gap-2 bg-[#1F6F3F] hover:bg-[#155A30] text-white px-7 py-3 min-h-[48px] rounded-full text-sm font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Tour Coordinator</span>
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
                    Direct Desk Call
                  </Button>
                </a>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-4 sm:gap-6 flex-wrap text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Custom Stopovers Permitted</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Temple Waiting Included</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ghat Safety Certified Drivers</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Upfront Fixed Quotes</span>
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Ready-Made Outstation Packages
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Curated Road Trip Itineraries Departing from Berhampur
              </h2>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 self-start sm:self-auto flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Special Round-Trip Fares
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {FEATURED_PACKAGES.map((pkg) => {
              const isSelected = selectedPackageId === pkg.id;
              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => {
                    sound.playTap();
                    setSelectedPackageId(pkg.id);
                  }}
                  className={`p-4 rounded-2xl text-left transition-all cursor-pointer border flex flex-col justify-between min-h-[90px] ${
                    isSelected
                      ? 'bg-blue-50 border-2 border-blue-600 text-blue-950 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold block text-slate-950 leading-snug">
                      {pkg.title}
                    </span>
                    <span className="text-[11px] text-slate-600 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-blue-600" />
                      {pkg.duration}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold mt-2 uppercase tracking-wider ${
                    isSelected ? 'text-blue-700' : 'text-slate-600'
                  }`}>
                    {pkg.highlight}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Featured Circuit Detail
                </span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {activePackage.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                  {activePackage.description}
                </p>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Recommended: {activePackage.recommendedCar}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                Itinerary Route Stops:
              </span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {activePackage.stops.map((stop, idx) => (
                  <div key={idx} className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1 text-xs font-bold bg-white text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      {stop}
                    </span>
                    {idx < activePackage.stops.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => handlePlanCustom()}
                className="font-bold text-xs rounded-xl bg-blue-600 hover:bg-blue-700 text-white min-h-[44px] px-6"
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
              >
                Book This Circuit Tour
              </Button>

              {whatsappReady && (
                <button
                  type="button"
                  onClick={() => handleWhatsAppTour(activePackage.title)}
                  className="flex items-center justify-center gap-2 bg-[#1F6F3F] hover:bg-[#155A30] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors min-h-[44px] cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Customize on WhatsApp</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                All 8 Major Odisha Hubs
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Explore Destinations & Travel Durations
              </h2>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {circuits.map((c) => {
                const isSelected = selectedCircuit === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCircuit(c.id)}
                    className={`px-3.5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white font-bold shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Looking for a Multi-Day Temple Tour or Custom Circuit?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              We coordinate custom outstation trips with overnight chauffeur stays, temple darshan planning, and scenic stopovers across all 30 districts of Odisha.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            {whatsappReady && (
              <a
                href={getWhatsAppUrl('Hello Subham Travelers, I want to design a multi-day custom tour itinerary.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="md" className="rounded-full font-bold px-5" leftIcon={<MessageSquare className="w-4 h-4" />}>
                  WhatsApp Tour Desk
                </Button>
              </a>
            )}
            <Button
              variant="primary"
              size="md"
              onClick={handlePlanCustom}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-5"
              leftIcon={<Navigation className="w-4 h-4" />}
            >
              Custom Booking Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
