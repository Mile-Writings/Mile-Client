import styled from '@emotion/styled';
import { useState } from 'react';

import Editor from '../postPage/components/Editor';

import { EditorEditHeader } from '../../components/commons/Header';

const PostEditor = () => {
  // 에디터 제목, 내용 저장 함수
  const [, setTitle] = useState('');
  const [, setContent] = useState('');

  // 수정하기 -> 저장하기
  const editSaveHandler = () => {};

  return (
    <PostPageWrapper>
      <EditorEditHeader onClickEditSave={editSaveHandler} />
      <Editor saveTitle={setTitle} saveContent={setContent} />
    </PostPageWrapper>
  );
};

export default PostEditor;

const PostPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;
