import { useState, useMemo } from 'react';
import { sampleRoutes } from '@/data/routes';
import { RouteCard } from '@/components/cards/RouteCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { isWhatsAppConfigured, getWhatsAppUrl } from '@/lib/contactUtils';
import { RouteRegion } from '@/types';
import { sound } from '@/lib/sound';
import { 
  Compass, 
  Info, 
  MessageSquare, 
  Navigation, 
  CheckCircle2, 
  Search, 
  X
} from 'lucide-react';

export function Routes() {
  useDocumentTitle(
    'Popular Outstation Cab Routes from Berhampur | Subham Travelers',
    'Explore intercity cab routes starting from Berhampur across Odisha including Bhubaneswar Airport, Puri, Gopalpur, Tara Tarini, Daringbadi, and Koraput.'
  );

  const [selectedRegion, setSelectedRegion] = useState<RouteRegion>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { openBooking } = useBookingFlow();

  const whatsappReady = isWhatsAppConfigured();

  const filteredRoutes = useMemo(() => {
    return sampleRoutes.filter((r) => {
      const matchesRegion = selectedRegion === 'all' || r.region === selectedRegion;
      const matchesSearch =
        searchQuery.trim() === '' ||
        r.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.highlight.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }, [selectedRegion, searchQuery]);

  const handleCustomRoute = () => {
    sound.playPop();
    openBooking({ tripType: 'one-way', pickupLocation: 'Berhampur' });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        <Breadcrumb items={[{ label: 'Popular Routes' }]} />

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Highway Dispatch Network • Silk City, Berhampur</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 leading-[1.15]">
              Popular Fixed-Fare Cab Routes from <span className="text-blue-600">Berhampur</span>.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Point-to-point one-way transit, Bhubaneswar Airport transfers, AIIMS hospital runs, and flexible round-trip highway tours across all 30 districts with transparent tolls and zero hidden surcharges.
            </p>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-4 sm:gap-6 flex-wrap text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Doorstep Berhampur Pickup</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Transparent Toll & Fuel Included</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Commercial Yellow-Plate Fleet</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Zero Return Fare on One-Way</span>
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Corridor Navigator
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Search Highway Routes from Silk City
              </h2>
            </div>

            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search destination, e.g. Puri, BBI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => setSelectedRegion('all')}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedRegion === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Corridors ({sampleRoutes.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedRegion('coastal-heritage')}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedRegion === 'coastal-heritage'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Coastal & Heritage (Puri, Konark, Chilika)
            </button>
            <button
              type="button"
              onClick={() => setSelectedRegion('southern-hills')}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedRegion === 'southern-hills'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Southern & Hills (Malkangiri, Daringbadi, Koraput)
            </button>
            <button
              type="button"
              onClick={() => setSelectedRegion('western-odisha')}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedRegion === 'western-odisha'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Western Odisha (Sambalpur, Rourkela)
            </button>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 flex items-start sm:items-center gap-3 shadow-2xs">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5 sm:mt-0" />
          <div className="flex-1">
            <span className="font-bold text-slate-900">Indicative Highway Distances & Transparent Coordination: </span>
            <span className="text-slate-600">
              Distances and durations listed are standard driving estimates for commercial yellow-plate vehicles departing Berhampur. Fuel and state toll taxes are pre-calculated.
            </span>
          </div>
        </div>

        <div>
          {filteredRoutes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRoutes.map((route, index) => (
                <RouteCard key={route.id} route={route} index={index + 1} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-3">
              <Compass className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">No matching routes found</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Looking for a custom village, temple, or town destination not listed here? Our dispatch coordinator can calculate an instant upfront quote for any point in Odisha.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={handleCustomRoute}
                className="mt-2 font-bold text-xs rounded-full bg-blue-600 text-white"
              >
                Inquire Custom Route
              </Button>
            </div>
          )}
        </div>

        <div className="rounded-3xl bg-slate-950 p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Need a Route That Isn't Listed Above?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              We service all 30 districts of Odisha with door-to-door commercial cab dispatches. Share your pickup address and destination for an instant flat quote.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            {whatsappReady && (
              <a
                href={getWhatsAppUrl('Hello Subham Travelers, I need a quotation for a custom route starting from Berhampur.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="md" className="rounded-full font-bold px-5" leftIcon={<MessageSquare className="w-4 h-4" />}>
                  WhatsApp Custom Quote
                </Button>
              </a>
            )}
            <Button
              variant="primary"
              size="md"
              onClick={handleCustomRoute}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-5"
              leftIcon={<Navigation className="w-4 h-4" />}
            >
              Open Booking Flow
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
