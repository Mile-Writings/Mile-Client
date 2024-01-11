import styled from '@emotion/styled';

import Editor from './components/Editor';

const PostPage = () => {
  return (
    <PostPageWrapper>
      <Editor />
    </PostPageWrapper>
  );
};

export default PostPage;

const PostPageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
