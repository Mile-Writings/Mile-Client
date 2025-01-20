import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

export const routeChangeTracker = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID);
    }

    setIsInitialized(true);
  }, []);

  // location 변경시 pageView 이벤트 전송
  useEffect(() => {
    if (isInitialized) {
      ReactGA.set({ page: location.pathname });
      ReactGA.send('pageView');
    }
  }, [isInitialized, location]);
};
