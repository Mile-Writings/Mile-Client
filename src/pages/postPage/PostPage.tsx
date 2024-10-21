/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import { createBrowserHistory } from 'history';
import React, { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import DropDown from './components/DropDown';
import EditorContinueTempModal from './components/EditorContinueTempModal';
import EditorFlowModal from './components/EditorFlowModal';
import ImageUpload from './components/ImageUpload';
import TipTap from './components/TipTap';
import { EDITOR_DEFAULT_IMG } from './constants/editorDefaultImg';
import {
  useDeleteTempPost,
  useGetTempSaveContent,
  useGetTopic,
  usePostContent,
  usePostTempSaveContent,
  usePresignedUrl,
  usePutEditContent,
  usePutTempSaveContent,
  useTempSaveFlag,
} from './hooks/queries';
import { allowScroll, preventScroll } from './utils/modalPreventScroll';

import { EditorErrorIcn } from '../../assets/svgs/editorSVG';
import {
  EditorEditHeader,
  EditorTempExistHeader,
  EditorTempNotExistHeader,
} from '../../components/commons/Header';
import Spacing from '../../components/commons/Spacing';

import postDirectlyS3Func from '../../utils/apis/postDirectlyS3Func';
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
  writer: '필명',
  title: '',
  content: '',
  imageUrl: '',
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
      console.log('default Reducer');
      return {
        topic: '',
        writer: '필명',
        title: '',
        content: '',
        imageUrl: '',
      };
  }
};

// editor Flow Modal 관련
interface editorFlowModalType {
  title: string;
  leftBtnText: string;
  leftBtnFn: () => void;
  rightBtnText: string;
  rightBtnFn: () => void;
  modalImgType: string;
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
  modalImgType: '',
};

