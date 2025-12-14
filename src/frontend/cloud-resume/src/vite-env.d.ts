/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: string;
  readonly VITE_TARGET_CHAIN_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
