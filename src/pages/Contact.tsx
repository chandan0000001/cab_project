import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { brandConfig } from '@/data/brandConfig';
import {
  isPhoneConfigured,
  isWhatsAppConfigured,
  getPhoneUrl,
  getWhatsAppUrl,
  sanitizeUserText,
} from '@/lib/contactUtils';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';

export function Contact() {
  useDocumentTitle(
    'Contact Us',
    'Get in touch with Subham Travelers for cab bookings, tourist itineraries, and highway travel enquiries across Odisha.'
  );

  const phoneReady = isPhoneConfigured();
  const whatsappReady = isWhatsAppConfigured();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    tripType: 'one-way',
    pickup: '',
    drop: '',
    travelDate: '',
    message: '',
  });

  const cleanName = sanitizeUserText(formData.name, 80);
  const cleanPhone = sanitizeUserText(formData.phone, 25);
  const cleanEmail = sanitizeUserText(formData.email, 80);
  const cleanPickup = sanitizeUserText(formData.pickup, 120);
  const cleanDrop = sanitizeUserText(formData.drop, 120);
  const cleanDate = sanitizeUserText(formData.travelDate, 30);
  const cleanNotes = sanitizeUserText(formData.message, 500);

  const generatedEnquiryText = [
    `Hello ${brandConfig.brandName}, I would like to submit a travel enquiry:`,
    '',
    `• Name: ${cleanName || 'Not provided'}`,
    `• Phone: ${cleanPhone || 'Not provided'}`,
    cleanEmail ? `• Email: ${cleanEmail}` : null,
    `• Trip Type: ${formData.tripType.toUpperCase()}`,
    `• Pickup Location: ${cleanPickup}`,
    `• Destination: ${cleanDrop}`,
    cleanDate ? `• Travel Date: ${cleanDate}` : null,
    cleanNotes ? `• Additional Notes: ${cleanNotes}` : null,
    '',
    'Please confirm vehicle availability and quotation.',
    'Thank you.',
  ]
    .filter(Boolean)
    .join('\n');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (whatsappReady) {
      window.open(getWhatsAppUrl(generatedEnquiryText), '_blank', 'noopener,noreferrer');
    }
    setFormSubmitted(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEnquiryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-sand-50/40 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Contact Us' }]} />

        {/* Page Hero Header */}
        <SectionHeading
          eyebrow="Direct Assistance"
          title="Contact & Cab Enquiry Desk"
          subtitle="Have a question about intercity travel, pilgrimage packages, or vehicle availability? Reach our booking coordinator directly via phone, WhatsApp, or through the enquiry form below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards & Business Info */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 bg-white space-y-6 border-navy-100/90 shadow-sm">
              <div className="border-b border-navy-100 pb-3">
                <h3 className="font-bold text-lg text-navy-950">Direct Contact Coordinates</h3>
                <p className="text-xs text-navy-600 mt-0.5">
                  Official dispatch communication channels for Subham Travelers.
                </p>
              </div>

              <div className="space-y-4 text-sm text-navy-700">
                {/* Telephone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-navy-500 font-semibold uppercase tracking-wider">
                        Telephone Enquiries
                      </p>
                      {!phoneReady && (
                        <Badge variant="amber" size="sm" className="text-[10px]">
                          Pending Config
                        </Badge>
                      )}
                    </div>
                    {phoneReady ? (
                      <a
                        href={getPhoneUrl()}
                        className="font-bold text-navy-900 hover:text-brand-600 transition-colors text-base block mt-0.5"
                      >
                        {brandConfig.contact.phoneDisplay}
                      </a>
                    ) : (
                      <p className="font-semibold text-navy-700 text-sm mt-0.5">
                        {brandConfig.contact.phoneDisplay}
                        <span className="block text-[11px] text-navy-500 font-normal">
                          (Direct voice line pending owner phone number setup)
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-navy-500 font-semibold uppercase tracking-wider">
                        Instant WhatsApp Desk
                      </p>
                      {!whatsappReady && (
                        <Badge variant="amber" size="sm" className="text-[10px]">
                          Pending Config
                        </Badge>
                      )}
                    </div>
                    {whatsappReady ? (
                      <a
                        href={getWhatsAppUrl('Hello Subham Travelers, I have a travel query.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-navy-900 hover:text-[#25D366] transition-colors text-base block mt-0.5"
                      >
                        +{brandConfig.contact.whatsappRaw}
                      </a>
                    ) : (
                      <p className="font-semibold text-navy-700 text-sm mt-0.5">
                        +{brandConfig.contact.whatsappRaw}
                        <span className="block text-[11px] text-navy-500 font-normal">
                          (WhatsApp number pending business owner verification)
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-navy-500 font-semibold uppercase tracking-wider">
                      Email Inquiries
                    </p>
                    <a
                      href={`mailto:${brandConfig.contact.email}`}
                      className="font-medium text-navy-900 hover:text-brand-600 transition-colors text-sm block mt-0.5"
                    >
                      {brandConfig.contact.email}
                    </a>
                  </div>
                </div>

                {/* Office Location & OpenStreetMap link */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-navy-500 font-semibold uppercase tracking-wider">
                      Registered Address
                    </p>
                    <address className="not-italic text-xs text-navy-700 leading-relaxed mt-0.5">
                      {brandConfig.contact.addressLine1}, {brandConfig.contact.addressLine2},<br />
                      {brandConfig.contact.city}, {brandConfig.contact.state} - {brandConfig.contact.pinCode}
                    </address>
                    <a
                      href="https://www.openstreetmap.org/search?query=Berhampur%2C%20Odisha"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-brand-700 font-semibold hover:underline mt-1.5"
                    >
                      <span>View Area on OpenStreetMap</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-navy-500 font-semibold uppercase tracking-wider">
                      Operating Hours
                    </p>
                    <p className="text-xs text-navy-700 mt-0.5">{brandConfig.contact.officeHours}</p>
                    <p className="text-[11px] text-navy-500 mt-0.5">
                      Highway emergency and advance booking assistance available 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Travel Note */}
            <div className="p-4 rounded-xl bg-sand-100 border border-navy-200/70 text-xs text-navy-700 space-y-1.5">
              <p className="font-bold text-navy-900 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-brand-600" />
                <span>Urgent Airport & Station Pickups:</span>
              </p>
              <p className="leading-relaxed">
                For journeys starting within 2 hours, we recommend calling our reservation desk directly to expedite vehicle assignment and driver contact sharing.
              </p>
            </div>
          </div>

          {/* Right Column: Travel Enquiry Form */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8 bg-white border-navy-100/90 shadow-sm">
              <h3 className="font-bold text-xl text-navy-950 mb-1">
                Send an Intercity Travel Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-navy-600 mb-6">
                Fill in your trip requirements below. We will coordinate cab options, vehicle availability, and exact quotation directly with you.
              </p>

              {formSubmitted ? (
                <div className="text-center py-8 space-y-4 animate-in fade-in duration-200">
                  <div className="w-14 h-14 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-xl text-navy-900">Enquiry Ready!</h4>
                  <p className="text-xs sm:text-sm text-navy-600 max-w-md mx-auto leading-relaxed">
                    {whatsappReady
                      ? 'WhatsApp was opened with your trip details. If it did not open automatically, you can copy the summary below or reach us via phone.'
                      : 'Your enquiry summary has been generated below. You can copy the message and send it to our team via phone or email.'}
                  </p>

                  {/* Summary Box */}
                  <div className="p-4 bg-sand-50 rounded-xl border border-navy-200/80 text-left text-xs font-mono text-navy-800 whitespace-pre-wrap max-w-lg mx-auto">
                    {generatedEnquiryText}
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleCopy}
                      leftIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    >
                      {copied ? 'Copied to Clipboard' : 'Copy Enquiry Text'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFormSubmitted(false)}
                    >
                      Edit Travel Details
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Full Name"
                      required
                      placeholder="e.g. Ramesh Mohanty"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Input
                      label="Contact Telephone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Email Address (Optional)"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <Select
                      label="Trip Format"
                      value={formData.tripType}
                      onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                      options={[
                        { value: 'one-way', label: 'One-Way Outstation Drop' },
                        { value: 'round-trip', label: 'Round-Trip Highway Tour' },
                        { value: 'local-rental', label: 'Local Hourly City Rental' },
                        { value: 'odisha-tour', label: 'Custom Odisha Pilgrimage Circuit' },
                      ]}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Pickup Location"
                      required
                      placeholder="e.g. Berhampur / BAM Railway Stn / MKCG Hospital"
                      value={formData.pickup}
                      onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                    />
                    <Input
                      label="Destination"
                      required
                      placeholder="e.g. Bhubaneswar Airport / Puri / Gopalpur"
                      value={formData.drop}
                      onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
                    />
                  </div>

                  <Input
                    label="Intended Travel Date"
                    type="date"
                    value={formData.travelDate}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                  />

                  <Textarea
                    label="Special Requests / Passenger Count / Luggage Note"
                    placeholder="Mention passenger count, luggage bags, or preferred vehicle category (e.g. Sedan, Ertiga, Innova)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                  />

                  <div className="p-3 rounded-lg bg-sand-50 border border-navy-100 text-xs text-navy-600">
                    <p className="leading-relaxed">
                      <strong>Truth in Advertising Notice:</strong> Submitting this enquiry does not commit you to payment or confirm a booking. Our reservation coordinator will contact you to verify schedule, vehicle category, and quotation.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      className="w-full sm:w-auto"
                      rightIcon={<Send className="w-4 h-4" />}
                    >
                      Submit Travel Enquiry
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
