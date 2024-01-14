import styled from '@emotion/styled';

import Editor from './components/Editor';

import {
  EditorEditHeader, // 수정하기 -> 헤더
  EditorTempNotExistHeader, // 임시저장 글 없음 -> 헤더
  EditorTempExistHeader, // 임시저장 글 있음 -> 헤더
} from '../../components/commons/Header';

const PostPage = () => {
  const tempSaveExist = false;

  const tempExistSaveHandler = () => {};

  const saveHandler = () => {};
  const tempSaveHandler = () => {};

  return (
    <PostPageWrapper>
      {tempSaveExist ? (
        <EditorTempExistHeader onClickSubmit={tempExistSaveHandler} />
      ) : (
        <EditorTempNotExistHeader onClickTempSave={tempSaveHandler} onClickSubmit={saveHandler} />
      )}
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
