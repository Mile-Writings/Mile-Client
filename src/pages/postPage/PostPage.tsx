/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import React, { useEffect, useState, useReducer } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import DropDown from './components/DropDown';
import Editor from './components/Editor';
import ImageUpload from './components/ImageUpload';
import { EDITOR_DEFAULT_IMG } from './constants/editorDefaultImg';
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
  topic: string | undefined;
  writer: string | undefined;
  title: string | undefined;
  content: string | undefined;
  imageUrl: string | undefined;
}

interface editorActionType {
  type: string;
  topic?: string;
  writer?: string;
  title?: string;
  content?: string;
  imageUrl?: string;
}

// reducer 초기값
const editorState: editorStateType = {
  topic: '',
  writer: '작자미상',
  title: '',
  content: '',
  imageUrl: EDITOR_DEFAULT_IMG,
};

// reducer 함수
const reducerFn = (state: editorStateType, action: editorActionType): editorStateType => {
  switch (action.type) {
    case 'setTopic':
      return {
        ...state,
        topic: action.topic,
      };
    case 'setWriter':
      return {
        ...state,
        writer: action.writer,
      };
    case 'setTitle':
      return {
        ...state,
        title: action.title,
      };
    case 'setContent':
      return {
        ...state,
        content: action.content,
      };
    case 'setInitialTopic':
      return {
        ...state,
        topic: action.topic,
      };
    case 'setEditValue':
      return {
        ...state,
        topic: action.topic,
        writer: action.writer,
        title: action.title,
        content: action.content,
        imageUrl: action.imageUrl,
      };
    case 'setTempValue':
      return {
        ...state,
        topic: action.topic,
        writer: action.writer,
        title: action.title,
        content: action.content,
        imageUrl: action.imageUrl,
      };
    case 'setImageToServer':
      return {
        ...state,
        imageUrl: action.imageUrl,
      };
    default:
      return state;
  }
};

const PostPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //라우팅 했을 때 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [editorVal, dispatch] = useReducer(reducerFn, editorState);

  // dispatch prop 함수들
  const setTopic = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch({ type: 'setTopic', topic: e.currentTarget.innerText });
  };
  const setWriter = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch({ type: 'setWriter', writer: e.currentTarget.innerText });
  };
  const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setTitle', title: e.target.value });
  };
  const setContent = (content: string) => {
    dispatch({ type: 'setContent', content: content });
  };
  const setImageToServer = (imageUrl: string) => {
    dispatch({ type: 'setImageToServer', imageUrl: imageUrl });
  };
  const [previewImgUrl, setPreviewImgUrl] = useState(EDITOR_DEFAULT_IMG);

  // 모임 ID, url에서 받아오기
  const { groupId, type } = useParams() as { groupId: string; type: string };
  // 임시저장 값 여부 확인 (서버값)
  const { isTemporaryPostExist, tempPostId } = useTempSaveFlag(groupId || '');
  // 임시저장 이어쓰기 yes 인 경우 판별
  const [continueTempPost, setContinueTempPost] = useState(false);
  // 수정하기, 임시저장 postId 저장
  const [editPostId, setEditPostId] = useState('');

  // 임시저장 불러오기
  interface tempTopicListType {
    topicId: string;
    topicName: string;
    isSelected: boolean;
  }
  const { tempTopicList, tempTitle, tempContent, tempImageUrl, tempAnonymous } =
    useGetTempSaveContent(tempPostId || '', continueTempPost || false);

  // 최초 뷰 들어왔을 때 임시저장 이어쓸지 confirm 창
  useEffect(() => {
    if (type == 'post' && isTemporaryPostExist && !continueTempPost) {
      if (confirm('임시 저장된 글을 계속 이어 쓸까요?')) {
        setContinueTempPost(true);
      } else {
        setContinueTempPost(false);
      }
    }
  }, [isTemporaryPostExist, type, continueTempPost]);

  // 글감 받아오기
  const { topics } = useGetTopic(groupId || '');
  useEffect(() => {
    if (topics) {
      dispatch({ type: 'setInitialTopic', topic: topics[0].topicName });
    }
  }, [topics]);

  // 이미지 보낼 url 받아오기
  const { fileName, url } = usePresignedUrl();

  // 최초저장
  const { mutate: postContent } = usePostContent({
    groupId: groupId,
    topicId: topics
      ? topics.find((topic) => topic.topicName === editorVal.topic)?.topicId ?? ''
      : '',
    title: editorVal.title || '',
    content: editorVal.content || '',
    imageUrl: editorVal.imageUrl || '',
    anonymous: editorVal.writer == '작자미상',
  });
  const saveHandler = () => {
    postContent();
  };

  useEffect(() => {
    // 수정하기에서 넘어온 view일 경우 값 업데이트
    if (type == 'edit') {
      setEditPostId(location.state.postId);
      setPreviewImgUrl(location.state.imageUrl);
      dispatch({
        type: 'setEditValue',
        topic: location.state.topic,
        imageUrl: location.state.imageUrl,
        title: location.state.title,
        writer: location.state.writer == '작자미상' ? '작자미상' : '필명',
        content: location.state.content,
      });
    }
    // 임시저장된 값으로 업데이트
    if (type == 'post' && continueTempPost) {
      setEditPostId(tempPostId || '');
      setPreviewImgUrl(tempImageUrl);
      dispatch({
        type: 'setTempValue',
        topic:
          tempTopicList?.find((topicEl: tempTopicListType) => topicEl.isSelected)?.topicName || '',
        title: tempTitle,
        content: tempContent,
        imageUrl: tempImageUrl,
        writer: tempAnonymous ? '작자미상' : '필명',
      });
    }
  }, [type, continueTempPost, tempTitle]);

  // 수정하기 제출하기
  const { mutate: putEditContent } = usePutEditContent({
    topicId: topics
      ? topics.find((topic) => topic.topicName === editorVal.topic)?.topicId ?? ''
      : '',
    title: editorVal.title || '',
    content: editorVal.content || '',
    imageUrl: editorVal.imageUrl || '',
    anonymous: editorVal.writer == '작자미상',
    postId: editPostId,
  });

  const editSaveHandler = () => {
    putEditContent();
    navigate(`/detail/${groupId}/${editPostId}`);
  };

  // 최초 글 임시 저장
  const { mutate: postTempSaveContent } = usePostTempSaveContent({
    groupId: groupId,
    topicId: topics
      ? topics.find((topic) => topic.topicName === editorVal.topic)?.topicId ?? ''
      : '',
    title: editorVal.title || '',
    content: editorVal.content || '',
    imageUrl: editorVal.imageUrl || '',
    anonymous: editorVal.writer == '작자미상',
  });
  const tempSaveHandler = () => {
    postTempSaveContent();
    navigate(`/group/${groupId}`);
  };

  // 임시 저장 글 -> 저장하기
  const { mutate: putTempSaveContent } = usePutTempSaveContent({
    topicId: topics
      ? topics.find((topic) => topic.topicName === editorVal.topic)?.topicId ?? ''
      : '',
    title: editorVal.title || '',
    content: editorVal.content || '',
    imageUrl: editorVal.imageUrl || '',
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
      ) : continueTempPost ? (
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
        {topics && (
          <DropDown
            topicList={topics}
            setTopic={setTopic}
            setWriter={setWriter}
            selectedTopic={editorVal.topic}
            selectedWriter={editorVal.writer}
          />
        )}
        <Spacing marginBottom="2.4" />
        <Editor
          title={editorVal.title}
          setTitle={setTitle}
          content={editorVal.content}
          setContent={setContent}
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
