import { MessageSquare, Car, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { HeroDispatchShowcase } from '@/components/home/HeroDispatchShowcase';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { isWhatsAppConfigured, getWhatsAppUrl } from '@/lib/contactUtils';

export function HeroSection() {
  const { openBooking } = useBookingFlow();
  const whatsappReady = isWhatsAppConfigured();

  const handleWhatsAppDesk = () => {
    if (whatsappReady) {
      window.open(
        getWhatsAppUrl('Hello Subham Travelers, I would like to enquire about booking a cab.'),
        '_blank',
        'noopener,noreferrer'
      );
    } else {
      openBooking({ tripType: 'one-way' });
    }
  };

  return (
    <section className="relative bg-slate-50/80 text-slate-900 pt-8 pb-14 sm:pt-14 sm:pb-20 border-b border-slate-200 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand Message, Headlines & Dual CTAs */}
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
            <ScrollReveal direction="up" delay={50}>
              {/* Clean Trust Chip */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-bold tracking-wider shadow-sm uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct Operator from Berhampur — Silk City, Odisha</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={120}>
              {/* Authoritative Solid Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight text-slate-900 leading-[1.08]">
                Cab Service Starting from{' '}
                <span className="text-blue-600">Berhampur</span>{' '}
                to Everywhere in Odisha.
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={180}>
              {/* Clear value proposition */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                Silk City's direct cab operator. Point-to-point one-way cabs, dedicated round-trip tours, Berhampur to Bhubaneswar Airport (BBI) transfers, BAM railway station & MKCG hospital transit across all 30 districts of Odisha. Fixed transparent quotes in 15 minutes.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={240}>
              {/* Action Buttons: Dual high-impact CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => openBooking({ tripType: 'one-way' })}
                  className="w-full sm:w-auto font-bold shadow-sm"
                  leftIcon={<Car className="w-5 h-5 text-white" />}
                >
                  Plan Journey / Get Quote
                </Button>

                <Button
                  variant="whatsapp"
                  size="lg"
                  onClick={handleWhatsAppDesk}
                  className="w-full sm:w-auto font-bold shadow-sm"
                  leftIcon={<MessageSquare className="w-5 h-5" />}
                >
                  WhatsApp Dispatch Desk
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              {/* Stat Counters Strip */}
              <div className="pt-4 border-t border-slate-200">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                    <span className="text-xl font-black text-slate-900 tracking-tight font-mono">24×7</span>
                    <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mt-0.5">
                      Direct Dispatch
                    </p>
                    <p className="text-[10px] text-slate-500">Active phone & chat</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                    <span className="text-xl font-black text-slate-900 tracking-tight font-mono">100%</span>
                    <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mt-0.5">
                      Commercial AC
                    </p>
                    <p className="text-[10px] text-slate-500">Yellow-plate fleet</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                    <span className="text-xl font-black text-slate-900 tracking-tight font-mono">30</span>
                    <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mt-0.5">
                      Districts
                    </p>
                    <p className="text-[10px] text-slate-500">All Odisha routes</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                    <span className="text-xl font-black text-slate-900 tracking-tight font-mono">15m</span>
                    <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mt-0.5">
                      Fast Quote
                    </p>
                    <p className="text-[10px] text-slate-500">Quick WhatsApp desk</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Real Fleet & Route Dispatch Showcase */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="up" delay={200}>
              <HeroDispatchShowcase />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
