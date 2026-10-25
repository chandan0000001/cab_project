import { Link } from 'react-router-dom';
import { sampleDestinations } from '@/data/destinations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight, MapPin, Clock, ShieldCheck, MessageSquare, Sparkles } from 'lucide-react';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { isWhatsAppConfigured, getWhatsAppUrl } from '@/lib/contactUtils';
import { brandConfig } from '@/data/brandConfig';
import { sound } from '@/lib/sound';

export function DestinationGrid() {
  const { openBooking } = useBookingFlow();
  const whatsappReady = isWhatsAppConfigured();

  const puri = sampleDestinations.find((d) => d.id === 'puri-jagannath-temple') || sampleDestinations[0];
  const daringbadi = sampleDestinations.find((d) => d.id === 'daringbadi') || sampleDestinations[1];
  const taraTarini = sampleDestinations.find((d) => d.id === 'tara-tarini-temple') || sampleDestinations[2];
  const gopalpur = sampleDestinations.find((d) => d.id === 'gopalpur-beach') || sampleDestinations[3];
  const taptapani = sampleDestinations.find((d) => d.id === 'taptapani-spring') || sampleDestinations[4];

  const handleBook = (name: string) => {
    sound.playPop();
    openBooking({
      tripType: 'one-way',
      pickupLocation: 'Berhampur',
      dropLocation: name,
    });
  };

  const handleWhatsApp = (name: string, location: string) => {
    sound.playTap();
    if (whatsappReady) {
      const msg = `Hello ${brandConfig.brandName}, I would like to book a cab from Berhampur to ${name} (${location}). Please provide package rate and vehicle availability.`;
      window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
    } else {
      handleBook(name);
    }
  };

  return (
    <section id="odisha-destinations-section" className="bg-slate-50 py-12 sm:py-16 border-y border-slate-200 scroll-mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <SectionHeading
              eyebrow="ODISHA TRAVEL CIRCUITS • TOURS & PILGRIMAGE"
              title="Popular Destinations Starting from Berhampur"
              subtitle="Explore ancient Shakti shrines, golden beach retreats, sulfur hot springs, Tibetan Buddhist monasteries, and sacred Jagannath Dham with verified local drivers."
              className="mb-0"
            />

            <Link to="/destinations" className="shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => sound.playTap()}
                className="rounded-full border-slate-300 font-semibold text-xs px-4 py-2 hover:bg-white"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore All {sampleDestinations.length} Destinations
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-7 rounded-3xl overflow-hidden bg-slate-950 text-white relative min-h-[400px] sm:min-h-[460px] flex flex-col justify-between p-6 sm:p-8 group shadow-lg border border-slate-800 transition-all duration-300 hover:shadow-xl">
            <img
              src={puri.imageUrl || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80'}
              alt={puri.name}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-45 group-hover:scale-105 group-hover:opacity-50 transition-all duration-500 pointer-events-none"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between gap-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sacred Dham Circuit</span>
              </div>
              <span className="text-xs font-semibold text-slate-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                185 KM • NH-16 EXPRESS
              </span>
            </div>

            <div className="relative z-10 space-y-4 pt-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-1">
                  Holy Jagannath Dham & Beach
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                  {puri.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl line-clamp-2 leading-relaxed">
                  {puri.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-slate-200">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> ~4.5 Hours Direct Drive
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Temple Parking Waiting Included
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleBook(puri.name)}
                  className="font-bold text-xs sm:text-sm rounded-full px-5 py-2.5 shadow-md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Book Puri Cab
                </Button>

                {whatsappReady && (
                  <button
                    type="button"
                    onClick={() => handleWhatsApp(puri.name, puri.location)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1F6F3F] hover:bg-[#155A30] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Inquiry</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl overflow-hidden bg-slate-950 text-white relative min-h-[400px] sm:min-h-[460px] flex flex-col justify-between p-6 sm:p-8 group shadow-lg border border-slate-800 transition-all duration-300 hover:shadow-xl">
            <img
              src={daringbadi.imageUrl || 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1000&auto=format&fit=crop&q=80'}
              alt={daringbadi.name}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-45 group-hover:scale-105 group-hover:opacity-50 transition-all duration-500 pointer-events-none"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between gap-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kashmir of Odisha</span>
              </div>
              <span className="text-xs font-semibold text-slate-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                120 KM • GHAT ROAD
              </span>
            </div>

            <div className="relative z-10 space-y-4 pt-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-1">
                  Pine Valleys & Hill Retreat
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                  {daringbadi.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                  {daringbadi.tagline || daringbadi.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-slate-200">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> ~3.5h via Sorada Ghats
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Hill-Certified Driver
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleBook(daringbadi.name)}
                  className="font-bold text-xs sm:text-sm rounded-full px-5 py-2.5 shadow-md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Book Daringbadi Cab
                </Button>

                {whatsappReady && (
                  <button
                    type="button"
                    onClick={() => handleWhatsApp(daringbadi.name, daringbadi.location)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1F6F3F] hover:bg-[#155A30] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Inquiry</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {[
            {
              item: taraTarini,
              circuitTag: 'Adi Shakti Peetha Circuit',
              highwayTag: '30 KM • ~45 MINS',
              cta: 'Book Tara Tarini Cab',
            },
            {
              item: gopalpur,
              circuitTag: 'Ganjam Coastal Resort',
              highwayTag: '16 KM • ~25 MINS',
              cta: 'Book Gopalpur Beach Cab',
            },
            {
              item: taptapani,
              circuitTag: 'Monastery & Hot Springs',
              highwayTag: '85 KM • ~2.5 HRS',
              cta: 'Book Taptapani Cab',
            },
          ].map(({ item, circuitTag, highwayTag, cta }) => (
            <div
              key={item.id}
              className="lg:col-span-4 rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-lg hover:border-blue-400"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 inset-x-3 flex items-center justify-between text-xs font-bold text-white">
                  <span className="bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 text-white text-[11px]">
                    {circuitTag}
                  </span>
                  <span className="bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full text-[10px]">
                    {highwayTag}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    {item.location}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {item.tagline || item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleBook(item.name)}
                    className="flex-1 text-xs font-bold min-h-[40px] rounded-full"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    {cta}
                  </Button>

                  {whatsappReady && (
                    <button
                      type="button"
                      onClick={() => handleWhatsApp(item.name, item.location)}
                      className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-[#1F6F3F] hover:bg-[#155A30] text-white flex items-center justify-center shrink-0 border border-emerald-500/30 shadow-xs transition-all hover:scale-105 cursor-pointer"
                      title="Enquire on WhatsApp"
                      aria-label={`Enquire about ${item.name} on WhatsApp`}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
