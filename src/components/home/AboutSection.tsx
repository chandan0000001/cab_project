import { brandConfig } from '@/data/brandConfig';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CheckCircle2, User, Quote, Shield, Compass } from 'lucide-react';

export function AboutSection() {
  const { ceoProfile } = brandConfig;

  return (
    <section id="about-company-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <SectionHeading
        eyebrow="Our Company & Culture"
        title="Dependable Highway Transit Rooted in Odisha"
        subtitle="Bridging travelers, families, and corporate executives with punctual chauffeurs, sanitized commercial cars, and zero-compromise passenger safety."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Authentic Travel & Chauffeur Photograph */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-card border border-navy-100 bg-navy-900 aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
            <img
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=900&auto=format&fit=crop&q=80"
              alt="Subham Travelers Highway Chauffeur and Vehicle"
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

            {/* Inset Badge */}
            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-navy-100 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-navy-900 flex items-center justify-center text-brand-400 shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-navy-900">Commercial yellow-plate compliance</h4>
                  <p className="text-[11px] text-navy-500">Full vehicle insurance, fitness certificates & GPS tracking</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Company Narrative & Configurable CEO Profile Area */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4 text-sm sm:text-base text-navy-700 leading-relaxed">
            <p>
              Headquartered in <strong className="text-navy-950 font-semibold">{brandConfig.headquarters}</strong>, {brandConfig.brandName} was established to solve the persistent challenges of intercity road travel in Odisha: unpredictable taxi surge charges, poorly maintained cabins, and lack of driver punctuality.
            </p>
            <p>
              We treat road journeys starting from Berhampur with high responsibility — whether conveying devotees to sacred Shree Jagannath Temple in Puri or Maa Tara Tarini Shakti Peetha, facilitating urgent patient transit to MKCG Medical College & Hospital or Bhubaneswar hospitals, or providing punctual transfers to Biju Patnaik International Airport (BBI).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-navy-800">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-sand-50 border border-navy-100">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Strict driver vetting:</strong> Background checks and local route familiarity.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-sand-50 border border-navy-100">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Odisha-wide reach:</strong> Operations covering both coastal and interior districts.
                </span>
              </div>
            </div>
          </div>

          {/* Configurable CEO / Founder Profile Area with Explicit Placeholders */}
          <Card className="p-5 sm:p-6 bg-sand-50/80 border-navy-200/80">
            <div className="flex items-start gap-4">
              {/* Silhouette / Photo Placeholder */}
              <div className="w-14 h-14 rounded-full bg-navy-200 border-2 border-navy-300 flex items-center justify-center text-navy-600 shrink-0">
                <User className="w-7 h-7" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h4 className="font-bold text-base text-navy-950">
                    {ceoProfile.namePlaceholder}
                  </h4>
                  <span className="text-[11px] font-medium text-navy-500 bg-white px-2 py-0.5 rounded border border-navy-200 inline-block self-start">
                    Leadership Profile Area
                  </span>
                </div>
                <p className="text-xs text-brand-700 font-medium mb-3">
                  {ceoProfile.titlePlaceholder}
                </p>

                <div className="relative pl-4 border-l-2 border-brand-500/60 my-2">
                  <Quote className="w-3.5 h-3.5 text-brand-600 absolute -top-1 -left-2" />
                  <p className="text-xs italic text-navy-700 leading-relaxed">
                    {ceoProfile.messagePlaceholder}
                  </p>
                </div>

                <p className="text-[11px] text-navy-500 mt-2">
                  {ceoProfile.bioPlaceholder}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-navy-200/60 flex items-center justify-between text-[11px] text-navy-400">
              <span className="flex items-center gap-1">
                <Compass className="w-3 h-3 text-brand-600" />
                Service Philosophy: Transparent, Courteous, On-Time
              </span>
              <span>Pending Final Owner Verification</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
