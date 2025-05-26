import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
const RouteGA = () => {
  const location = useLocation();
  const [gaInitialized, setGaInitialized] = useState(false);

  useEffect(() => {
    ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID);
    setGaInitialized(true);
  }, []);

  useEffect(() => {
    if (!gaInitialized) return;
    ReactGA.set({ page: location.pathname });
    ReactGA.send('pageview');
  }, [gaInitialized, location]);
};
export default RouteGA;
