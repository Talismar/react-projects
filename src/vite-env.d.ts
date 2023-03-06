/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_URL_BACK: string;
  readonly VITE_USERNAME: string;
  readonly VITE_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
