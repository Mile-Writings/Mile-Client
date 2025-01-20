import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

const RouteTracker = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID);
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      ReactGA.set({ page: location.pathname });
      ReactGA.send('page');
    }
  }, [isInitialized, location]);

  return null;
};

export default RouteTracker;
