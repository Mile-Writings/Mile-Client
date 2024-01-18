import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Error from './pages/Error/Error';
import GroupFeed from './pages/groupFeed/GroupFeed';
import Login from './pages/login/Login';
import RedirectLogin from './pages/login/RedirectLogin';
import Main from './pages/main/Main';
import PostDetail from './pages/postDetail/PostDetail';
import PostEditor from './pages/postEditor/PostEditor';
import PostPage from './pages/postPage/PostPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/group/:groupId" element={<GroupFeed />} />
        <Route path="/detail/:groupId/:postId" element={<PostDetail />} />
        <Route path="/post/:groupId" element={<PostPage />} />
        <Route path="/edit/:groupId" element={<PostEditor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/redirect-kakao" element={<RedirectLogin />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
