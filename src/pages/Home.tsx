import { lazy, Suspense } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { brandConfig } from '@/data/brandConfig';

// Lazy-load below-the-fold sections for instant FCP and reduced TBT
const MetricsBand = lazy(() => import('@/components/home/MetricsBand').then((m) => ({ default: m.MetricsBand })));
const FleetPreview = lazy(() => import('@/components/home/FleetPreview').then((m) => ({ default: m.FleetPreview })));
const PopularRoutes = lazy(() => import('@/components/home/PopularRoutes').then((m) => ({ default: m.PopularRoutes })));
const DestinationGrid = lazy(() => import('@/components/home/DestinationGrid').then((m) => ({ default: m.DestinationGrid })));

function SectionFallback({ height = '300px' }: { height?: string }) {
  return (
    <div style={{ minHeight: height }} className="w-full flex items-center justify-center p-8 bg-slate-50/30">
      <div className="w-6 h-6 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
    </div>
  );
}

export function Home() {
  useDocumentTitle(
    brandConfig.tagline,
    'Subham Travelers provides reliable one-way cabs, round-trip intercity transport, airport transfers, and Odisha pilgrimage tours with verified local drivers.'
  );

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 pb-16 bg-slate-50/60 overflow-hidden">
      <HeroSection />

      <Suspense fallback={<SectionFallback height="280px" />}>
        <ScrollReveal direction="up" delay={50}>
          <MetricsBand />
        </ScrollReveal>
      </Suspense>

      <Suspense fallback={<SectionFallback height="360px" />}>
        <ScrollReveal direction="up" delay={50}>
          <FleetPreview />
        </ScrollReveal>
      </Suspense>

      <Suspense fallback={<SectionFallback height="360px" />}>
        <ScrollReveal direction="up" delay={50}>
          <PopularRoutes />
        </ScrollReveal>
      </Suspense>

      <Suspense fallback={<SectionFallback height="420px" />}>
        <ScrollReveal direction="up" delay={50}>
          <DestinationGrid />
        </ScrollReveal>
      </Suspense>
    </div>
  );
}

export default Home;
