import { BrowserRouter, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Layout from '@/layout';
import AppRoutes from '@/route';
import ReactGA from 'react-ga4';
function App() {
  const location = useLocation();
  const [gaInitialized, setGaInitialized] = useState(false);

  useEffect(() => {
    ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID);
    setGaInitialized(true);
  }, []);

  useEffect(() => {
    if (!gaInitialized) return;
    ReactGA.set({ page: location.pathname });
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [gaInitialized, location]);

  return (
    <React.StrictMode>
      <Layout>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Layout>
    </React.StrictMode>
  );
}

export default App;
