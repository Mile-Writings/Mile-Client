import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import DropDown from './components/DropDown';
import Editor from './components/Editor';
import GetTempSaveModal from './components/GetTempSaveModal';
import ImageUpload from './components/ImageUpload';
import { useTempSaveFlag } from './hooks/queries';

import {
  EditorEditHeader, // 수정하기 -> 헤더
  EditorTempNotExistHeader, // 임시저장 글 없음 -> 헤더
  EditorTempExistHeader, // 임시저장 글 있음 -> 헤더
} from '../../components/commons/Header';
import Spacing from '../../components/commons/Spacing';

const PostPage = () => {
  const navigate = useNavigate();
  // 에디터 제목, 내용 저장 함수
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 모임 ID url에서 받아오기
  const { groupId } = useParams();

  // 임시저장 값 여부 확인
  const { isTemporaryPostExist, postId, isLoading, isError, error } = useTempSaveFlag(
    groupId || '',
  );
  const [saveTempModalOpen, setSaveTempModalOpen] = useState(false);

  // console.log(groupId);
  // console.log(isTemporaryPostExist);
  // console.log(postId);

  // 임시 저장 모달 닫힘여부
  const onClickModalHandler = () => {
    setSaveTempModalOpen(!saveTempModalOpen);
  };

  // 최초 저장
  const saveHandler = () => {
    navigate('./');

    alert('제출이 완료되었습니다.');
  };

  // 임시 저장 글 -> 저장하기
  const tempExistSaveHandler = () => {};

  // 임시 저장
  const tempSaveHandler = () => {
    alert('홈으로 가기');
  };

  useEffect(() => {
    if (isTemporaryPostExist) {
      setSaveTempModalOpen(isTemporaryPostExist);
    }
  }, [isTemporaryPostExist]);

  return (
    <PostPageWrapper>
      {isTemporaryPostExist ? (
        <EditorTempExistHeader onClickSubmit={tempExistSaveHandler} />
      ) : (
        <EditorTempNotExistHeader onClickTempSave={tempSaveHandler} onClickSubmit={saveHandler} />
      )}
      {saveTempModalOpen && (
        <ModalBackdrop>
          <GetTempSaveModal onClickTempModal={setSaveTempModalOpen}></GetTempSaveModal>
        </ModalBackdrop>
      )}

      <ImageUpload />
      <DropDownEditorWrapper>
        <DropDown />
        <Spacing marginBottom="2.4" />
        <Editor saveTitle={setTitle} saveContent={setContent} />
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

export const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 5; //위치지정 요소
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
