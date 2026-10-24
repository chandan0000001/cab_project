import { useState } from 'react';
import { sampleVehicles } from '@/data/vehicles';
import { VehicleCard } from '@/components/cards/VehicleCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { brandConfig } from '@/data/brandConfig';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { isPhoneConfigured, isWhatsAppConfigured, getPhoneUrl, getWhatsAppUrl } from '@/lib/contactUtils';
import { Phone, MessageSquare, ShieldCheck, Sparkles, CheckCircle2, Car } from 'lucide-react';

export function Fleet() {
  useDocumentTitle(
    'Our Fleet',
    'Explore our range of clean, sanitized sedans, family SUVs, and tempo travellers across Odisha with Subham Travelers.'
  );

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { openBooking } = useBookingFlow();

  const phoneReady = isPhoneConfigured();
  const whatsappReady = isWhatsAppConfigured();

  const filteredVehicles =
    selectedCategory === 'all'
      ? sampleVehicles
      : sampleVehicles.filter((v) => v.category === selectedCategory);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: `All Vehicles (${sampleVehicles.length})` },
    { id: 'sedan', label: 'Comfort Sedans' },
    { id: 'suv', label: 'Family SUVs' },
    { id: 'luxury', label: 'Premium MPVs' },
    { id: 'hatchback', label: 'Economy Hatchbacks' },
    { id: 'tempo-traveller', label: 'Tempo Travellers' },
  ];

  return (
    <div className="bg-sand-50/40 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Our Fleet' }]} />

        {/* Page Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-navy-200/80">
          <SectionHeading
            eyebrow="Commercial Fleet Categories"
            title="Sanitized Cabs for Every Odisha Journey"
            subtitle="Choose from comfortable sedans, spacious family SUVs, economical hatchbacks, and group tempo travellers driven by experienced highway chauffeurs."
            className="mb-0"
          />
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="primary"
              size="md"
              onClick={() => openBooking()}
              leftIcon={<Car className="w-4 h-4 text-brand-400" />}
            >
              Plan Journey
            </Button>
            {phoneReady && (
              <a href={getPhoneUrl()}>
                <Button variant="secondary" size="md" leftIcon={<Phone className="w-4 h-4" />}>
                  Call Desk
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Commercial Fleet Assurance */}
        <div className="p-3.5 rounded-xl bg-sand-100 border border-navy-200/80 text-xs text-navy-700 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold text-navy-900">Commercial yellow-plate vehicles with valid RTO fitness and passenger insurance.</span>
          </div>
          <span className="text-navy-500 text-[11px]">All rentals include sanitized cabin, professional chauffeur, and fuel.</span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-semibold text-navy-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-brand-600" /> Categories:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {/* Commercial Standards & Hygiene Pillars */}
        <div className="pt-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-navy-100 shadow-sm space-y-6">
            <div className="border-b border-navy-100 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-navy-950 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-600" />
                <span>Our Maintenance & Chauffeur Standards</span>
              </h3>
              <p className="text-xs sm:text-sm text-navy-600 mt-1">
                Every commercial vehicle in our network is held to strict mechanical and cleanliness criteria before dispatch.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-sand-50/80 border border-navy-100/80 space-y-1.5">
                <div className="flex items-center gap-2 text-navy-900 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  <span>Commercial Permits</span>
                </div>
                <p className="text-xs text-navy-600 leading-relaxed">
                  Yellow-plate commercial cabs with authorized state fitness certificates and active passenger insurance.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-sand-50/80 border border-navy-100/80 space-y-1.5">
                <div className="flex items-center gap-2 text-navy-900 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  <span>Daily Sanitization</span>
                </div>
                <p className="text-xs text-navy-600 leading-relaxed">
                  Interiors, seat covers, and AC vents are cleaned and sanitized prior to every long-distance highway departure.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-sand-50/80 border border-navy-100/80 space-y-1.5">
                <div className="flex items-center gap-2 text-navy-900 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  <span>Highway Chauffeurs</span>
                </div>
                <p className="text-xs text-navy-600 leading-relaxed">
                  Experienced, verified local drivers familiar with Odisha tourist circuits, ghat sections, and highway tollways.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-sand-50/80 border border-navy-100/80 space-y-1.5">
                <div className="flex items-center gap-2 text-navy-900 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  <span>Boot & Luggage Space</span>
                </div>
                <p className="text-xs text-navy-600 leading-relaxed">
                  Dedicated trunk space for family luggage with optional rooftop carriers available for extended temple circuits.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Finding Cab CTA Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Unsure Which Vehicle Fits Your Luggage & Family?
            </h3>
            <p className="text-xs sm:text-sm text-navy-300 max-w-xl">
              Connect directly with our reservation team. We will help you select the ideal vehicle category based on passenger count, highway terrain, and journey duration.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            {whatsappReady ? (
              <a
                href={getWhatsAppUrl('Hello Subham Travelers, I need advice choosing a cab category for my journey.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="md" leftIcon={<MessageSquare className="w-4 h-4" />}>
                  WhatsApp Help
                </Button>
              </a>
            ) : null}
            {phoneReady ? (
              <a href={getPhoneUrl()}>
                <Button variant="secondary" size="md" leftIcon={<Phone className="w-4 h-4" />}>
                  Call {brandConfig.contact.phoneDisplay}
                </Button>
              </a>
            ) : (
              <Button variant="secondary" size="md" onClick={() => openBooking()}>
                Open Booking Enquiry
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
