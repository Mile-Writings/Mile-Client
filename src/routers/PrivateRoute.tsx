import { Navigate, Outlet, useLocation } from 'react-router-dom';

import checkAuthenticate from '../utils/checkAuthenticate';

const PrivateRoute = () => {
  const pathname = useLocation();
  if (!checkAuthenticate()) {
    alert('로그인 후 이용이 가능합니다.');
  }
  return checkAuthenticate() ? <Outlet /> : <Navigate to="/login" state={pathname} />;
};
export default PrivateRoute;
