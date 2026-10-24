import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { brandConfig } from '@/data/brandConfig';
import { AlertCircle, FileText, CheckCircle2, ShieldAlert, Car, Scale, Clock } from 'lucide-react';

export function Terms() {
  useDocumentTitle(
    'Terms and Conditions',
    'Terms of service, travel guidelines, and booking conditions for Subham Travelers cab services in Odisha.'
  );

  return (
    <div className="bg-sand-50/40 min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Terms and Conditions' }]} />

        {/* Page Hero Header */}
        <SectionHeading
          eyebrow="Operational Terms"
          title="Terms and Conditions of Service"
          subtitle={`Draft Guidelines • Last reviewed: October 2026. General terms governing cab enquiries, journey coordination, and passenger obligations with ${brandConfig.brandName}.`}
        />

        {/* Draft Notice Warning */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-900">Draft Terms Notice:</span>
              <Badge variant="amber" size="sm" className="text-[10px]">
                Requires Owner Verification
              </Badge>
            </div>
            <p className="text-amber-800 leading-relaxed">
              These draft terms outline standard operational practices for cab and highway travel coordination across Odisha. Specific policies marked with an owner verification tag are subject to final adoption by Subham Travelers management.
            </p>
          </div>
        </div>

        <Card className="p-6 sm:p-10 bg-white border-navy-100/90 shadow-sm space-y-8 text-sm text-navy-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-navy-950 flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-600" />
              <span>1. Nature of the Enquiry Service</span>
            </h3>
            <p>
              <strong>Subham Travelers</strong> operates as a commercial cab booking and travel enquiry platform serving destinations across Odisha, India.
            </p>
            <p className="bg-sand-50 p-3 rounded-lg border-l-4 border-brand-500 font-medium text-navy-900">
              Important: Submitting an enquiry through our website forms, WhatsApp links, or telephone calls constitutes a booking request, NOT a guaranteed or confirmed booking.
            </p>
            <p>
              A booking is officially confirmed only after our reservation desk has verified vehicle availability, agreed upon the final itinerary and quotation with you, and formally dispatched vehicle registration and driver contact details.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-navy-950 flex items-center gap-2">
              <Car className="w-5 h-5 text-brand-600" />
              <span>2. Vehicle Availability and Fleet Allocation</span>
            </h3>
            <p>
              Vehicle models and categories displayed on the website (e.g. Sedan, SUV, Tempo Traveller) serve as indicative commercial categories. Subham Travelers reserves the right to provide an equivalent or upgraded vehicle category in the event of unforeseen mechanical maintenance or vehicle unavailability.
            </p>
            <p>
              All vehicles assigned for outstation and intercity travel carry authorized yellow-plate commercial permits, state fitness certificates, and active third-party passenger insurance in accordance with the Motor Vehicles Act, 1988.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-navy-950 flex items-center gap-2">
              <Scale className="w-5 h-5 text-brand-600" />
              <span>3. Fares, Quotations, and Payment Structure</span>
            </h3>
            <p>
              <strong>Direct Operator Quotation:</strong> The website deliberately does not calculate automated instant prices or process online gateway payments. All trip quotations and final fares are agreed upon directly between the customer and our reservation coordinator before travel commences.
            </p>
            <p>
              Unless explicitly communicated in an all-inclusive package quote, actual highway FASTag toll taxes, state tourist entry permits, municipal parking fees, and driver night allowances are settled based on actual transit receipts.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-navy-950 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-600" />
              <span>4. Estimated Highway Distances and Travel Durations</span>
            </h3>
            <p>
              Highway road distances (in kilometres) and travel durations (in hours/minutes) calculated on the website or shared by our team are approximations derived from routing services (OSRM) and typical driving conditions.
            </p>
            <p>
              Actual transit times may vary depending on real-time highway congestion, monsoonal weather, ghat section gradients, temple festival traffic (such as Puri Rath Yatra), or unannounced road diversions.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-navy-950 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-600" />
              <span>5. Accurate Customer Travel Information</span>
            </h3>
            <p>
              Customers are responsible for providing complete and accurate travel specifications, including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-navy-800">
              <li>Exact pickup address, hotel name, railway coach/platform, or flight flight number.</li>
              <li>Accurate passenger headcount, ensuring passenger count does not exceed the legal seating capacity of the booked vehicle.</li>
              <li>Approximate luggage volume, ensuring baggage safely fits inside the dedicated luggage boot or roof carrier.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-navy-950 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-brand-600" />
                <span>6. Changes, Cancellations, and Delays</span>
              </h3>
              <Badge variant="amber" size="sm" className="text-[10px]">
                Policy Pending Owner Approval
              </Badge>
            </div>
            <p>
              If your travel plans change or you require a schedule modification, please notify our reservation desk promptly:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-navy-800">
              <li>
                <strong>Notice Window:</strong> Outstation trip modifications or cancellations should be requested at least 4 to 6 hours prior to the scheduled departure to prevent inconvenience to assigned chauffeurs.
              </li>
              <li>
                <strong>Force Majeure:</strong> Subham Travelers is not liable for service interruptions caused by cyclones, extreme monsoon flooding, national highway blockades, or civic strikes beyond operational control. In such events, our team coordinates alternative routing or safe postponement.
              </li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-navy-950 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-brand-600" />
              <span>7. Passenger Conduct and Cabin Hygiene</span>
            </h3>
            <p>
              To maintain high travel standards and ensure driver safety, all passengers agree to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-navy-800">
              <li>Refrain from smoking, consuming alcohol, or possessing banned substances inside commercial cabs under Odisha Motor Vehicles rules.</li>
              <li>Treat chauffeurs with courtesy and dignity throughout the journey.</li>
              <li>Take personal responsibility for personal belongings, valuables, and temple pilgrimage offerings. Subham Travelers will assist in locating misplaced items but accepts no legal liability for lost property.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="space-y-2 pt-2 border-t border-navy-100">
            <h3 className="text-base sm:text-lg font-bold text-navy-950">
              8. Governing Law and Jurisdiction
            </h3>
            <p>
              These Terms and Conditions and any disputes arising from transportation services coordinated by Subham Travelers shall be governed by and construed in accordance with the laws of the Republic of India and subject to the exclusive jurisdiction of the competent courts in <strong>Bhubaneswar, Odisha</strong>.
            </p>
          </section>
        </Card>
      </div>
    </div>
  );
}
