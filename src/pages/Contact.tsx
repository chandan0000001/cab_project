import { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { brandConfig } from '@/data/brandConfig';
import {
  isPhoneConfigured,
  isWhatsAppConfigured,
  getPhoneUrl,
  getWhatsAppUrl,
  sanitizeUserText,
} from '@/lib/contactUtils';
import { sound } from '@/lib/sound';
import {
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck
} from 'lucide-react';

export function Contact() {
  useDocumentTitle(
    'Contact Dispatch Desk | Subham Travelers Berhampur',
    'Get in touch with Subham Travelers for cab bookings, tourist itineraries, and highway travel enquiries across Odisha.'
  );

  const phoneReady = isPhoneConfigured();
  const whatsappReady = isWhatsAppConfigured();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    tripType: 'one-way',
    pickup: '',
    drop: '',
    travelDate: '',
    message: '',
  });

  const cleanName = sanitizeUserText(formData.name, 80);
  const cleanPhone = sanitizeUserText(formData.phone, 25);
  const cleanPickup = sanitizeUserText(formData.pickup, 120);
  const cleanDrop = sanitizeUserText(formData.drop, 120);
  const cleanDate = sanitizeUserText(formData.travelDate, 30);
  const cleanNotes = sanitizeUserText(formData.message, 500);

  const generatedEnquiryText = [
    `Hello ${brandConfig.brandName}, I would like to submit a travel enquiry:`,
    '',
    `• Name: ${cleanName || 'Not provided'}`,
    `• Phone: ${cleanPhone || 'Not provided'}`,
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
    sound.playPop();
    if (whatsappReady) {
      window.open(getWhatsAppUrl(generatedEnquiryText), '_blank', 'noopener,noreferrer');
    }
    setFormSubmitted(true);
  };

  const handleCopy = () => {
    sound.playTap();
    navigator.clipboard.writeText(generatedEnquiryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        <Breadcrumb items={[{ label: 'Contact Us' }]} />

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>24×7 Direct Dispatch Desk • Silk City, Berhampur</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 leading-[1.15]">
              Contact Our Berhampur <span className="text-blue-600">Operations & Dispatch Team</span>.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Need an instant fixed quotation, vehicle availability check, or emergency railway station transfer? Connect directly with our operations desk via call, WhatsApp, or instant enquiry.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              {phoneReady && (
                <a href={getPhoneUrl()} className="inline-flex">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto font-bold text-sm min-h-[48px] px-7 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                    leftIcon={<Phone className="w-4 h-4 text-white" />}
                  >
                    Call {brandConfig.contact.phoneDisplay}
                  </Button>
                </a>
              )}

              {whatsappReady && (
                <a
                  href={getWhatsAppUrl('Hello Subham Travelers, I want to book a cab from Berhampur.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <button
                    type="button"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1F6F3F] hover:bg-[#155A30] text-white px-7 py-3 min-h-[48px] rounded-full text-sm font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Dispatch Desk</span>
                  </button>
                </a>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-4 sm:gap-6 flex-wrap text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>5-Minute WhatsApp Response</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Station & MKCG Doorstep Pickup</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>24×7 Operational Coordination</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>No Booking Broker Markups</span>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="p-6 bg-white border border-slate-200/90 rounded-3xl shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                Direct Hotline
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">Telephone Dispatch</h3>
              <p className="text-xs text-slate-600 mt-1">
                24/7 line for urgent inquiries, late-night station pickups, and immediate allotments.
              </p>
            </div>
            {phoneReady && (
              <a href={getPhoneUrl()} className="inline-block pt-1">
                <span className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline">
                  {brandConfig.contact.phoneDisplay} →
                </span>
              </a>
            )}
          </Card>

          <Card className="p-6 bg-white border border-slate-200/90 rounded-3xl shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1F6F3F] flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                Instant Chat
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">WhatsApp Desk</h3>
              <p className="text-xs text-slate-600 mt-1">
                Fastest channel for itinerary advice, fixed quotations, and car photo verification.
              </p>
            </div>
            {whatsappReady && (
              <a
                href={getWhatsAppUrl('Hello Subham Travelers, I want to book a cab.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block pt-1"
              >
                <span className="text-sm font-bold text-[#1F6F3F] hover:underline">
                  Chat +{brandConfig.contact.whatsappRaw} →
                </span>
              </a>
            )}
          </Card>

          <Card className="p-6 bg-white border border-slate-200/90 rounded-3xl shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Physical Depot
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">Berhampur Office</h3>
              <p className="text-xs text-slate-600 mt-1">
                Station Road / MKCG Hospital Transit Zone, Berhampur (Silk City), Odisha - 760001.
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Berhampur+Railway+Station+Odisha"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline pt-1"
            >
              <span>View Location on Map</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Direct Dispatch Form
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Send an Intercity Travel Enquiry
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Fill in your trip requirements below. We will coordinate cab options, vehicle availability, and exact quotation directly with you.
              </p>
            </div>

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
                <Select
                  label="Trip Format"
                  value={formData.tripType}
                  onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                  options={[
                    { value: 'one-way', label: 'One-Way Outstation Drop' },
                    { value: 'round-trip', label: 'Round-Trip Tour / Darshan' },
                    { value: 'airport-transfer', label: 'Bhubaneswar Airport Transfer' },
                    { value: 'local-rental', label: 'Local Berhampur / Gopalpur Rental' },
                  ]}
                />
                <Input
                  label="Intended Travel Date"
                  type="date"
                  value={formData.travelDate}
                  onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Pickup Location"
                  required
                  placeholder="e.g. Berhampur / BAM Railway Stn / MKCG"
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

              <Textarea
                label="Special Requests / Passenger Count / Luggage Note"
                rows={3}
                placeholder="Mention passenger count, luggage bags, or preferred vehicle category (e.g. Sedan, Ertiga, Innova)..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white min-h-[46px] flex-1"
                  leftIcon={<Send className="w-4 h-4 text-white" />}
                >
                  Submit Travel Enquiry
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleCopy}
                  className="rounded-xl text-xs font-semibold border-slate-200 min-h-[46px]"
                  leftIcon={copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                >
                  {copied ? 'Copied to Clipboard' : 'Copy Enquiry'}
                </Button>
              </div>

              {formSubmitted && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Enquiry formatted! A dispatch coordinator will confirm cab availability shortly.</span>
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Operating Schedule
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                24×7 Operations & Dispatch
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our vehicles operate around the clock. Phone dispatch coordinators are active 24/7 for scheduled highway runs, airport catchups, and railway station arrivals.
              </p>

              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                  <span className="font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" /> Monday - Sunday
                  </span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    24 Hours Available
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                  <span className="font-semibold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600" /> Commercial Plates
                  </span>
                  <span className="font-bold text-slate-900">100% Yellow Plate</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" /> Doorstep Pickup
                  </span>
                  <span className="font-bold text-slate-900">All Silk City & Ganjam</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-blue-50 border border-blue-200 space-y-2">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                Urgent Station & Airport Transfers
              </span>
              <p className="text-xs text-blue-900 leading-relaxed">
                For journeys starting within 2 hours, we strongly recommend calling our direct hotline at{' '}
                <a href={getPhoneUrl()} className="font-bold underline">
                  {brandConfig.contact.phoneDisplay}
                </a>{' '}
                or sending a WhatsApp message to ensure immediate cab assignment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
