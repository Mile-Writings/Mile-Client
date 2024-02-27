import { Outlet } from 'react-router-dom';

import { GroupFeedHeader, LogOutHeader } from './components/commons/Header';

const HeaderContainer = () => {
  const accessToken = localStorage.getItem('accessToken');
  return (
    <div>
      {accessToken ? <GroupFeedHeader /> : <LogOutHeader />}
      <Outlet />
    </div>
  );
};

export default HeaderContainer;
