/**
 * Application environment configuration helper
 * Provides type-safe access to Vite environment variables with graceful fallback values.
 */

export const env = {
  /**
   * Photon Geocoding API endpoint (OpenStreetMap-based geocoding)
   * Default public endpoint: https://photon.komoot.io/api
   */
  photonApiUrl: import.meta.env.VITE_PHOTON_API_URL || 'https://photon.komoot.io/api',

  /**
   * OSRM Driving Routing API endpoint (OpenStreetMap-based routing)
   * Default public demo endpoint: https://router.project-osrm.org
   */
  osrmApiUrl: import.meta.env.VITE_OSRM_API_URL || 'https://router.project-osrm.org',

  /**
   * Official WhatsApp Support Number (+91 63712 58522)
   */
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '916371258522',

  /**
   * Direct Phone Support Number
   */
  supportPhone: import.meta.env.VITE_SUPPORT_PHONE || '+91 63712 58522',

  /**
   * Primary Contact Email Address (set via Vercel environment variables)
   */
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || '',

  /**
   * FormSubmit recipient email for customer feedback forwarding
   */
  formSubmitEmail: import.meta.env.VITE_FORMSUBMIT_EMAIL || '',

  /**
   * FormSubmit hashed endpoint token (obfuscates raw email address in Network tab)
   * FormSubmit provides this hash in the activation email.
   */
  formSubmitHash: import.meta.env.VITE_FORMSUBMIT_HASH || import.meta.env.VITE_FORMSUBMIT_TOKEN || '',

  /**
   * Base Site URL (Vercel Project: berhampur_cab)
   */
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://berhampurcab.vercel.app',
};

/**
 * Checks whether FormSubmit has been configured with an active recipient email or hashed token
 */
export function isFormSubmitConfigured(): boolean {
  const target = env.formSubmitHash || env.formSubmitEmail || env.supportEmail;
  return Boolean(target && (target.includes('@') || target.length >= 8) && !target.includes('placeholder'));
}

/**
 * Returns the active FormSubmit endpoint target (prefers hashed token to prevent raw email exposure)
 */
export function getFormSubmitTarget(): string {
  return env.formSubmitHash || env.formSubmitEmail || env.supportEmail;
}
