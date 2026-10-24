/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PHOTON_API_URL?: string;
  readonly VITE_OSRM_API_URL?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_SUPPORT_PHONE?: string;
  readonly VITE_SUPPORT_EMAIL?: string;
  readonly VITE_FORMSUBMIT_EMAIL?: string;
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
