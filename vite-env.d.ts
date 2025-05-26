interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_GOOGLE_ANALYTICS_ID: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
