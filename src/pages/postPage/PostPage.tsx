/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import React, { useEffect, useState, useReducer } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import DropDown from './components/DropDown';
import EditorFlowModal from './components/EditorFlowModal';
import ImageUpload from './components/ImageUpload';
import TipTap from './components/TipTap';
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
import { preventScroll, allowScroll } from './utils/modalPreventScroll';

import {
  EditorEditHeader,
  EditorTempExistHeader,
  EditorTempNotExistHeader,
} from '../../components/commons/Header';
import Spacing from '../../components/commons/Spacing';

// editor content API 관련
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

const editorState: editorStateType = {
  topic: '',
  writer: '작자미상',
  title: '',
  content: '',
  imageUrl: EDITOR_DEFAULT_IMG,
};

const editorContentReducerFn = (
  state: editorStateType,
  action: editorActionType,
): editorStateType => {
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

// editor Flow Modal 관련
interface editorFlowModalType {
  title: string;
  leftBtnText: string;
  leftBtnFn: () => void;
  rightBtnText: string;
  rightBtnFn: () => void;
}

interface editorFlowModalActionType {
  type: string;
}

const editorFlowModalState: editorFlowModalType = {
  title: '',
  leftBtnText: '',
  leftBtnFn: () => {},
  rightBtnText: '',
  rightBtnFn: () => {},
};

const PostPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //라우팅 했을 때 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // editor content API 관련
  const [editorVal, editorContentDispatch] = useReducer(editorContentReducerFn, editorState);

  // editorContentDispatch prop 함수들
  const setTopic = (e: React.MouseEvent<HTMLDivElement>) => {
    editorContentDispatch({ type: 'setTopic', topic: e.currentTarget.innerText });
  };
  const setWriter = (e: React.MouseEvent<HTMLDivElement>) => {
    editorContentDispatch({ type: 'setWriter', writer: e.currentTarget.innerText });
  };
  const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    editorContentDispatch({ type: 'setTitle', title: e.target.value });
  };
  const setContent = (content: string) => {
    editorContentDispatch({ type: 'setContent', content: content });
  };
  const setImageToServer = (imageUrl: string) => {
    editorContentDispatch({ type: 'setImageToServer', imageUrl: imageUrl });
  };

  // 모임 ID, url에서 받아오기
  const { groupId, type } = useParams() as { groupId: string; type: string };
  // 임시저장 값 여부 확인 (서버값)
  const { isTemporaryPostExist, tempPostId } = useTempSaveFlag(groupId || '');
  // 임시저장 이어쓰기 yes 인 경우 판별
  const [continueTempPost, setContinueTempPost] = useState(false);
  // 수정하기, 임시저장 postId 저장
  const [editPostId, setEditPostId] = useState('');
  const [previewImgUrl, setPreviewImgUrl] = useState(EDITOR_DEFAULT_IMG);
  // modal 열고닫음
  const [showModal, setShowModal] = useState(false);
  // 어떤 모달 열려야 하는지 handling
  const [editorFlowModalType, setEditorFlowModalType] = useState('');

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
    if (type === 'post' && isTemporaryPostExist && !continueTempPost) {
      confirm('임시 저장된 글을 계속 이어 쓸까요?')
        ? setContinueTempPost(true)
        : setContinueTempPost(false);
    }
  }, [isTemporaryPostExist, type, continueTempPost]);

  // 글감 받아오기
  const { topics } = useGetTopic(groupId || '');
  useEffect(() => {
    if (topics) {
      editorContentDispatch({ type: 'setInitialTopic', topic: topics[0].topicName });
    }
  }, [topics]);

  // 이미지 보낼 url 받아오기
  const { fileName, url } = usePresignedUrl();

  // 최초저장
  const { mutate: postContent, postContentId } = usePostContent({
    groupId: groupId,
    topicId: topics
      ? topics.find((topic) => topic.topicName === editorVal.topic)?.topicId ?? ''
      : '',
    title: editorVal.title || '',
    content: editorVal.content || '',
    imageUrl: editorVal.imageUrl || '',
    anonymous: editorVal.writer === '작자미상',
  });

  // 최초저장 -> 제출하기 누르면 열리는 모달
  const onClickPostContentBtn = () => {
    postContent();
  };

  // 쿼리가 실행되고 postContentId를 받아온 후 모달 열리도록
  useEffect(() => {
    if (postContentId !== undefined) {
      setShowModal(true);
      editorFlowModalDispatch({ type: 'postContent' });
      setEditorFlowModalType('postContent');
      preventScroll();
    }
  }, [postContentId]);

  useEffect(() => {
    // 수정하기에서 넘어온 view일 경우 값 업데이트
    if (type === 'edit') {
      setEditPostId(location.state.postId);
      setPreviewImgUrl(location.state.imageUrl);
      editorContentDispatch({
        type: 'setEditValue',
        topic: location.state.topic,
        imageUrl: location.state.imageUrl,
        title: location.state.title,
        writer: location.state.writer === '작자미상' ? '작자미상' : '필명',
        content: location.state.content,
      });
    }
    // 임시저장된 값으로 업데이트
    if (type === 'post' && continueTempPost) {
      setEditPostId(tempPostId || '');
      setPreviewImgUrl(tempImageUrl);
      editorContentDispatch({
        type: 'setTempValue',
        topic:
          tempTopicList?.find((topicEl: tempTopicListType) => topicEl.isSelected)?.topicName || '',
        title: tempTitle,
        content: tempContent,
        imageUrl: tempImageUrl,
        writer: tempAnonymous ? '작자미상' : '필명',
      });
    }
  }, [type, continueTempPost, tempTitle, tempContent]);

  // 수정하기 제출하기
  const { mutate: putEditContent } = usePutEditContent({
    topicId: topics
      ? topics.find((topic) => topic.topicName === editorVal.topic)?.topicId ?? ''
      : '',
    title: editorVal.title || '',
    content: editorVal.content || '',
    imageUrl: editorVal.imageUrl || '',
    anonymous: editorVal.writer === '작자미상',
    postId: editPostId,
  });

  const onClickEditSaveBtn = () => {
    putEditContent();
    setShowModal(true);
    setEditorFlowModalType('editContent');
    editorFlowModalDispatch({ type: 'editContent' });
    preventScroll();
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
    anonymous: editorVal.writer === '작자미상',
  });

  // 임시저장 버튼 누르면 열리는 모달
  const onClickTempSaveBtn = () => {
    setShowModal(true);
    setEditorFlowModalType('tempSave');
    editorFlowModalDispatch({ type: 'tempSave' });
    preventScroll();
  };

  // 임시저장 모달 -> '예' 누르면 쿼리 동작
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
    anonymous: editorVal.writer === '작자미상',
    postId: tempPostId || '',
  });

  const onClickTempExistSaveBtn = () => {
    putTempSaveContent();
    setShowModal(true);
    editorFlowModalDispatch({ type: 'putTempSaveContent' });
    setEditorFlowModalType('putTempSaveContent');
    preventScroll();
  };

  // editor Flow Modal 관련
  const editorFlowModalReducerFn = (
    state: editorFlowModalType,
    action: editorFlowModalActionType,
  ): editorFlowModalType => {
    switch (action.type) {
      // 최초 글 임시저장
      case 'tempSave':
        return {
          ...state,
          title: '임시저장 하시겠습니까?',
          leftBtnText: '아니오',
          leftBtnFn: () => setShowModal(false),
          rightBtnText: '예',
          rightBtnFn: tempSaveHandler,
        };
      // 최초 제출하기
      case 'postContent':
        return {
          ...state,
          title: '제출이 완료되었습니다',
          leftBtnText: '홈으로 가기',
          leftBtnFn: () => navigate('/'),
          rightBtnText: '글 확인하기',
          rightBtnFn: () => navigate(`/detail/${groupId}/${postContentId}`),
        };
      // 임시저장 이어쓰기 -> 제출하기
      case 'putTempSaveContent':
        return {
          ...state,
          title: '제출이 완료되었습니다',
          leftBtnText: '홈으로 가기',
          leftBtnFn: () => navigate('/'),
          rightBtnText: '글 확인하기',
          rightBtnFn: () => navigate(`/detail/${groupId}/${tempPostId}`),
        };
      // 수정하기
      case 'editContent':
        return {
          ...state,
          title: '수정이 완료되었습니다.',
          leftBtnText: '홈으로 가기',
          leftBtnFn: () => navigate('/'),
          rightBtnText: '글 확인하기',
          rightBtnFn: () => navigate(`/detail/${groupId}/${editPostId}`),
        };
    }
  };

  const [editorFlowModalVal, editorFlowModalDispatch] = useReducer(
    editorFlowModalReducerFn,
    editorFlowModalState,
  );

  // 모달 스크롤 방지 제거
  useEffect(() => {
    if (showModal) {
      switch (editorFlowModalType) {
        case 'tempSave':
          onClickTempSaveBtn();
          break;
        case 'postContent':
          onClickPostContentBtn();
          break;
        case 'putTempSaveContent':
          onClickTempExistSaveBtn();
          break;
        case 'editContent':
          onClickEditSaveBtn();
          break;
      }
    }

    return () => {
      allowScroll();
    };
  }, [showModal, editorFlowModalType]);

  return (
    <PostPageWrapper>
      <EditorFlowModal
        showModal={showModal}
        setShowModal={setShowModal}
        editorFlowModalContent={editorFlowModalVal}
        editorFlowModalType={editorFlowModalType}
      />
      {type === 'edit' ? (
        <EditorEditHeader onClickEditSave={onClickEditSaveBtn} />
      ) : continueTempPost ? (
        <EditorTempExistHeader onClickSubmit={onClickTempExistSaveBtn} />
      ) : (
        <EditorTempNotExistHeader
          onClickTempSave={onClickTempSaveBtn}
          onClickSubmit={onClickPostContentBtn}
        />
      )}
      <Spacing marginBottom="6.4" />
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
        <TipTap
          title={editorVal.title}
          setTitle={setTitle}
          tempContent={tempContent}
          editContent={type === 'edit' ? location.state.content : ''}
          setEditorContent={setContent}
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
