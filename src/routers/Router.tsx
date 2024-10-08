import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

import RedirectLogin from '../pages/login/RedirectLogin';

import Layout from '../components/commons/Layout';
import PrivateRoute from './PrivateRoute';

const Main = lazy(() => import('../pages/main/Main'));
const PostDetail = lazy(() => import('../pages/postDetail/PostDetail'));
const GroupInvite = lazy(() => import('../pages/groupInvite/GroupInvite'));
const CreateGroup = lazy(() => import('../pages/createGroup/CreateGroup'));
const PostPage = lazy(() => import('../pages/postPage/PostPage'));
const GroupJoinCongrats = lazy(() => import('../pages/groupJoinCongrats/GroupJoinCongrats'));
const CreateGroupSuccess = lazy(() => import('../pages/createGroupSuccess/CreateGroupSuccess'));
const GroupFeed = lazy(() => import('../pages/groupFeed/GroupFeed'));
const Admin = lazy(() => import('../pages/admin/Admin'));
const Error = lazy(() => import('../pages/error/Error'));
const Login = lazy(() => import('../pages/login/Login'));

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
