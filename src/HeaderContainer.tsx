import { useNavigate, Outlet } from 'react-router-dom';

import { GroupFeedHeader, LogOutHeader } from './pages/groupFeed/components/GroupFeedHeader';

const HeaderContainer = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  return (
    <div>
      {accessToken ? <GroupFeedHeader /> : <LogOutHeader onClick={() => navigate(`/login`)} />}
      <Outlet />
    </div>
  );
};

export default HeaderContainer;
