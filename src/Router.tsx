import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ScrollToTop from './components/commons/ScrollToTop';
import Admin from './pages/admin/Admin';
import CreateGroup from './pages/createGroup/CreateGroup';
import CreateGroupSuccess from './pages/createGroupSuccess/CreateGroupSuccess';
import Error from './pages/error/Error';
import GroupFeed from './pages/groupFeed/GroupFeed';
import GroupInvite from './pages/groupInvite/GroupInvite';
import GroupJoinCongrats from './pages/groupJoinCongrats/GroupJoinCongrats';
import Login from './pages/login/Login';
import RedirectLogin from './pages/login/RedirectLogin';
import Main from './pages/main/Main';
import PostDetail from './pages/postDetail/PostDetail';
import PostPage from './pages/postPage/PostPage';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <Main /> },
      { path: 'detail/:groupId/:postId', element: <PostDetail /> },
      { path: 'post/:groupId/:type', element: <PostPage /> },
      { path: 'createGroup', element: <CreateGroup /> },
      { path: 'login', element: <Login /> },
      { path: 'redirect-kakao', element: <RedirectLogin /> },
      { path: 'error', element: <Error /> },
      { path: '*', element: <Error /> },
      { path: 'admin/:groupId', element: <Admin /> },
    ],
  },
  {
    path: 'group/:groupId',
    element: <GroupFeed />,
    children: [
      { path: 'groupInvite', element: <GroupInvite /> },
      { path: 'groupJoin', element: <GroupJoinCongrats /> },
    ],
  },
  { path: 'group/success/:groupId', element: <CreateGroupSuccess /> },
]);

const Router = () => {
  return (
    <>
      <ScrollToTop />
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
