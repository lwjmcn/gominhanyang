// Google Analytics tracking code
declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

export const pageView = (url: URL) => {
  window.gtag('config', import.meta.env.VITE_GOOGLE_ANALYTICS_ID, {
    page_path: url,
  });
};
