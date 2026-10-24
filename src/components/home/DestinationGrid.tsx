import { Link } from 'react-router-dom';
import { sampleDestinations } from '@/data/destinations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { DestinationCard } from '@/components/cards/DestinationCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight } from 'lucide-react';

export function DestinationGrid() {
  // Top 4 curated destinations originating from Berhampur for high conversion & fast scrolling
  const topDestinations = [
    sampleDestinations.find((d) => d.id === 'gopalpur-beach')!,
    sampleDestinations.find((d) => d.id === 'tara-tarini-temple')!,
    sampleDestinations.find((d) => d.id === 'taptapani-spring')!,
    sampleDestinations.find((d) => d.id === 'puri-jagannath-temple')!,
  ].filter(Boolean);

  return (
    <section id="odisha-destinations-section" className="bg-slate-50 py-12 sm:py-16 border-y border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <SectionHeading
              eyebrow="Popular Tourism & Pilgrimage"
              title="Top Destinations Starting from Berhampur"
              subtitle="Explore ancient Shakti shrines, beach resorts, hot water sulfur springs, Buddhist monasteries, and sacred Jagannath Dham with verified highway chauffeurs."
              className="mb-0"
            />

            <Link to="/destinations" className="shrink-0">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All {sampleDestinations.length} Destinations
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        {/* Responsive Grid: top 2 on mobile for fast scroll, all 4 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {topDestinations.map((dest, idx) => (
            <ScrollReveal
              key={dest.id}
              direction="up"
              delay={idx * 100}
              distance="20px"
              className={idx >= 2 ? 'hidden md:block' : ''}
            >
              <DestinationCard destination={dest} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
