import styled from '@emotion/styled';

import Editor from './components/Editor';
import ImageUpload from './components/ImageUpload';

const PostPage = () => {
  return (
    <PostPageWrapper>
      <ImageUpload />
      <Editor />
    </PostPageWrapper>
  );
};

export default PostPage;

const PostPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;
