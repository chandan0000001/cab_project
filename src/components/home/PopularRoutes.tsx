import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sampleRoutes } from '@/data/routes';
import { RouteCard } from '@/components/cards/RouteCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { RouteRegion } from '@/types';
import { ArrowRight, Compass } from 'lucide-react';

export function PopularRoutes() {
  const [selectedRegion, setSelectedRegion] = useState<RouteRegion>('all');

  const filteredRoutes =
    selectedRegion === 'all'
      ? sampleRoutes
      : sampleRoutes.filter((r) => r.region === selectedRegion);

  return (
    <section id="popular-routes-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <ScrollReveal direction="up" delay={50}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <SectionHeading
            eyebrow="Highway Corridors"
            title="Popular Intercity Routes from Berhampur"
            subtitle="Fixed transparent route options starting from Berhampur to Bhubaneswar Airport, Puri, Gopalpur Beach, Tara Tarini, Daringbadi, and beyond."
            className="mb-0"
          />

          <Link to="/routes" className="shrink-0">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All {sampleRoutes.length} Routes
            </Button>
          </Link>
        </div>
      </ScrollReveal>

      {/* Regional Corridor Filter Tabs */}
      <ScrollReveal direction="up" delay={100}>
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
            <Compass className="w-3.5 h-3.5 text-blue-600" /> Corridors:
          </span>
          <button
            type="button"
            onClick={() => setSelectedRegion('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedRegion === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-950 border border-slate-200'
            }`}
          >
            All Routes ({sampleRoutes.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedRegion('coastal-heritage')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedRegion === 'coastal-heritage'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-950 border border-slate-200'
            }`}
          >
            Coastal & Heritage (Puri, Gopalpur)
          </button>
          <button
            type="button"
            onClick={() => setSelectedRegion('southern-hills')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedRegion === 'southern-hills'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-950 border border-slate-200'
            }`}
          >
            Southern & Hills (Daringbadi, Taptapani)
          </button>
          <button
            type="button"
            onClick={() => setSelectedRegion('western-odisha')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedRegion === 'western-odisha'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-950 border border-slate-200'
            }`}
          >
            Western Corridor (Sambalpur)
          </button>
        </div>
      </ScrollReveal>

      {/* Grid of filtered routes: top 3 on mobile for fast scrolling, 6 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredRoutes.slice(0, 6).map((route, idx) => (
          <ScrollReveal
            key={route.id}
            direction="up"
            delay={(idx % 3) * 100}
            distance="20px"
            className={idx >= 3 ? 'hidden md:block' : ''}
          >
            <RouteCard route={route} index={idx} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
