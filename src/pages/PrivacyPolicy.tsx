import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { brandConfig } from '@/data/brandConfig';
import { ShieldCheck, AlertCircle, Lock, Mail, Server, Smartphone, Users } from 'lucide-react';

export function PrivacyPolicy() {
  useDocumentTitle(
    'Privacy Policy',
    'Privacy Policy and data practices for Subham Travelers cab booking and travel enquiry services in Odisha.'
  );

  return (
    <div className="bg-sand-50/40 min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

        {/* Page Hero Header */}
        <SectionHeading
          eyebrow="Legal & Data Governance"
          title="Privacy Policy"
          subtitle={`Draft Notice • Last reviewed: October 2026. How ${brandConfig.brandName} handles your personal details and journey enquiries.`}
        />

        {/* Draft Notice Warning */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-amber-900">
              Draft Operational Privacy Document:
            </p>
            <p className="text-amber-800 leading-relaxed">
              This document is a draft operational privacy policy prepared for Subham Travelers' cab enquiry and tourism coordination platform. It is subject to formal legal review and operational adoption by business management.
            </p>
          </div>
        </div>

        <Card className="p-6 sm:p-10 bg-white border-navy-100/90 shadow-sm space-y-8 text-sm text-navy-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-navy-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              <span>1. Overview and Scope</span>
            </h3>
            <p>
              <strong>{brandConfig.brandName}</strong> operates as an independent cab booking, intercity transportation, and travel enquiry service headquartered in {brandConfig.headquarters}, serving customers throughout the State of Odisha, India.
            </p>
            <p>
              This Privacy Policy explains what personal information is collected when you browse our website, request route previews, submit booking enquiries, initiate phone or WhatsApp communications, or provide customer feedback.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-navy-950 flex items-center gap-2">
              <Lock className="w-5 h-5 text-brand-600" />
              <span>2. Information You Voluntarily Provide</span>
            </h3>
            <p>
              When you interact with our service to enquire about cab availability or tour itineraries, you may voluntarily provide:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-navy-800">
              <li><strong>Contact Information:</strong> Full name, telephone number, and optional email address.</li>
              <li><strong>Itinerary Details:</strong> Pickup address or landmark, destination, travel dates, pickup times, and return dates.</li>
              <li><strong>Travel Preferences:</strong> Vehicle category preference (e.g. Sedan, SUV, Tempo Traveller), passenger count, and luggage specifications.</li>
              <li><strong>Customer Feedback:</strong> Voluntary ratings, route notes, and written opinions submitted via our feedback form.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-navy-950 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-brand-600" />
              <span>3. How Phone and WhatsApp Enquiries Operate</span>
            </h3>
            <p>
              Our website provides click-to-call and click-to-chat links to facilitate direct communication between travelers and our reservation desk:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-navy-800">
              <li>
                <strong>WhatsApp Messaging:</strong> When you click &ldquo;Enquire on WhatsApp,&rdquo; pre-formatted text containing your travel details is passed directly into your device&rsquo;s WhatsApp client. Your message is transmitted via WhatsApp LLC&rsquo;s encrypted network under WhatsApp&rsquo;s own Terms of Service and Privacy Policy.
              </li>
              <li>
                <strong>Direct Telephony:</strong> Calls initiated to our direct support line are routed over standard Indian telecommunications carrier networks.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-navy-950 flex items-center gap-2">
              <Server className="w-5 h-5 text-brand-600" />
              <span>4. Third-Party Mapping and Infrastructure Services</span>
            </h3>
            <p>
              To provide address suggestions, interactive map previews, and driving route estimates without incurring proprietary map fees, our website interfaces with free and open-source infrastructure:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-navy-800">
              <li>
                <strong>OpenStreetMap (OSM):</strong> Interactive map tiles are delivered directly from OpenStreetMap Foundation servers when you explicitly request a map preview. Your browser requests standard tile graphics, transmitting standard HTTP headers and IP addresses to OSM tile servers.
              </li>
              <li>
                <strong>Photon Geocoding (Komoot):</strong> Location search queries are transmitted to the Photon API to suggest relevant Odisha landmarks and towns. Requests are debounced and only sent after user typing begins.
              </li>
              <li>
                <strong>Open Source Routing Machine (OSRM):</strong> Highway route calculations and polyline geometries are fetched on-demand from public OSRM-compatible routing endpoints.
              </li>
              <li>
                <strong>Form Forwarding Services (FormSubmit):</strong> Customer feedback forms may use secure form forwarding to deliver submissions to our business email without hosting a custom database.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-navy-950 flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-600" />
              <span>5. How Enquiry Data Is Shared and Used</span>
            </h3>
            <p>
              We treat travel information with strict operational confidentiality:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-navy-800">
              <li>Information is used exclusively to prepare quotations, verify cab availability, and schedule dispatch.</li>
              <li>When a booking is confirmed, necessary pickup information and passenger contact details are shared strictly with the assigned commercial chauffeur to coordinate on-time pickup.</li>
              <li><strong>Zero Commercial Data Selling:</strong> We do not sell, rent, monetize, or disclose your contact details to third-party telemarketers or advertisers.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-navy-950">
              6. Data Retention and Security
            </h3>
            <p>
              Enquiry messages and communications are retained only for the duration necessary to coordinate your travel, maintain tax and accounting records, and resolve any customer service inquiries. We implement reasonable physical, technical, and operational safeguards to protect your personal details against unauthorized access.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-2 pt-2 border-t border-navy-100">
            <h3 className="text-base sm:text-lg font-bold text-navy-950 flex items-center gap-2">
              <Mail className="w-5 h-5 text-brand-600" />
              <span>7. Privacy Inquiries and Contact Information</span>
            </h3>
            <p>
              If you have questions regarding this Privacy Policy, wish to update your contact details, or request deletion of past communication records, please contact our administrative desk:
            </p>
            <div className="p-4 rounded-xl bg-sand-50 border border-navy-100 space-y-1 text-xs text-navy-800">
              <p><strong>Subham Travelers — Privacy Administration</strong></p>
              <p>Email: <a href={`mailto:${brandConfig.contact.email}`} className="text-brand-700 underline font-medium">{brandConfig.contact.email}</a></p>
              <p>Telephone: {brandConfig.contact.phoneDisplay}</p>
              <p>Address: {brandConfig.contact.addressLine1}, {brandConfig.contact.addressLine2}, {brandConfig.contact.city}, {brandConfig.contact.state} - {brandConfig.contact.pinCode}</p>
            </div>
          </section>
        </Card>
      </div>
    </div>
  );
}
