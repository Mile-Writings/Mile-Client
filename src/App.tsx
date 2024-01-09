import {
  EditorHeader,
  EditorHeaderTemp,
  GroupFeedHeader,
  LogOutHeader,
} from './components/commons/Header';
import Router from './Router';

const App = () => {
  return (
    <>
      <Router />
      <GroupFeedHeader />
      <LogOutHeader />
      <EditorHeaderTemp />
      <EditorHeader />
    </>
  );
};

export default App;
