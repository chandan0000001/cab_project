import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { brandConfig } from '@/data/brandConfig';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { isPhoneConfigured, isWhatsAppConfigured, getPhoneUrl, getWhatsAppUrl } from '@/lib/contactUtils';
import {
  ShieldCheck,
  HeartHandshake,
  Compass,
  CheckCircle2,
  Phone,
  MessageSquare,
  Car,
  Award,
  Sparkles,
  Info,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function About() {
  useDocumentTitle(
    'About Us',
    'Learn about Subham Travelers - Our mission to provide dependable, transparent, and courteous cab services across Odisha.'
  );

  const { openBooking } = useBookingFlow();
  const phoneReady = isPhoneConfigured();
  const whatsappReady = isWhatsAppConfigured();
  const { ceoProfile } = brandConfig;

  return (
    <div className="bg-sand-50/40 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumbs */}
        <Breadcrumb items={[{ label: 'About Us' }]} />

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-navy-200/80">
          <SectionHeading
            eyebrow="Our Story & Philosophy"
            title="Dependable Highway Travel Rooted in Odisha"
            subtitle="Bridging travelers, local families, and pilgrimage visitors with safe, sanitized vehicles and knowledgeable local chauffeurs."
            className="mb-0"
          />
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <Button
              variant="primary"
              size="md"
              onClick={() => openBooking({ tripType: 'one-way' })}
              leftIcon={<Car className="w-4 h-4 text-brand-400" />}
            >
              Plan Your Journey
            </Button>
            <Link to="/contact">
              <Button variant="outline" size="md">
                Contact Desk
              </Button>
            </Link>
          </div>
        </div>

        {/* Overview & Travel Imagery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-navy-700 leading-relaxed">
            <h3 className="text-xl sm:text-2xl font-bold text-navy-950">
              Welcome to <span className="text-brand-600">{brandConfig.brandName}</span>
            </h3>
            <p>
              Travel across Odisha is unique and deeply personal. From morning rituals at Shree Jagannath Temple in Puri and sunset walks along Gopalpur Beach, to critical business travel between Bhubaneswar and industrial Sambalpur, every journey requires reliability and peace of mind.
            </p>
            <p>
              {brandConfig.brandName} was established to solve common highway travel concerns: unexpected cancellations, unhygienic cabs, and unpredictable pricing. We coordinate dedicated, yellow-plate commercial cabs driven by verified chauffeurs who understand local highway conditions, temple darshan timings, and ghat sections.
            </p>

            <div className="pt-2 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <span className="text-sm text-navy-800">
                  <strong>Transparent Coordination:</strong> Direct quotes and clear travel itineraries confirmed before vehicle dispatch.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <span className="text-sm text-navy-800">
                  <strong>Punctual Station & Airport Transfers:</strong> Dedicated pickup at Biju Patnaik International Airport and major railway hubs.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <span className="text-sm text-navy-800">
                  <strong>Odisha-Wide Geographic Network:</strong> Active transit support across all 30 districts, heritage circuits, and eco-tourism corridors.
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-navy-100 h-72 sm:h-80">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1000&auto=format&fit=crop&q=80"
                alt="Scenic highway travel across Odisha"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-black/20" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-300">
                  Odisha State Highways
                </span>
                <p className="text-sm font-bold text-white mt-0.5">
                  Safe, scenic, and punctual cab transit across all 30 districts
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl overflow-hidden border border-navy-100 h-36">
                <img
                  src="https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=600&auto=format&fit=crop&q=80"
                  alt="Puri Jagannath Temple heritage"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-navy-100 h-36">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80"
                  alt="Odisha coastline and Chilika lagoon"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Company Core Values */}
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Our Core Principles"
            title="The Values That Guide Our Service"
            subtitle="We maintain an uncompromising dedication to commercial safety, passenger dignity, and honest communication."
            className="mb-0"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-white border-navy-100/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-navy-900 text-base mb-2">Safety & Compliance</h4>
                <p className="text-xs text-navy-600 leading-relaxed">
                  Every vehicle holds yellow-plate commercial permits, state fitness checks, and passenger insurance. Speed limits are strictly respected.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-white border-navy-100/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-navy-900 text-base mb-2">Courteous Chauffeurs</h4>
                <p className="text-xs text-navy-600 leading-relaxed">
                  Our chauffeurs are verified professionals who treat families, senior citizens, and tourists with utmost politeness and care.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-white border-navy-100/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-navy-900 text-base mb-2">Sanitized Fleet</h4>
                <p className="text-xs text-navy-600 leading-relaxed">
                  Interiors are cleaned and sanitized before every dispatch. Air conditioning is maintained at peak performance for summer highway comfort.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-white border-navy-100/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-navy-900 text-base mb-2">Local Knowledge</h4>
                <p className="text-xs text-navy-600 leading-relaxed">
                  Chauffeurs offer helpful guidance on temple timings, hygienic highway food stops, toll routes, and scenic coastal photo points.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* CEO / Founder Profile Section (Strict Placeholder Adherence) */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-navy-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy-100 pb-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-navy-950 flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-600" />
                <span>Leadership & Operations Vision</span>
              </h3>
              <p className="text-xs sm:text-sm text-navy-600 mt-1">
                Guiding Subham Travelers with transparency and commitment to regional road transit.
              </p>
            </div>
            <div>
              <Badge variant="navy" className="text-[11px] bg-navy-100 text-navy-800 border-navy-200">
                Operational Framework
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Leadership Avatar Placeholder */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-tr from-navy-900 via-navy-800 to-brand-900 text-sand-100 flex items-center justify-center shadow-md mb-4 relative overflow-hidden border-2 border-brand-500/30">
                <User className="w-16 h-16 text-brand-300/80" />
                <div className="absolute bottom-2 text-[10px] text-sand-300 font-medium px-2 py-0.5 rounded bg-navy-950/80">
                  Leadership Profile
                </div>
              </div>
              <h4 className="font-bold text-navy-950 text-base">
                {ceoProfile.namePlaceholder}
              </h4>
              <p className="text-xs text-navy-500 mt-0.5 font-medium">
                {ceoProfile.titlePlaceholder}
              </p>
              <p className="text-[11px] text-brand-700 mt-1">
                Subham Travelers • Berhampur (Silk City), Odisha
              </p>
            </div>

            {/* Profile Message & Biography */}
            <div className="md:col-span-8 space-y-4">
              <blockquote className="p-4 rounded-xl bg-sand-50 border-l-4 border-brand-500 text-xs sm:text-sm text-navy-800 italic leading-relaxed">
                {ceoProfile.messagePlaceholder}
              </blockquote>

              <p className="text-xs sm:text-sm text-navy-700 leading-relaxed">
                {ceoProfile.bioPlaceholder}
              </p>

              {/* Explicit Verification Notice */}
              <div className="p-3.5 rounded-lg bg-navy-50 border border-navy-200/80 text-xs text-navy-600 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-navy-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Notice on Verified Documentation:</strong> The leadership biography and founder profile details above represent an operational placeholder. Official corporate registration, founder certifications, and verified credentials will be updated upon final verification by the business owners.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Have Questions or Special Travel Arrangements?
            </h3>
            <p className="text-xs sm:text-sm text-navy-300 max-w-xl">
              Our reservation team in Berhampur is available 24/7 to coordinate outstation trips, airport transfers to Bhubaneswar, hospital transit, and family pilgrimage packages.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            {whatsappReady ? (
              <a
                href={getWhatsAppUrl('Hello Subham Travelers, I would like to enquire about your services.')}
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
                  Call {brandConfig.contact.phoneDisplay}
                </Button>
              </a>
            ) : (
              <Link to="/contact">
                <Button variant="secondary" size="md">
                  View Contact Desk
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
