import { Card } from '@/components/ui/Card';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { brandConfig } from '@/data/brandConfig';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { isPhoneConfigured, isWhatsAppConfigured, getPhoneUrl, getWhatsAppUrl } from '@/lib/contactUtils';
import { sound } from '@/lib/sound';
import {
  ShieldCheck,
  HeartHandshake,
  Compass,
  CheckCircle2,
  MessageSquare,
  Award,
  Sparkles,
  MapPin,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function About() {
  useDocumentTitle(
    'About Us | Subham Travelers Berhampur',
    'Learn about Subham Travelers - Our mission to provide dependable, transparent, and courteous cab services across Odisha.'
  );

  const { openBooking } = useBookingFlow();
  const phoneReady = isPhoneConfigured();
  const whatsappReady = isWhatsAppConfigured();
  const { ceoProfile } = brandConfig;

  const handlePlanJourney = () => {
    sound.playPop();
    openBooking({ tripType: 'one-way', pickupLocation: 'Berhampur' });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        <Breadcrumb items={[{ label: 'About Us' }]} />

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Founded in Silk City, Berhampur • Odisha Highway Mobility</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 leading-[1.15]">
              Your Trusted Direct Fleet Partner <span className="text-blue-600">Across Odisha</span>.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Connecting Berhampur families, corporate travelers, tourists, and pilgrimage devotees with punctual, commercial yellow-plate cabs and verified local chauffeurs who prioritize your safety and comfort.
            </p>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-4 sm:gap-6 flex-wrap text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Station & MKCG Transit Desk</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>100% Commercial Yellow-Plate Cabs</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Local Chauffeurs</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Zero Hidden Return Surcharges</span>
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Our Story & Commitment
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Dependable Highway Travel Rooted in Odisha
              </h2>

              <p>
                Travel across Odisha is unique and deeply personal. From early morning darshan runs to Shree Jagannath Temple in Puri and scenic coastal drives to Gopalpur-on-Sea, to emergency patient transit between Berhampur and AIIMS Bhubaneswar, every trip demands uncompromising punctuality and peace of mind.
              </p>
              <p>
                <strong>{brandConfig.brandName}</strong> was founded in Berhampur to fix what travelers dread most: last-minute cancellations, unlicensed private cars posing as taxis, unhygienic cabins, and surprise rate surges. We manage dedicated commercial yellow-plate sedans and MPVs driven by courteous, verified local chauffeurs who respect your family's time.
              </p>

              <div className="pt-2 space-y-2.5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-800">
                    <strong>Transparent Fixed Pricing:</strong> Clear, upfront quotations shared before vehicle dispatch with zero hidden fees.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-800">
                    <strong>Punctual Doorstep Dispatch:</strong> Guaranteed timely arrival at Berhampur Railway Station, MKCG Medical College, and local residences.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-800">
                    <strong>Odisha-Wide Geographic Reach:</strong> Active transit support across all 30 districts, coastal pilgrimage corridors, and hill station passes.
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <div className="relative rounded-2xl overflow-hidden shadow-xs border border-slate-200 h-64 sm:h-72">
                <img
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1000&auto=format&fit=crop&q=80"
                  alt="Scenic highway travel across Odisha"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                    Odisha State Highways
                  </span>
                  <p className="text-xs font-bold text-white mt-0.5">
                    Safe, scenic, and punctual transit across all 30 districts
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl overflow-hidden border border-slate-200 h-32">
                  <img
                    src="https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=600&auto=format&fit=crop&q=80"
                    alt="Puri Jagannath Temple heritage"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200 h-32">
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
        </div>

        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Our Core Principles
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              The Standards That Guide Every Trip
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Card className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">Safety & Permits</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every vehicle holds yellow-plate commercial permits, state fitness checks, and passenger insurance. Speed limits are strictly respected.
              </p>
            </Card>

            <Card className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">Courteous Chauffeurs</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our chauffeurs are verified professionals who treat families, senior citizens, and tourists with utmost politeness and care.
              </p>
            </Card>

            <Card className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">Sanitized AC Cabins</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Interiors are cleaned and sanitized before every dispatch. Dual-zone air conditioning is maintained at peak performance.
              </p>
            </Card>

            <Card className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">Local Highway Mastery</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chauffeurs offer helpful guidance on temple timings, hygienic highway food stops, toll routes, and scenic coastal photo points.
              </p>
            </Card>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Operations Management
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Founder & Operations Leadership
              </h3>
            </div>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              Verified Fleet Operator
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 flex flex-col items-center text-center p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <img
                src={ceoProfile.image}
                alt={ceoProfile.namePlaceholder}
                className="w-24 h-24 rounded-2xl object-cover shadow-xs border-2 border-white mb-3"
              />
              <h4 className="font-bold text-slate-900 text-base">
                {ceoProfile.namePlaceholder}
              </h4>
              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                {ceoProfile.titlePlaceholder}
              </p>
              <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                Berhampur (Silk City), Odisha
              </p>
            </div>

            <div className="md:col-span-8 space-y-3">
              <blockquote className="p-4 rounded-xl bg-blue-50/70 border-l-4 border-blue-600 text-xs sm:text-sm text-slate-800 italic leading-relaxed">
                {ceoProfile.messagePlaceholder}
              </blockquote>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {ceoProfile.bioPlaceholder}
              </p>
              <div className="flex items-center gap-3 pt-2">
                <Link to="/contact">
                  <Button variant="outline" size="sm" className="rounded-full text-xs font-bold border-slate-200">
                    Contact Management Desk
                  </Button>
                </Link>
                {phoneReady && (
                  <a href={getPhoneUrl()}>
                    <span className="text-xs text-blue-600 font-bold hover:underline">
                      Call {brandConfig.contact.phoneDisplay}
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Ready to Travel Across Odisha With Peace of Mind?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Book online or chat with our Berhampur reservation team for immediate cab allotment and upfront quotation.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            {whatsappReady && (
              <a
                href={getWhatsAppUrl('Hello Subham Travelers, I want to book a cab with your team.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="md" className="rounded-full font-bold px-5" leftIcon={<MessageSquare className="w-4 h-4" />}>
                  WhatsApp Concierge
                </Button>
              </a>
            )}
            <Button
              variant="primary"
              size="md"
              onClick={handlePlanJourney}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-5"
              leftIcon={<Calendar className="w-4 h-4" />}
            >
              Book Cab Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
