import styled from '@emotion/styled';

import { useState, useReducer } from 'react';

import Editor from './components/Editor';

import {
  EditorEditHeader, // 수정하기 -> 헤더
  EditorTempNotExistHeader, // 임시저장 글 없음 -> 헤더
  EditorTempExistHeader, // 임시저장 글 있음 -> 헤더
} from '../../components/commons/Header';

const PostPage = () => {
  // 헤더 조건부 렌더링
  const tempSaveExist = false;

  // 임시 저장 글 -> 저장하기
  const tempExistSaveHandler = () => {};

  // 최초 저장
  const saveHandler = () => {};

  // 임시 저장
  const tempSaveHandler = () => {};

  // 에디터 제목, 내용 저장 함수
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  console.log(title);
  console.log(content);

  return (
    <PostPageWrapper>
      {tempSaveExist ? (
        <EditorTempExistHeader onClickSubmit={tempExistSaveHandler} />
      ) : (
        <EditorTempNotExistHeader onClickTempSave={tempSaveHandler} onClickSubmit={saveHandler} />
      )}
      <Editor saveTitle={setTitle} saveContent={setContent} />
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
