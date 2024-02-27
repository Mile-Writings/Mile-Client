import { Outlet } from 'react-router-dom';

import { GroupFeedHeader, LogOutHeader } from './pages/groupFeed/components/GroupFeedHeader';

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
