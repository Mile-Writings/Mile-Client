import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollTotop from '../components/commons/ScrollToTop';
import Loading from '../pages/loading/Loading';
import RedirectLogin from '../pages/login/RedirectLogin';

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

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollTotop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/group/:groupId" element={<GroupFeed />} />
          <Route path="/detail/:groupId/:postId" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/redirect-kakao" element={<RedirectLogin />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Error />} />
          <Route path="/group/:groupId/groupInvite" element={<GroupInvite />} />

          {/* 로그인 여부를 판단해 접근을 막는 Private Route */}
          <Route element={<PrivateRoute />}>
            <Route path="/post/:groupId/:type" element={<PostPage />} />
            <Route path="/group/success/:groupId" element={<CreateGroupSuccess />} />
            <Route path="/createGroup" element={<CreateGroup />} />
            <Route path="/group/:groupId/groupJoin" element={<GroupJoinCongrats />} />
            <Route path="/admin/:groupId" element={<Admin />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;

// import { lazy, Suspense } from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import ScrollTotop from '../components/commons/ScrollToTop';
// import RedirectLogin from '../pages/login/RedirectLogin';
// import Main from '../pages/main/Main';

// import PrivateRoute from './PrivateRoute';
// const PostDetail = lazy(() => import('../pages/postDetail/PostDetail'));
// const GroupInvite = lazy(() => import('../pages/groupInvite/GroupInvite'));
// const CreateGroup = lazy(() => import('../pages/createGroup/CreateGroup'));
// const PostPage = lazy(() => import('../pages/postPage/PostPage'));
// const GroupJoinCongrats = lazy(() => import('../pages/groupJoinCongrats/GroupJoinCongrats'));
// const CreateGroupSuccess = lazy(() => import('../pages/createGroupSuccess/CreateGroupSuccess'));
// const GroupFeed = lazy(() => import('../pages/groupFeed/GroupFeed'));
// const Admin = lazy(() => import('../pages/admin/Admin'));
// const Error = lazy(() => import('../pages/error/Error'));
// const Login = lazy(() => import('../pages/login/Login'));

// const Router = () => {
//   return (
//     <BrowserRouter>
//       <ScrollTotop />
//       <Suspense>
//         <Routes>
//           <Route path="/" element={<Main />} />
//           <Route path="/group/:groupId" element={<GroupFeed />} />
//           <Route
//             path="/detail/:groupId/:postId"
//             element={
//               <Suspense>
//                 <PostDetail />
//               </Suspense>
//             }
//           />
//           <Route
//             path="/login"
//             element={
//               <Suspense>
//                 <Login />
//               </Suspense>
//             }
//           />
//           <Route path="/redirect-kakao" element={<RedirectLogin />} />
//           <Route
//             path="/error"
//             element={
//               <Suspense>
//                 <Error />
//               </Suspense>
//             }
//           />
//           <Route path="*" element={<Error />} />
//           <Route
//             path="/group/:groupId/groupInvite"
//             element={
//               <Suspense>
//                 <GroupInvite />
//               </Suspense>
//             }
//           />

//           {/* 로그인 여부를 판단해 접근을 막는 Private Route */}
//           <Route element={<PrivateRoute />}>
//             <Route
//               path="/post/:groupId/:type"
//               element={
//                 <Suspense>
//                   <PostPage />
//                 </Suspense>
//               }
//             />
//             <Route
//               path="/group/success/:groupId"
//               element={
//                 <Suspense>
//                   <CreateGroupSuccess />
//                 </Suspense>
//               }
//             />
//             <Route
//               path="/createGroup"
//               element={
//                 <Suspense>
//                   <CreateGroup />
//                 </Suspense>
//               }
//             />
//             <Route
//               path="/group/:groupId/groupJoin"
//               element={
//                 <Suspense>
//                   <GroupJoinCongrats />
//                 </Suspense>
//               }
//             />
//             <Route
//               path="/admin/:groupId"
//               element={
//                 <Suspense>
//                   <Admin />
//                 </Suspense>
//               }
//             />
//           </Route>
//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//   );
// };

// export default Router;
