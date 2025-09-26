/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_FRONTEND_URL: string;
  readonly MODE: 'development' | 'production' | 'test';
  // add more environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
