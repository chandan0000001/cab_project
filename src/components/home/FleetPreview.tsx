import { Link } from 'react-router-dom';
import { sampleVehicles } from '@/data/vehicles';
import { VehicleCard } from '@/components/cards/VehicleCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export function FleetPreview() {
  return (
    <section id="fleet-preview-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <ScrollReveal direction="up" delay={50}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <SectionHeading
            eyebrow="COMMERCIAL FLEET • SILK CITY"
            title="Our Fleet for Every Odisha Journey"
            subtitle="From executive sedans for Bhubaneswar Airport transfers to spacious 7-seater Innova Crystas and Tempo Travellers for family temple circuits — all verified chauffeur-driven vehicles."
            className="mb-0"
          />

          <div className="flex items-center gap-3 shrink-0">
            <Link to="/fleet">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-slate-300 font-semibold text-xs px-4 py-2 hover:bg-white"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Full Fleet
              </Button>
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* Grid of commercial categories: 3 on mobile for fast scroll, all 4 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {sampleVehicles.slice(0, 4).map((vehicle, idx) => (
          <ScrollReveal
            key={vehicle.id}
            direction="up"
            delay={idx * 100}
            distance="20px"
            className={idx === 3 ? 'hidden md:block' : ''}
          >
            <VehicleCard vehicle={vehicle} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal direction="up" delay={250}>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-navy-700 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>All vehicles hold commercial passenger permits, AC, GPS tracking & comprehensive passenger insurance</span>
        </div>
      </ScrollReveal>
    </section>
  );
}
