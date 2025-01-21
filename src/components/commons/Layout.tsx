import { Outlet } from 'react-router-dom';
import RouteTracker from '../../routers/RouteTracker';
import ScrollToTop from './ScrollToTop';

const Layout = () => {
  return (
    <>
      <RouteTracker />
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default Layout;
