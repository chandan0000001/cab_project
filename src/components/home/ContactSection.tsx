import { Phone, Mail, MapPin, Clock, MessageSquare, Map as MapIcon, ShieldCheck } from 'lucide-react';
import { brandConfig } from '@/data/brandConfig';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ContactSection() {
  return (
    <section id="contact-cta-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <SectionHeading
        eyebrow="Direct Reservation Desk"
        title="Ready to Travel? Get in Touch With Us"
        subtitle="Speak directly with our central dispatch coordinators in Berhampur (Silk City) for immediate cab bookings, outstation quotes, airport transfers, and tour itineraries."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Direct Phone & WhatsApp Actions */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <Card className="p-6 sm:p-8 bg-white border-navy-100 shadow-card space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                Direct Contact Channels
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-navy-950 mt-1">
                Fast Confirmation via Phone or WhatsApp
              </h3>
              <p className="text-sm text-navy-600 mt-1.5 leading-relaxed">
                We maintain active dispatch coordinators available throughout the day and night to answer queries, provide vehicle availability, and coordinate pickup locations.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${brandConfig.contact.phoneRaw}`}
                className="w-full"
                aria-label={`Call ${brandConfig.contact.phoneDisplay}`}
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full font-bold justify-center shadow-sm"
                  leftIcon={<Phone className="w-5 h-5 text-brand-400" />}
                >
                  Call {brandConfig.contact.phoneDisplay}
                </Button>
              </a>

              <a
                href={`https://wa.me/${brandConfig.contact.whatsappRaw}?text=${encodeURIComponent(
                  `Hello ${brandConfig.brandName}, I would like to book a cab trip.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
                aria-label="Enquire via WhatsApp"
              >
                <Button
                  variant="whatsapp"
                  size="lg"
                  className="w-full font-bold justify-center shadow-sm"
                  leftIcon={<MessageSquare className="w-5 h-5" />}
                >
                  WhatsApp Enquiry
                </Button>
              </a>
            </div>

            {/* Detailed Placeholders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-navy-100 text-xs text-navy-700">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-sand-100 flex items-center justify-center text-brand-700 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-navy-900">Enquiry Hours</p>
                  <p className="text-navy-500 mt-0.5">{brandConfig.contact.officeHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-sand-100 flex items-center justify-center text-brand-700 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-navy-900">Email Address</p>
                  <a
                    href={`mailto:${brandConfig.contact.email}`}
                    className="text-navy-600 hover:text-brand-600 transition-colors mt-0.5 block"
                  >
                    {brandConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:col-span-2">
                <div className="w-9 h-9 rounded-lg bg-sand-100 flex items-center justify-center text-brand-700 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-navy-900">Central Office Address</p>
                  <address className="not-italic text-navy-600 mt-0.5">
                    {brandConfig.contact.addressLine1}, {brandConfig.contact.addressLine2}, {brandConfig.contact.city}, {brandConfig.contact.state} - {brandConfig.contact.pinCode}
                  </address>
                </div>
              </div>
            </div>
          </Card>

          {/* Peace of Mind Guarantee Banner */}
          <div className="p-4 rounded-xl bg-brand-50/80 border border-brand-200/80 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-brand-700 shrink-0" />
            <p className="text-xs text-navy-800">
              <strong>Transparent Fare Quote Guarantee:</strong> Toll charges, parking, and driver allowances are communicated clearly upfront before your travel departure.
            </p>
          </div>
        </div>

        {/* Right Column: Location / Interactive Map Placeholder */}
        <div className="lg:col-span-5 flex flex-col">
          <Card className="p-6 bg-white border-navy-100 shadow-card flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-base text-navy-950 flex items-center gap-2">
                  <MapIcon className="w-4 h-4 text-brand-600" />
                  Service Hub & Regional Reach
                </h4>
                <span className="text-[10px] font-semibold bg-sand-100 text-navy-600 px-2 py-0.5 rounded border border-navy-200">
                  Odisha Network
                </span>
              </div>
              <p className="text-xs text-navy-600 leading-relaxed mb-4">
                Serving travelers starting from Berhampur to Bhubaneswar Airport, Puri, Cuttack, Gopalpur Beach, Tara Tarini, Visakhapatnam, and all 30 Odisha district corridors.
              </p>
            </div>

            {/* Map Placeholder Graphic */}
            <div className="relative rounded-xl overflow-hidden bg-navy-950 text-sand-100 p-6 flex flex-col items-center justify-center text-center min-h-[220px] border border-navy-800">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80')`,
                }}
                aria-hidden="true"
              />
              <div className="relative z-10 space-y-2 max-w-xs">
                <div className="w-12 h-12 rounded-full bg-brand-900/80 border border-brand-500/60 text-brand-400 flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-sm text-white">Live OpenStreetMap Transit Network</h5>
                <p className="text-[11px] text-navy-300">
                  Interactive highway mapping, road distance calculation, and route previews are active in the trip search desk above.
                </p>
                <div className="pt-1">
                  <span className="inline-block text-[10px] bg-brand-600/30 text-brand-300 px-2.5 py-1 rounded-full border border-brand-500/30">
                    OpenStreetMap & OSRM Engine
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-navy-100 text-[11px] text-navy-500 flex justify-between items-center">
              <span>Operating Base: Berhampur (760001)</span>
              <span>24/7 Cab Coordination</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
