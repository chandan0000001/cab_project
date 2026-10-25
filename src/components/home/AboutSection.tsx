import { brandConfig } from '@/data/brandConfig';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CheckCircle2, Quote, Shield, Compass } from 'lucide-react';

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
              We treat road journeys starting from Berhampur with high responsibility — whether conveying devotees to sacred Shree Jagannath Temple in Puri or Maa Tara Tarini Shakti Peetha, facilitating urgent patient transit to MKCG Medical College & Hospital or Bhubaneswar hospitals, or providing punctual transfers to Bhubaneswar Airport (Biju Patnaik International Airport).
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

          {/* Verified Founder & Leadership Profile Card */}
          <Card className="p-5 sm:p-6 bg-white border-slate-200 shadow-sm rounded-2xl">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {/* Founder Portrait Photo */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-blue-600/30 shadow-md shrink-0 bg-slate-100">
                <img
                  src={ceoProfile.image || '/images/team/owner_square.webp'}
                  alt={`${ceoProfile.namePlaceholder} - Founder & Managing Director of Subham Travelers`}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h4 className="font-black text-base sm:text-lg text-slate-900 flex items-center gap-1.5">
                    <span>{ceoProfile.namePlaceholder}</span>
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  </h4>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 inline-flex items-center gap-1 self-start">
                    Verified Owner & Operator
                  </span>
                </div>
                <p className="text-xs text-blue-700 font-bold mb-2.5">
                  {ceoProfile.titlePlaceholder} • Subham Travelers
                </p>

                <div className="relative pl-3.5 border-l-2 border-blue-600 my-2">
                  <Quote className="w-3.5 h-3.5 text-blue-600 absolute -top-1 -left-2" />
                  <p className="text-xs italic text-slate-700 leading-relaxed font-medium">
                    {ceoProfile.messagePlaceholder}
                  </p>
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {ceoProfile.bioPlaceholder}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <Compass className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                Service Philosophy: Transparent, Courteous, On-Time
              </span>
              <span className="text-blue-700 font-bold">
                Station Road, Berhampur (Silk City), Odisha
              </span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
