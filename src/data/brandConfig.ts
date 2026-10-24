import { BrandConfig } from '@/types';
import { env } from '@/lib/env';

export const brandConfig: BrandConfig = {
  brandName: 'Subham Travelers',
  tagline: 'Silk City’s Trusted Cab Service — Starting from Berhampur to Everywhere in Odisha',
  subTagline: 'Direct operator commercial cabs starting from Berhampur to Bhubaneswar Airport, Puri, Gopalpur Beach, Tara Tarini, Daringbadi, and all 30 districts.',
  legalEntityNotice: 'Subham Travelers is an independent commercial cab & travel enquiry service operating out of Berhampur (Ganjam), Odisha, India.',
  headquarters: 'Berhampur (Brahmapur), Ganjam District, Odisha',
  serviceArea: 'Starting from Berhampur (Railway Station, New Bus Stand, MKCG Medical) to Bhubaneswar Airport, Puri, and all destinations across Odisha & Andhra border',
  contact: {
    // These use the configurable environment values or standard placeholders
    phoneDisplay: env.supportPhone,
    phoneRaw: env.supportPhone.replace(/[^0-9+]/g, ''),
    whatsappRaw: env.whatsappNumber,
    email: env.supportEmail,
    officeHours: 'Mon - Sun: 24/7 Cab Enquiries Available',
    addressLine1: 'Near Berhampur Railway Station / MKCG Hospital Road',
    addressLine2: 'Silk City Commercial Transit Zone',
    city: 'Berhampur (Brahmapur)',
    state: 'Odisha',
    pinCode: '760001',
  },
  ceoProfile: {
    namePlaceholder: 'Leadership & Dispatch Team',
    titlePlaceholder: 'Founder / Managing Director [Berhampur Operations]',
    bioPlaceholder: 'Subham Travelers is steered by local transport operations professionals based in Berhampur (Ganjam), dedicated to dependable highway cab transit, punctual Bhubaneswar airport drops, and scenic South Odisha tourism.',
    messagePlaceholder: '"Our commitment is clear: provide every family, patient, pilgrim, and traveler originating from Berhampur with courteous, sanitized, and dependable highway cab travel with transparent pricing."',
    isVerified: false,
  },
  navigation: {
    main: [
      { label: 'Home', path: '/' },
      { label: 'Our Fleet', path: '/fleet' },
      { label: 'Destinations', path: '/destinations' },
      { label: 'Popular Routes', path: '/routes' },
      { label: 'About Us', path: '/about' },
      { label: 'Contact', path: '/contact' },
    ],
    footerServices: [
      { label: 'Bhubaneswar Airport (BBI) Drops', path: '/routes' },
      { label: 'Puri Jagannath Temple Cabs', path: '/routes' },
      { label: 'Gopalpur Beach & Tampara Lake', path: '/destinations' },
      { label: 'Tara Tarini Temple Tours', path: '/destinations' },
      { label: 'Taptapani, Khasada & Jirang Circuit', path: '/destinations' },
      { label: 'MKCG Hospital & BAM Station Drops', path: '/fleet' },
    ],
    footerDestinations: [
      { label: 'Gopalpur-on-Sea (16 km)', path: '/destinations' },
      { label: 'Maa Tara Tarini (30 km)', path: '/destinations' },
      { label: 'Tampara Lake (25 km)', path: '/destinations' },
      { label: 'Taptapani & Jirang (55 km)', path: '/destinations' },
      { label: 'Daringbadi Valley (120 km)', path: '/destinations' },
      { label: 'Puri Jagannath Dham (155 km)', path: '/destinations' },
    ],
    footerQuickLinks: [
      { label: 'About Our Fleet', path: '/fleet' },
      { label: 'Customer Feedback', path: '/feedback' },
      { label: 'Contact & Dispatch Desk', path: '/contact' },
      { label: 'Company Overview', path: '/about' },
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Terms & Conditions', path: '/terms' },
    ],
  },
};
