import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Plus, Minus, MessageSquare } from 'lucide-react';
import { isWhatsAppConfigured, getWhatsAppUrl } from '@/lib/contactUtils';
import { sound } from '@/lib/sound';

interface FaqItem {
  id: string;
  category: 'general' | 'booking' | 'fleet' | 'tours';
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: 'f1',
    category: 'general',
    question: 'How do I book a cab with Subham Travelers?',
    answer:
      'Booking is direct and simple. Enter your pickup, destination, and travel date in our journey planner or click "Enquire on WhatsApp". Our reservation desk immediately reviews vehicle availability and responds with confirmed driver and vehicle options within 15 minutes.',
  },
  {
    id: 'f2',
    category: 'booking',
    question: 'Where do your cab services start from and what routes do you cover?',
    answer:
      'All our cab services are based in and start from Berhampur (Brahmapur, Ganjam), Odisha, connecting to everywhere across Odisha. We provide one-way drops (e.g. Berhampur to Bhubaneswar Airport, Puri, Cuttack, Konark, Koraput, Sambalpur), local Berhampur city transfers (MKCG Medical College & Hospital, BAM Railway Station, New/Old Bus Stand, Bada Bazaar), and multi-day round-trip tours with dedicated chauffeur assistance.',
  },
  {
    id: 'f3',
    category: 'booking',
    question: 'How are highway tolls, FASTag, and parking charges handled?',
    answer:
      'We believe in absolute transparency. Unless an all-inclusive package quotation is requested, highway FASTag toll taxes and airport/monument parking charges are billed at actuals based on government receipts. There are zero surprise convenience fees.',
  },
  {
    id: 'f4',
    category: 'fleet',
    question: 'What permits and commercial insurance cover your vehicles?',
    answer:
      'Every vehicle in our network is an authorized commercial tourist vehicle with a valid State Tourist Vehicle Permit, annual fitness inspection certificate, and comprehensive passenger insurance under the Motor Vehicles Act. Chauffeurs are vetted, verified, and known personally to dispatch.',
  },
  {
    id: 'f5',
    category: 'tours',
    question: 'Does Berhampur have an airport, and how do airport transfers work?',
    answer:
      'Berhampur does not have a commercial airport. For all flight travel, we provide dedicated round-the-clock highway transfers connecting Berhampur directly to Bhubaneswar Airport (Biju Patnaik International Airport) (~170 km along NH-16, taking approx. 3.5 hours). We provide doorstep pickup in Berhampur for flight departures, and monitor arrival schedules at Bhubaneswar Airport to welcome you at the arrivals gate.',
  },
  {
    id: 'f6',
    category: 'fleet',
    question: 'How many passengers and luggage bags fit in an Ertiga vs. Innova Crysta?',
    answer:
      'The Maruti Ertiga comfortably seats up to 5-6 passengers with space for 2-3 standard suitcases. For larger groups or extended family temple tours, the Toyota Innova Crysta seats 6-7 passengers with dedicated deep boot space for 4-5 large bags plus optional rooftop carrier racks.',
  },
  {
    id: 'f7',
    category: 'tours',
    question: 'Do you cover local Berhampur transit and nearby tourist spots?',
    answer:
      'Yes! We regularly provide local transit for Berhampur Railway Station (BAM), MKCG Medical College & Hospital patient appointments, and Silk Market shopping, as well as day tours to Gopalpur-on-Sea Beach (16 km), Maa Tara Tarini Shakti Peetha (30 km), Tampara Lake Water Resort (25 km), Taptapani Hot Water Spring (55 km), and Chilika Lake Rambha Bay (50 km).',
  },
  {
    id: 'f8',
    category: 'general',
    question: 'What languages do your chauffeurs speak?',
    answer:
      'All our chauffeurs are fluent in Odia and Hindi, with working knowledge of English to assist international visitors and pilgrims from across India.',
  },
];

export function FaqSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ f1: true, f2: true });
  const whatsappReady = isWhatsAppConfigured();

  const toggleFaq = (id: string) => {
    sound.playAccordion();
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs =
    selectedCategory === 'all'
      ? faqs
      : faqs.filter((item) => item.category === selectedCategory);

  return (
    <section className="bg-sand-100/60 py-16 sm:py-20 border-y border-navy-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <SectionHeading
            eyebrow="Got Questions?"
            title="Frequently Asked Travel Questions"
            subtitle="Everything you need to know about booking, airport transfers, vehicle permits, and highway travel across Odisha."
            align="center"
            className="mb-0"
          />
        </div>

        {/* Tab Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'booking', label: 'Booking & Dispatch' },
            { id: 'fleet', label: 'Fleet & Permits' },
            { id: 'tours', label: 'Airport & Tourism' },
          ].map((tab) => {
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  sound.playTab();
                  setSelectedCategory(tab.id);
                }}
                className={`px-4 py-2 min-h-[38px] rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-navy-950 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 border border-slate-200'
                }`}
                aria-pressed={isSelected}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 2-Column FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-start">
          {filteredFaqs.map((faq, index) => {
            const isOpen = Boolean(openIds[faq.id]);
            const numeral = String(index + 1).padStart(2, '0');

            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs transition-all duration-200 hover:border-blue-400"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-start justify-between gap-4 text-left cursor-pointer focus-visible:outline-none min-h-[44px]"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-black text-blue-600 pt-0.5">
                      {numeral}
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-3.5 pt-3 border-t border-slate-100 pl-7 text-xs sm:text-sm text-slate-600 leading-relaxed animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help Callout */}
        <div className="text-center pt-4">
          <p className="text-xs text-slate-600 inline-flex items-center gap-2">
            Have a unique question not listed above?{' '}
            {whatsappReady && (
              <a
                href={getWhatsAppUrl('Hello Subham Travelers, I have a question about your cab services.')}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-blue-600 hover:text-blue-700 underline inline-flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Ask Dispatch on WhatsApp
              </a>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
