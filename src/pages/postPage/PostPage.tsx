/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import React, { useEffect, useState, useReducer } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Topics } from './apis/fetchEditorContent';
import DropDown from './components/DropDown';
import Editor from './components/Editor';
import ImageUpload from './components/ImageUpload';
import {
  useGetTempSaveContent,
  useGetTopic,
  usePostContent,
  usePostTempSaveContent,
  usePresignedUrl,
  usePutEditContent,
  usePutTempSaveContent,
  useTempSaveFlag,
} from './hooks/queries';

import {
  EditorEditHeader,
  EditorTempExistHeader,
  EditorTempNotExistHeader,
} from '../../components/commons/Header';
import Spacing from '../../components/commons/Spacing';

interface editorStateType {
  topic: string;
  writer: string;
  title: string;
  content: string;
  imageUrl: string;
}

interface Action {
  type: string;
  value: string;
}

// reducer 초기값
const editorState: editorStateType = {
  topic: '',
  writer: '',
  title: '',
  content: '',
  imageUrl:
    'https://mile-s3.s3.ap-northeast-2.amazonaws.com/post/KakaoTalk_Photo_2024-01-14-15-52-49.png',
};

// reducer 함수
const reducerFn = (state: editorStateType, action: Action): editorStateType => {
  switch (action.type) {
    case '':
      return {
        ...state,
      };
    default:
      return state;
  }
};

const PostPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 에디터 제목, 내용 저장 함수
  const [editorVal, dispatch] = useReducer(reducerFn, editorState);
  // dispatch 함수들
  const setTopic = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch({ type: 'setTopic', value: e.currentTarget.innerText });
  };
  const setWriter = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch({ type: 'setWriter', value: e.currentTarget.innerText });
  };
  const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setTitle', value: e.target.value });
  };
  const setContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setContent', value: e.target.value });
  };
  // 글감 리스트 get
  const [topicList, setTopicList] = useState<Topics[]>([]);

  // 이미지
  const [previewImgUrl, setPreviewImgUrl] = useState(
    'https://mile-s3.s3.ap-northeast-2.amazonaws.com/post/KakaoTalk_Photo_2024-01-14-15-52-49.png',
  );
  const [imageToServer, setImageToServer] = useState(
    'https://mile-s3.s3.ap-northeast-2.amazonaws.com/post/KakaoTalk_Photo_2024-01-14-15-52-49.png',
  );

  // 모임 ID, url에서 받아오기
  const { groupId, type } = useParams() as { groupId: string; type: string };
  // 임시저장 값 여부 확인 (서버값)
  const { isTemporaryPostExist, tempPostId } = useTempSaveFlag(groupId || '');
  // 조건부 처리용
  const [temporaryExist, setTemporaryExist] = useState(isTemporaryPostExist || false);
  // 수정하기, 임시저장 postId 저장
  const [editPostId, setEditPostId] = useState('');
  // postId 업데이트
  if (type == 'edit') {
    setEditPostId(location.state.postId);
  }
  if (type == 'post' && temporaryExist) {
    setEditPostId(tempPostId);
  }

  //라우팅 했을 때 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 글감 받아오기
  const { topics } = useGetTopic(groupId || '');
  useEffect(() => {
    if (topics) {
      setTopicList(topics);
    }
  }, [topics]);

  // 이미지 보낼 url 받아오기
  const { fileName, url } = usePresignedUrl();

  // 최초저장
  const { mutate: postContent } = usePostContent({
    groupId: groupId,
    topicId: editorVal.topic,
    title: editorVal.title,
    content: editorVal.content,
    imageUrl: editorVal.imageUrl,
    anonymous: editorVal.writer == '작자미상',
  });

  const saveHandler = () => {
    postContent();
  };

  // 수정하기 제출하기
  const { mutate: putEditContent } = usePutEditContent({
    topicId: editorVal.topic,
    title: editorVal.title,
    content: editorVal.content,
    imageUrl: editorVal.imageUrl,
    anonymous: editorVal.writer == '작자미상',
    postId: editPostId,
  });

  const editSaveHandler = () => {
    putEditContent();
    navigate(`/detail/${groupId}/${editPostId}`);
  };

  // 임시 저장
  const { mutate: postTempSaveContent } = usePostTempSaveContent({
    groupId: groupId,
    topicId: editorVal.topic,
    title: editorVal.title,
    content: editorVal.content,
    imageUrl: editorVal.imageUrl,
    anonymous: editorVal.writer == '작자미상',
  });
  const tempSaveHandler = () => {
    postTempSaveContent();
    navigate(`/group/${groupId}`);
  };

  // 임시저장 불러오기
  const { tempTopicList, tempTitle, tempContent, tempImageUrl, tempAnonymous } =
    useGetTempSaveContent(tempPostId || '', temporaryExist || false);

  useEffect(() => {
    if (isTemporaryPostExist && type != 'edit') {
      if (confirm('임시 저장된 글을 계속 이어 쓸까요?')) {
        setTemporaryExist(true);
      } else {
        setTemporaryExist(false);
      }
    } else {
      setTemporaryExist(false);
    }
  }, [isTemporaryPostExist, tempTitle, tempContent]);

  // 임시 저장 글 -> 저장하기
  const { mutate: putTempSaveContent } = usePutTempSaveContent({
    topicId: editorVal.topic,
    title: editorVal.title,
    content: editorVal.content,
    imageUrl: editorVal.imageUrl,
    anonymous: editorVal.writer == '작자미상',
    postId: tempPostId || '',
  });

  const tempExistSaveHandler = () => {
    putTempSaveContent();
    navigate(`/detail/${groupId}/${tempPostId}`);
  };

  return (
    <PostPageWrapper>
      {type == 'edit' ? (
        <EditorEditHeader onClickEditSave={editSaveHandler} />
      ) : temporaryExist ? (
        <EditorTempExistHeader onClickSubmit={tempExistSaveHandler} />
      ) : (
        <EditorTempNotExistHeader onClickTempSave={tempSaveHandler} onClickSubmit={saveHandler} />
      )}
      <ImageUpload
        setPreviewImgUrl={setPreviewImgUrl}
        previewImgUrl={previewImgUrl}
        setImageToServer={setImageToServer}
        url={url || ''}
        fileName={fileName || ''}
      />
      <DropDownEditorWrapper>
        <DropDown
          isTemp={temporaryExist || false}
          topicList={topicList}
          tempTopicList={tempTopicList}
          setTopic={setTopic}
          setWriter={setWriter}
          selectedTopic={editorVal.topic}
          selectedWriter={editorVal.writer}
          pageType={type}
        />
        <Spacing marginBottom="2.4" />
        <Editor
          isTemp={temporaryExist}
          title={contentTitle}
          tempTitle={tempTitle}
          saveTitle={setContentTitle}
          content={contentContent}
          tempContent={tempContent}
          saveContent={setContentContent}
        />
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