const PostPage = () => {
  const history = createBrowserHistory();
  const navigate = useNavigate();
  const location = useLocation();

  // editor content API 관련
  const [editorVal, editorContentDispatch] = useReducer(editorContentReducerFn, editorState);
  // editorContentDispatch prop 함수들
  const setTopic = (e: React.MouseEvent<HTMLDivElement>) => {
    editorContentDispatch({ type: 'setTopic', topic: e.currentTarget.innerText });
  };
  const setWriter = (e: React.MouseEvent<HTMLDivElement>) => {
    editorContentDispatch({ type: 'setWriter', writer: e.currentTarget.innerText });
  };
  const setTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const title = e.target.value.length <= 32 ? e.target.value : e.target.value.slice(0, 32);
    editorContentDispatch({ type: 'setTitle', title: title });
  };
  const setContent = (content: string) => {
    editorContentDispatch({ type: 'setContent', content: content });
  };
  const setImageToServer = (imageUrl: string | undefined) => {
    console.log(imageUrl);
    if (typeof imageUrl === 'string') {
      editorContentDispatch({ type: 'setImageToServer', imageUrl: imageUrl });
    } else {
      console.log('imageUrl Type Error' + typeof imageUrl);
    }
  };

  // 모임 ID, url에서 받아오기
  const { groupId, type } = useParams() as { groupId: string; type: string };
  // 임시저장 값 여부 확인 (서버값)
  const { isTemporaryPostExist, tempPostId } = useTempSaveFlag(groupId || '', type === 'post');
  console.log('🚀 ~ PostPage ~ tempPostId:', tempPostId);
  // 임시저장 이어쓰기 yes 인 경우 판별
  const [continueTempPost, setContinueTempPost] = useState(false);
  // 수정하기, 임시저장 postId 저장
  const [editPostId, setEditPostId] = useState('');
  const [previewImgUrl, setPreviewImgUrl] = useState(EDITOR_DEFAULT_IMG);
  // modal 열고닫음
  const [showModal, setShowModal] = useState(false);
  const [showTempContinueModal, setShowTempContinueModal] = useState(false);
  // 어떤 모달 열려야 하는지 handling
  const [editorModalType, setEditorModalType] = useState('');
  // 모든 정보 입력됐는지 여부
  const [postErrorMessage, setPostErrorMessage] = useState('');
  // 에디터 글 내용 태그 제외한 값 (valid 확인용)
  const [contentWithoutTag, setContentWithoutTag] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [postContentId, setPostContentId] = useState<string | undefined>('');

  const [postBtnClick, setPostBtnClick] = useState(false);
  // 임시저장 불러오기
  interface tempTopicListType {
    topicId: string;
    topicName: string;
    isSelected: boolean;
  }
  const { tempTopicList, tempTitle, tempContent, tempImageUrl, tempAnonymous } =
    useGetTempSaveContent(tempPostId || '', continueTempPost || false);

  const { fileName = '', url = '' } = usePresignedUrl();

  // 최초 뷰 들어왔을 때 임시저장 이어쓸지 confirm 창
  useEffect(() => {
    if (type === 'post' && isTemporaryPostExist && !continueTempPost) {
      setEditorModalType('continueTempSave');
      setShowTempContinueModal(true);
      preventScroll();
    }
  }, [isTemporaryPostExist, type, continueTempPost]);

  // 임시저장 삭제하기
  const { mutate: deleteTempPost } = useDeleteTempPost(tempPostId || '', groupId);
  const deleteTempPostHandler = () => {
    deleteTempPost();
  };

  // 글감 받아오기
  const { topics } = useGetTopic(groupId || '');
  useEffect(() => {
    if (topics) {
      editorContentDispatch({ type: 'setInitialTopic', topic: topics[0].topicName });
    }
  }, [topics]);

  // 최초저장
  const modalOpen = () => {
    setShowModal(true);
    setEditorModalType('postContent');
    editorFlowModalDispatch({ type: 'postContent' });
    console.log('modalOpen');
  };

  const { mutate: postContent } = usePostContent({
    groupId: groupId,
    topicId: topics
      ? topics.find((topic) => topic.topicName === editorVal.topic)?.topicId ?? ''
      : '',
    title: editorVal.title || '',
    content: editorVal.content || '',
    imageUrl: editorVal.imageUrl || '',
    anonymous: editorVal.writer === '작자미상',
    modalOpen: modalOpen,
    setPostContentId: setPostContentId,
  });

  // 최초저장 -> 제출하기 누르면 열리는 모달
  const onClickPostContentBtn = async () => {
    console.log(editorVal);
    if (editorVal.title?.trim().length === 0) {
      setPostErrorMessage('제목을 입력해주세요');
      return;
    } else if (contentWithoutTag.trim().length === 0) {
      setPostErrorMessage('글을 입력해주세요');

      return;
    }

    try {
      setPostBtnClick(true);
      await postDirectlyS3Func(url, fileName, imageFile, editorVal.imageUrl, setImageToServer);
      // await postContent();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (editorVal.imageUrl && type === 'post' && postBtnClick) {
      console.log('post api 작동');
      postContent();
      setPostBtnClick(false);
    }
  }, [editorVal.imageUrl, type]);

  useEffect(() => {
    // 수정하기에서 넘어온 view일 경우 값 업데이트
    if (type === 'edit') {
      setEditPostId(location.state.postId);
      setPreviewImgUrl(location.state.imageUrl);
      setContentWithoutTag(location.state.title);
      console.log(location.state.imageUrl);
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
      setContentWithoutTag(tempContent);
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
    contentWithoutTag: contentWithoutTag,
    setPostErrorMessage: setPostErrorMessage,
  });

  const onClickEditSaveBtn = async () => {
    if (editorVal.title?.trim().length === 0) {
      setPostErrorMessage('제목을 입력해주세요');
      return;
    } else if (contentWithoutTag.trim().length === 0) {
      setPostErrorMessage('글을 입력해주세요');

      return;
    } else {
      try {
        await postDirectlyS3Func(url, fileName, imageFile, editorVal.imageUrl, setImageToServer);

        putEditContent();
      } catch (err) {
        console.error(err);
      }

      setShowModal(true);
      setEditorModalType('editContent');
      editorFlowModalDispatch({ type: 'editContent' });
      preventScroll();
    }
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
    isPostView: type === 'post',
  });

  // 임시저장 버튼 누르면 열리는 모달
  const onClickTempSaveBtn = () => {
    // 이미지 보낼 url 받아오기

    postDirectlyS3Func(url, fileName, imageFile, editorVal.imageUrl, setImageToServer);
    console.log(isTemporaryPostExist);
    if (isTemporaryPostExist) {
      setShowModal(true);
      setEditorModalType('tempSave');
      editorFlowModalDispatch({ type: 'putNewTempSaveContent' });
      preventScroll();
    } else {
      setShowModal(true);
      setEditorModalType('tempSave');
      editorFlowModalDispatch({ type: 'tempSave' });
      preventScroll();
    }
  };

  // 임시저장 모달 -> '예' 누르면 쿼리 동작
  const tempSaveHandler = () => {
    postTempSaveContent();
    navigate(`/group/${groupId}`);
  };

  // 임시 저장 글 -> 저장하기
  const { mutate: putTempSaveContent } = usePutTempSaveContent({
    groupId: groupId,
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
    if (editorVal.title?.trim().length === 0) {
      setPostErrorMessage('제목을 입력해주세요');
      return;
    } else if (contentWithoutTag.trim().length === 0) {
      console.log('🚀 ~ onClickTempExistSaveBtn ~ contentWithoutTag:', contentWithoutTag);
      console.log(contentWithoutTag);
      setPostErrorMessage('글을 입력해주세요');

      return;
    }
    putTempSaveContent();
    setShowModal(true);
    editorFlowModalDispatch({ type: 'putTempSaveContent' });
    setEditorModalType('putTempSaveContent');
    preventScroll();
  };

  // 글 제출 시 에러 메시지 타이머 설정
  useEffect(() => {
    if (postErrorMessage) {
      const timer = setTimeout(() => {
        setPostErrorMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [postErrorMessage]);

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
          modalImgType: 'tempSave',
        };
      // 최초 제출하기
      case 'postContent':
        return {
          ...state,
          title: '제출이 완료되었습니다',
          leftBtnText: '홈으로 가기',
          leftBtnFn: () => navigate(`/group/${groupId}`),
          rightBtnText: '글 확인하기',
          rightBtnFn: () => navigate(`/detail/${groupId}/${postContentId}`),
          modalImgType: 'postContent',
        };
      // 임시저장 이어쓰기 -> 제출하기
      case 'putTempSaveContent':
        return {
          ...state,
          title: '제출이 완료되었습니다',
          leftBtnText: '홈으로 가기',
          leftBtnFn: () => navigate(`/group/${groupId}`),
          rightBtnText: '글 확인하기',
          rightBtnFn: () => navigate(`/detail/${groupId}/${tempPostId}`),
          modalImgType: 'postContent',
        };
      // 임시저장 존재하는데 다른 글 임시저장
      case 'putNewTempSaveContent':
        return {
          ...state,
          title: '이미 임시저장된 글이 있습니다. \n덮어쓰시겠습니까?',
          leftBtnText: '예',
          leftBtnFn: tempSaveHandler,
          rightBtnText: '아니오',
          rightBtnFn: () => setShowModal(false),
          modalImgType: 'editorWarn',
        };
      // 수정하기
      case 'editContent':
        return {
          ...state,
          title: '수정이 완료되었습니다.',
          leftBtnText: '홈으로 가기',
          leftBtnFn: () => navigate(`/group/${groupId}`),
          rightBtnText: '글 확인하기',
          rightBtnFn: () => navigate(`/detail/${groupId}/${editPostId}`),
          modalImgType: 'postContent',
        };
      // 페이지 이탈
      case 'exitEditPage':
        return {
          ...state,
          title: '작성 중이 글이 있습니다. \n 페이지를 나가시겠습니까?',
          leftBtnText: '예',
          leftBtnFn: () => navigate(`/group/${groupId}`),
          rightBtnText: '아니오',
          rightBtnFn: () => setShowModal(false),
          modalImgType: 'editorWarn',
        };
      default:
        return state;
    }
  };

  const [editorFlowModalVal, editorFlowModalDispatch] = useReducer(
    editorFlowModalReducerFn,
    editorFlowModalState,
  );

  // 모달 스크롤 방지 제거
  useEffect(() => {
    if (showModal || showTempContinueModal) {
      switch (editorModalType) {
        case 'tempSave':
          onClickTempSaveBtn();
          break;
        case 'postContent':
          preventScroll();
          console.log('postContentModal');
          break;
        case 'putTempSaveContent':
          onClickTempExistSaveBtn();
          break;
        case 'editContent':
          onClickEditSaveBtn();
          break;
        case 'continueTempSave':
          // 렌더링 되자마자 쿼리함수 실행되므로 prevent만 넣어줌
          preventScroll();
          break;
        case 'exitEditPage':
          preventScroll();
          break;
      }
    }

    return () => {
      allowScroll();
    };
  }, [showModal, showTempContinueModal, editorModalType]);

  // 뒤로가기 방지
  const preventGoBack = () => {
    setShowModal(true);
    editorFlowModalDispatch({ type: 'exitEditPage' });
    setEditorModalType('exitEditPage');
    preventScroll();
  };

  // 새로고침 방지
  const preventReload = (e: Event) => {
    e.preventDefault();
    // setShowModal(true);
    // editorFlowModalDispatch({ type: 'exitEditPage' });
    // setEditorModalType('exitEditPage');
    // preventScroll();
  };

  useEffect(() => {
    (() => {
      // 현재 상태를 세션 히스토리 스택에 추가(push)
      // 뒤로가기 해도 현재 페이지에 일단 머물게 하기
      history.push(history.location);

      window.addEventListener('popstate', preventGoBack);
      window.addEventListener('beforeunload', preventReload);
    })();

    return () => {
      window.removeEventListener('popstate', preventGoBack);
      window.removeEventListener('beforeunload', preventReload);
    };
  }, []);

  return (
    <PostPageWrapper>
      <EditorContinueTempModal
        showTempContinueModal={showTempContinueModal}
        setShowTempContinueModal={setShowTempContinueModal}
        setContinueTempPost={setContinueTempPost}
        deleteTempPost={deleteTempPostHandler}
      />
      <EditorFlowModal
        showModal={showModal}
        setShowModal={setShowModal}
        editorFlowModalContent={editorFlowModalVal}
        editorModalType={editorModalType}
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
      <PostDeclinedWrapper $postAvailable={postErrorMessage.trim().length === 0}>
        <EditorErrorIcn />
        <PoseDeclinedText>{postErrorMessage}</PoseDeclinedText>
      </PostDeclinedWrapper>
      <ImageUpload
        setPreviewImgUrl={setPreviewImgUrl}
        previewImgUrl={previewImgUrl}
        setImageToServer={setImageToServer}
        setImageFile={setImageFile}
        // url={url || ''}
        // fileName={fileName || ''}
      />
      {/* <DropDownEditorWrapper> */}
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
        editContent={type === 'edit' ? location?.state?.content : ''}
        setEditorContent={setContent}
        setContentWithoutTag={setContentWithoutTag}
      />
      {/* </DropDownEditorWrapper> */}
      <Spacing marginBottom="8" />
    </PostPageWrapper>
  );
};

export default PostPage;

const PostPageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const PostDeclinedWrapper = styled.div<{ $postAvailable: boolean }>`
  position: fixed;
  top: 7rem;
  right: 6rem;
  z-index: 5;
  display: ${({ $postAvailable }) => ($postAvailable ? 'none' : 'flex')};
  gap: 1.17rem;
  align-items: center;
  justify-content: center;
  width: 20.9rem;
  padding: 1.17rem 1.6rem 1.17rem 1.97rem;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.mainViolet};
  border-radius: 8px;
`;

const PoseDeclinedText = styled.span`
  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.button1};
`;
