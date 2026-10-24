import { useState } from 'react';
import { sampleRoutes } from '@/data/routes';
import { RouteCard } from '@/components/cards/RouteCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { isPhoneConfigured, isWhatsAppConfigured, getPhoneUrl, getWhatsAppUrl } from '@/lib/contactUtils';
import { RouteRegion } from '@/types';
import { Phone, Compass, Info, MessageSquare, Navigation, CheckCircle2 } from 'lucide-react';

export function Routes() {
  useDocumentTitle(
    'Popular Cab Routes from Berhampur',
    'Explore intercity cab routes starting from Berhampur across Odisha including Bhubaneswar Airport, Puri, Gopalpur, Tara Tarini, Daringbadi, and Koraput.'
  );

  const [selectedRegion, setSelectedRegion] = useState<RouteRegion>('all');
  const { openBooking } = useBookingFlow();

  const phoneReady = isPhoneConfigured();
  const whatsappReady = isWhatsAppConfigured();

  const filteredRoutes =
    selectedRegion === 'all'
      ? sampleRoutes
      : sampleRoutes.filter((r) => r.region === selectedRegion);

  return (
    <div className="bg-sand-50/40 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Popular Routes' }]} />

        {/* Page Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-navy-200/80">
          <SectionHeading
            eyebrow="Highway Corridors"
            title="Popular Cab Routes Starting from Berhampur"
            subtitle="All routes start from Berhampur (Silk City) with point-to-point one-way transit, Bhubaneswar airport transfers, hospital runs, and flexible round-trip highway tours across all 30 districts."
            className="mb-0"
          />
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <Button
              variant="primary"
              size="md"
              onClick={() => openBooking({ tripType: 'one-way' })}
              leftIcon={<Navigation className="w-4 h-4 text-brand-400" />}
            >
              Custom Route
            </Button>
            {phoneReady && (
              <a href={getPhoneUrl()}>
                <Button variant="secondary" size="md" leftIcon={<Phone className="w-4 h-4" />}>
                  Route Desk
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Regional Corridor Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-semibold text-navy-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-brand-600" /> Corridors:
          </span>
          <button
            type="button"
            onClick={() => setSelectedRegion('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              selectedRegion === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
            }`}
          >
            All Corridors ({sampleRoutes.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedRegion('coastal-heritage')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              selectedRegion === 'coastal-heritage'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Coastal & Heritage (Puri, Konark, Chilika, Berhampur)
          </button>
          <button
            type="button"
            onClick={() => setSelectedRegion('southern-hills')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              selectedRegion === 'southern-hills'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Southern & Hills (Malkangiri, Phulbani, Daringbadi, Koraput)
          </button>
          <button
            type="button"
            onClick={() => setSelectedRegion('western-odisha')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              selectedRegion === 'western-odisha'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Western Odisha (Sambalpur, Rourkela)
          </button>
        </div>

        {/* Highway Coordination Notice */}
        <div className="p-4 rounded-xl bg-sand-100/90 border border-navy-200/80 text-xs text-navy-700 flex items-start gap-3">
          <Info className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-navy-900">
              Indicative Highway Distances & Transparent Coordination:
            </p>
            <p className="leading-relaxed">
              Distances and durations listed are standard driving estimates for passenger commercial vehicles. Subham Travelers coordinates cab services across every town, district, railway junction, and airport in Odisha. For customized pickup points or rural destinations not listed below, contact our reservation desk.
            </p>
          </div>
        </div>

        {/* Route Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredRoutes.map((route, idx) => (
            <RouteCard key={route.id} route={route} index={idx} />
          ))}
        </div>

        {/* Highway Travel Standards Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-navy-100 shadow-sm space-y-6">
          <div className="border-b border-navy-100 pb-4">
            <h3 className="text-lg sm:text-xl font-bold text-navy-950 flex items-center gap-2">
              <Compass className="w-5 h-5 text-brand-600" />
              <span>What to Expect on Odisha Highway Trips</span>
            </h3>
            <p className="text-xs sm:text-sm text-navy-600 mt-1">
              Transparent, reliable standards for intercity travel across state and national expressways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-navy-900 text-sm">
                <CheckCircle2 className="w-4 h-4 text-brand-600" />
                <span>Doorstep Pickup & Drop</span>
              </div>
              <p className="text-xs text-navy-600 leading-relaxed">
                Direct pickup from your residence, hotel, railway station, or Biju Patnaik International Airport (BBI) with direct drop at your destination.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-navy-900 text-sm">
                <CheckCircle2 className="w-4 h-4 text-brand-600" />
                <span>Highway Tolls & Parking</span>
              </div>
              <p className="text-xs text-navy-600 leading-relaxed">
                All applicable highway FASTag toll charges, interstate taxes, and parking fees are shared transparently with receipts.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-navy-900 text-sm">
                <CheckCircle2 className="w-4 h-4 text-brand-600" />
                <span>Ghat & Hill Driving Expertise</span>
              </div>
              <p className="text-xs text-navy-600 leading-relaxed">
                Our chauffeurs have years of experience navigating the scenic ghat roads of Kandhamal, Koraput, and Mayurbhanj forest stretches safely.
              </p>
            </div>
          </div>
        </div>

        {/* Custom Highway Enquiry CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Traveling to a Specific Village, Project Site, or Town?
            </h3>
            <p className="text-xs sm:text-sm text-navy-300 max-w-xl">
              We serve all 30 districts of Odisha. Whether you are traveling for family occasions, industrial visits, or heritage explorations, share your origin and destination for instant coordination.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            {whatsappReady ? (
              <a
                href={getWhatsAppUrl('Hello Subham Travelers, I want to enquire about a custom cab route in Odisha.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="md" leftIcon={<MessageSquare className="w-4 h-4" />}>
                  WhatsApp Route Enquiry
                </Button>
              </a>
            ) : null}
            {phoneReady ? (
              <a href={getPhoneUrl()}>
                <Button variant="secondary" size="md" leftIcon={<Phone className="w-4 h-4" />}>
                  Call Reservation Desk
                </Button>
              </a>
            ) : (
              <Button variant="secondary" size="md" onClick={() => openBooking({ tripType: 'one-way' })}>
                Enquire Route
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
