import { useState } from 'react';
import { sampleDestinations } from '@/data/destinations';
import { DestinationCard } from '@/components/cards/DestinationCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { isWhatsAppConfigured, isPhoneConfigured, getWhatsAppUrl, getPhoneUrl } from '@/lib/contactUtils';
import { Compass, MapPin, Calendar, MessageSquare, Phone, Sun, Sparkles, Navigation } from 'lucide-react';

export function Destinations() {
  useDocumentTitle(
    'Odisha Destinations',
    'Discover iconic tourist, pilgrimage, and nature destinations across Odisha with Subham Travelers.'
  );

  const [selectedCircuit, setSelectedCircuit] = useState<string>('all');
  const { openBooking } = useBookingFlow();

  const whatsappReady = isWhatsAppConfigured();
  const phoneReady = isPhoneConfigured();

  const filteredDestinations =
    selectedCircuit === 'all'
      ? sampleDestinations
      : sampleDestinations.filter((d) => d.circuit === selectedCircuit);

  const circuits = [
    { id: 'all', label: `All Destinations (${sampleDestinations.length})` },
    { id: 'coastal-pilgrimage', label: 'Coastal & Pilgrimage (Puri, Konark, Gopalpur)' },
    { id: 'heritage-culture', label: 'Heritage & Temples (Bhubaneswar, Dhauli)' },
    { id: 'hills-nature', label: 'Hills & Nature (Daringbadi, Similipal, Chilika)' },
  ];

  return (
    <div className="bg-sand-50/40 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Odisha Destinations' }]} />

        {/* Page Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-navy-200/80">
          <SectionHeading
            eyebrow="Explore Odisha"
            title="Iconic Tourism & Pilgrimage Circuits"
            subtitle="Explore sacred Hindu shrines, Sun Temple architecture, UNESCO wildlife biospheres, tranquil brackish lagoons, and mist-covered hill valleys with experienced local highway chauffeurs."
            className="mb-0"
          />
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <Button
              variant="primary"
              size="md"
              onClick={() => openBooking({ tripType: 'one-way' })}
              leftIcon={<Navigation className="w-4 h-4 text-brand-400" />}
            >
              Plan Journey
            </Button>
            {whatsappReady && (
              <a
                href={getWhatsAppUrl(
                  'Hello Subham Travelers, I am interested in planning an Odisha tour itinerary.'
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="md" leftIcon={<MessageSquare className="w-4 h-4" />}>
                  Tour Inquiry
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Circuit Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-semibold text-navy-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-brand-600" /> Circuits:
          </span>
          {circuits.map((c) => {
            const isSelected = selectedCircuit === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCircuit(c.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>

        {/* Odisha Travel Tips Guide */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-navy-100 shadow-sm space-y-6">
          <div className="border-b border-navy-100 pb-4">
            <h3 className="text-lg sm:text-xl font-bold text-navy-950 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-600" />
              <span>Odisha Travel Insights & Recommendations</span>
            </h3>
            <p className="text-xs sm:text-sm text-navy-600 mt-1">
              Helpful local travel guidance to make the most of your road journeys across Odisha.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-sand-50/80 border border-navy-100/80 space-y-2">
              <div className="flex items-center gap-2 text-navy-900 font-bold text-sm">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>The Golden Triangle</span>
              </div>
              <p className="text-xs text-navy-600 leading-relaxed">
                Bhubaneswar, Puri, and Konark form Odisha's famous cultural triangle. We recommend reserving an outstation cab for a full 2-day circuit taking the scenic Puri-Konark Marine Drive highway.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-sand-50/80 border border-navy-100/80 space-y-2">
              <div className="flex items-center gap-2 text-navy-900 font-bold text-sm">
                <Calendar className="w-4 h-4 text-brand-600" />
                <span>Best Visiting Seasons</span>
              </div>
              <p className="text-xs text-navy-600 leading-relaxed">
                October through March offers pleasant weather across coastal beaches and hill tracts like Daringbadi. Similipal park opens in November; winter months bring migratory waterfowl to Chilika.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-sand-50/80 border border-navy-100/80 space-y-2">
              <div className="flex items-center gap-2 text-navy-900 font-bold text-sm">
                <MapPin className="w-4 h-4 text-brand-600" />
                <span>Temple Etiquette</span>
              </div>
              <p className="text-xs text-navy-600 leading-relaxed">
                Traditional attire is encouraged for Shree Jagannath Temple in Puri and Lingaraj Temple in Bhubaneswar. Non-Hindus are permitted outside the perimeter; our chauffeurs provide helpful local advice.
              </p>
            </div>
          </div>
        </div>

        {/* Custom Tour CTA Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Looking for a Multi-Day Customized Odisha Tour?
            </h3>
            <p className="text-xs sm:text-sm text-navy-300 max-w-xl">
              From family temple pilgrimages to wildlife safaris in Similipal and quiet weekends in Daringbadi, our team coordinates flexible round-trip highway itineraries tailored to your schedule.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            {whatsappReady ? (
              <a
                href={getWhatsAppUrl('Hello Subham Travelers, I want to discuss a customized Odisha holiday itinerary.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="md" leftIcon={<MessageSquare className="w-4 h-4" />}>
                  Chat on WhatsApp
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
              <Button variant="secondary" size="md" onClick={() => openBooking({ tripType: 'round-trip' })}>
                Plan Custom Itinerary
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
