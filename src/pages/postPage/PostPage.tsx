import styled from '@emotion/styled';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import DropDown from './components/DropDown';
import Editor from './components/Editor';
import ImageUpload from './components/ImageUpload';
import { usePostContent } from './hooks/queries';

import {
  EditorEditHeader, // 수정하기 -> 헤더
  EditorTempNotExistHeader, // 임시저장 글 없음 -> 헤더
  EditorTempExistHeader, // 임시저장 글 있음 -> 헤더
} from '../../components/commons/Header';
import Spacing from '../../components/commons/Spacing';

const PostPage = () => {
  const navigate = useNavigate();
  // 에디터 제목, 내용 저장 함수
  const [contentTitle, setContentTitle] = useState('');
  const [contentContent, setContentContent] = useState('');
  const [topicId, setTopicId] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  // console.log(title);
  // console.log(content);

  // 모임 ID url에서 받아오기
  const { groupId } = useParams();

  // 임시저장 값 여부 확인

  // 헤더 조건부 렌더링 (임시값)
  // 임시저장 값 있는지 확인 api
  const tempSaveExist = false;

  // 최초 저장

  const saveHandler = () => {
    const { postId, writerName } = usePostContent({
      groupId,
      topicId,
      contentTitle,
      contentContent,
      imageUrl,
      anonymous,
    });
  };

  // 임시 저장 글 -> 저장하기
  const tempExistSaveHandler = () => {};

  // 임시 저장
  const tempSaveHandler = () => {
    alert('홈으로 가기');
  };

  return (
    <PostPageWrapper>
      {tempSaveExist ? (
        <EditorTempExistHeader onClickSubmit={tempExistSaveHandler} />
      ) : (
        <EditorTempNotExistHeader onClickTempSave={tempSaveHandler} onClickSubmit={saveHandler} />
      )}
      <ImageUpload />
      {/* <Spacing marginBottom="3.4" /> */}
      <DropDownEditorWrapper>
        <DropDown />
        <Spacing marginBottom="2.4" />
        <Editor saveTitle={setContentTitle} saveContent={setContentContent} />
      </DropDownEditorWrapper>
      <Spacing marginBottom="8" />
    </PostPageWrapper>
  );
};

export default PostPage;

const PostPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const DropDownEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
