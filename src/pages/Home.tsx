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
    'Subham Travelers provides reliable one-way cabs, round-trip intercity transport, airport transfers, and Odisha pilgrimage tours with verified chauffeurs.'
  );

  return (
    <div className="space-y-10 sm:space-y-14 lg:space-y-18 pb-10 sm:pb-14 bg-white overflow-hidden">
      {/* 1. Hero Section + Fast Vehicle & Route Selector */}
      <HeroSection />

      {/* 2. Winter & Festival Deals Showcase (10%–15% OFF - Bold Orange with Black Borders) */}
      <ScrollReveal direction="up" delay={80}>
        <MetricsBand />
      </ScrollReveal>

      {/* 3. Choose Your Vehicle (Dzire, Ertiga, Innova) */}
      <ScrollReveal direction="up" delay={80}>
        <FleetPreview />
      </ScrollReveal>

      {/* 4. Popular Routes Starting from Berhampur */}
      <ScrollReveal direction="up" delay={80}>
        <PopularRoutes />
      </ScrollReveal>

      {/* 5. Top Odisha Destinations & Pilgrimage Circuits */}
      <ScrollReveal direction="up" delay={80}>
        <DestinationGrid />
      </ScrollReveal>
    </div>
  );
}

export default Home;
