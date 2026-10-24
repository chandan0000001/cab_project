import { useState } from 'react';
import { Building2, Utensils, Hotel, ArrowRight, MessageSquare, X, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { brandConfig } from '@/data/brandConfig';

export function PartnershipBanner() {
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('Hotel / Resort');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      `Hello ${brandConfig.brandName}, I would like to explore a business partnership:`,
      `• Business Name: ${businessName}`,
      `• Category: ${businessType}`,
      `• Contact Person: ${contactPerson}`,
      `• Phone: ${contactPhone}`,
      `\nPlease connect with us regarding mutual travel coordination.`,
    ].join('\n');

    window.open(
      `https://wa.me/${brandConfig.contact.whatsappRaw}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
    setShowPartnerModal(false);
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white rounded-2xl p-8 sm:p-10 lg:p-12 border border-navy-800 shadow-elevated relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/60 border border-brand-500/40 text-brand-300 text-xs font-semibold">
                <Building2 className="w-3.5 h-3.5" />
                <span>Odisha Hospitality & Tourism Network</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Are You a Hotel, Resort, or Tourism Business in Odisha?
              </h2>

              <p className="text-sm sm:text-base text-navy-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Partner with Subham Travelers for seamless guest transfers, dedicated railway/airport arrivals, and customized tour packages for your visitors. Let’s elevate the travel experience together.
              </p>

              {/* Partnership Tags */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 text-xs text-sand-200">
                <span className="flex items-center gap-1.5 bg-navy-800/80 px-2.5 py-1 rounded border border-navy-700">
                  <Hotel className="w-3.5 h-3.5 text-brand-400" /> Hotel Guest Transfers
                </span>
                <span className="flex items-center gap-1.5 bg-navy-800/80 px-2.5 py-1 rounded border border-navy-700">
                  <Utensils className="w-3.5 h-3.5 text-brand-400" /> Highway Dining Recommendations
                </span>
                <span className="flex items-center gap-1.5 bg-navy-800/80 px-2.5 py-1 rounded border border-navy-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" /> Curated Heritage Packages
                </span>
              </div>
            </div>

            {/* Right Action */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowPartnerModal(true)}
                className="w-full sm:w-auto font-bold shadow-saffron"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Partner With Us
              </Button>
              <p className="text-[11px] text-navy-400 mt-2 text-center lg:text-right">
                Direct coordinator collaboration. No commissions or dashboard hassle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Enquiry Modal */}
      {showPartnerModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="partner-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-navy-100 relative">
            <button
              type="button"
              onClick={() => setShowPartnerModal(false)}
              className="absolute top-4 right-4 text-navy-400 hover:text-navy-900 p-1.5 rounded-lg hover:bg-navy-100"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 id="partner-modal-title" className="text-lg font-bold text-navy-950">
                  Business Partnership Enquiry
                </h3>
                <p className="text-xs text-navy-500">
                  Connect your hospitality establishment with {brandConfig.brandName}.
                </p>
              </div>
            </div>

            <form onSubmit={handlePartnerSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-navy-800 block mb-1">
                  Establishment / Business Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Blue Lagoon Resort, Puri"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full text-sm border border-navy-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-800 block mb-1">
                  Business Category
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full text-sm border border-navy-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-600 bg-white"
                >
                  <option value="Hotel / Resort">Hotel / Resort / Guest House</option>
                  <option value="Restaurant / Highway Dhaba">Restaurant / Highway Eatery</option>
                  <option value="Tour Operator / Travel Agent">Travel Agency / Tour Operator</option>
                  <option value="Destination Attraction">Tourist Attraction / Activity Provider</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-800 block mb-1">
                  Contact Person *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Your Name / Designation"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full text-sm border border-navy-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-800 block mb-1">
                  Contact Phone / WhatsApp *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full text-sm border border-navy-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="whatsapp"
                  size="md"
                  className="w-full font-bold"
                  leftIcon={<MessageSquare className="w-4 h-4" />}
                >
                  Submit Partnership Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
