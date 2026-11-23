import { MapPin, ShieldCheck, Phone, Check } from 'lucide-react';
import { HeroDispatchShowcase } from '@/components/home/HeroDispatchShowcase';
import { getPhoneUrl, isPhoneConfigured } from '@/lib/contactUtils';

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-blue-50 via-white to-slate-100 py-10 sm:py-16 lg:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-12 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3 py-2 text-sm font-semibold text-blue-800">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Your local cab partner in Berhampur
          </div>
          <h1 id="hero-heading" className="text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl xl:text-6xl">
            A comfortable ride.<br />
            <span className="text-blue-600">Wherever Odisha takes you.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
            From airport pickups to coastal escapes, travel with a local driver and a cab that fits your plans. Start in Berhampur. We’ll take it from there.
          </p>
          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium text-slate-700">
            {['One-way & round trips', 'Doorstep pickup', 'Clear fare quotes'].map((label) => (
              <li key={label} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600" aria-hidden="true" />{label}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-start gap-3 border-t border-slate-200 pt-6">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-700"><ShieldCheck className="h-5 w-5" aria-hidden="true" /></div>
            <div>
              <p className="font-semibold text-slate-900">Local people. Personal service.</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">Book directly with Subham Travelers.</p>
              {isPhoneConfigured() && (
                <a href={getPhoneUrl()} className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700">
                  <Phone className="h-4 w-4" aria-hidden="true" />Talk to our booking team
                </a>
              )}
            </div>
          </div>
        </div>
        <HeroDispatchShowcase />
      </div>
    </section>
  );
}
