import { TestimonialItem } from '@/types';

/**
 * Notice: These cards serve strictly as preview layout formats for passenger feedback.
 * No fabricated ratings or unverified testimonials are represented as genuine business reviews.
 * Real passenger submissions will replace this demo format via the feedback portal.
 */
export const demoTestimonials: TestimonialItem[] = [
  {
    id: 'demo-1',
    clientName: 'Family Pilgrim Traveler',
    location: 'Berhampur to Puri',
    travelRoute: 'Round-trip Jagannath Dham Darshan from Berhampur',
    quote: 'Chauffeur arrived 10 minutes early at our Bada Bazaar pickup location in Berhampur. The sanitized Ertiga was comfortable for our senior family members.',
    date: 'Demo Review Format',
    isDemoSample: true,
  },
  {
    id: 'demo-2',
    clientName: 'Corporate Traveler',
    location: 'Berhampur to Bhubaneswar Airport',
    travelRoute: 'BBI Airport Highway Transfer via NH-16',
    quote: 'Departed from Berhampur at 4:30 AM on NH-16. Driver drove safely and arrived punctually at BBI Airport terminal with ample time before check-in.',
    date: 'Demo Review Format',
    isDemoSample: true,
  },
  {
    id: 'demo-3',
    clientName: 'Ganjam Tourism Group',
    location: 'Berhampur to Tara Tarini & Gopalpur',
    travelRoute: 'Ganjam Coastal & Shakti Peetha Day Tour',
    quote: 'Punctual pickup from Berhampur Railway Station. Chauffeur was knowledgeable about Tara Tarini temple timings and Gopalpur beach spots.',
    date: 'Demo Review Format',
    isDemoSample: true,
  },
];
