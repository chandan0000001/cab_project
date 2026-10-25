import { HeroSection } from '@/components/home/HeroSection';
import { MetricsBand } from '@/components/home/MetricsBand';
import { FleetPreview } from '@/components/home/FleetPreview';
import { PopularRoutes } from '@/components/home/PopularRoutes';
import { DestinationGrid } from '@/components/home/DestinationGrid';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { brandConfig } from '@/data/brandConfig';

export function Home() {
  useDocumentTitle(
    brandConfig.tagline,
    'Subham Travelers provides reliable one-way cabs, round-trip intercity transport, airport transfers, and Odisha pilgrimage tours with verified local drivers.'
  );

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 pb-16 bg-slate-50/60 overflow-hidden">
      <HeroSection />

      <ScrollReveal direction="up" delay={80}>
        <MetricsBand />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={80}>
        <FleetPreview />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={80}>
        <PopularRoutes />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={80}>
        <DestinationGrid />
      </ScrollReveal>
    </div>
  );
}

export default Home;
