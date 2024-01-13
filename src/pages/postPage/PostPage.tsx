import styled from '@emotion/styled';

import DropDown from './components/DropDown';
import Editor from './components/Editor';
import Spacing from '../../components/commons/Spacing';

const PostPage = () => {
  return (
    <PostPageWrapper>
      <Spacing marginBottom="3.4" />
      <DropDown />
      <Spacing marginBottom="2.4" />
      <Editor />
    </PostPageWrapper>
  );
};

export default PostPage;

const PostPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
