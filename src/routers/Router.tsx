import { createBrowserRouter } from 'react-router-dom';

import Admin from '../pages/admin/Admin';
import CreateGroup from '../pages/createGroup/CreateGroup';
import CreateGroupSuccess from '../pages/createGroupSuccess/CreateGroupSuccess';
import Error from '../pages/error/Error';
import GroupFeed from '../pages/groupFeed/GroupFeed';
import GroupInvite from '../pages/groupInvite/GroupInvite';
import GroupJoinCongrats from '../pages/groupJoinCongrats/GroupJoinCongrats';
import Login from '../pages/login/Login';
import RedirectLogin from '../pages/login/RedirectLogin';
import Main from '../pages/main/Main';
import PostDetail from '../pages/postDetail/PostDetail';
import PostPage from '../pages/postPage/PostPage';
import Layout from '../components/commons/Layout';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Main /> },
      { path: 'login', element: <Login /> },
      { path: 'redirect-kakao', element: <RedirectLogin /> },
      { path: 'detail/:groupId/:postId', element: <PostDetail /> },
      { path: 'error', element: <Error /> },
      { path: '*', element: <Error /> },

      // PrivateRoute 적용
      {
        element: <PrivateRoute />,
        children: [
          { path: 'admin/:groupId', element: <Admin /> },
          { path: 'post/:groupId/:type', element: <PostPage /> },
          { path: 'group/create', element: <CreateGroup /> },
          { path: 'group/success/:groupId', element: <CreateGroupSuccess /> },
          { path: 'group/:groupId/groupJoin', element: <GroupJoinCongrats /> },
        ],
      },
    ],
  },
  {
    path: 'group/:groupId',
    element: <Layout />,
    children: [
      { index: true, element: <GroupFeed /> },
      { path: 'groupInvite', element: <GroupInvite /> },
    ],
  },
]);

export default router;
