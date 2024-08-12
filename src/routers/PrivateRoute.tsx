import { Navigate, Outlet } from 'react-router-dom';

import checkAuthenticate from '../utils/checkAuthenticate';

const PrivateRoute = () => {
  if (!checkAuthenticate()) {
    alert('로그인 후 이용이 가능합니다.');
  }
  return checkAuthenticate() ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoute;
