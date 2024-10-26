/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import { createBrowserHistory } from 'history';
import React, { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import DropDown from './components/DropDown';
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
import { DefaultModal, DefaultModalBtn } from '../../components/commons/modal/DefaultModal';
import { FullModal, FullModalBtn } from '../../components/commons/modal/FullModal';
import Spacing from '../../components/commons/Spacing';
import useBlockPageExit from '../../hooks/useBlockPageExit';
import useModal from '../../hooks/useModal';
import { MODAL } from './constants/modalContent';

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
  modalImgType: 'DELETE' | 'POST' | 'EDIT' | 'SAVE' | 'CAUTION' | '';
  onClickBg: () => void;
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
  onClickBg: () => {},
};

const PostPage = () => {
  // 페이지 이탈
  const { isPageExitModalOpen, handleClosePageExitModal, handleExitPage, setIgnoreBlocker } =
    useBlockPageExit();
  const navigate = useNavigate();
  const location = useLocation();
  const history = createBrowserHistory();

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
  const { isModalOpen, handleShowModal, handleCloseModal } = useModal();
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

  // 임시저장 모달 - 삭제하기 함수
  const onClickDeleteTempPost = () => {
    deleteTempPost();
    setShowTempContinueModal(false);
  };
  // 임시저장 모달 - 새로쓰기 함수
  const onClickNewPostBtn = () => {
    setContinueTempPost(false);
    setShowTempContinueModal(false);
  };
  // 임시저장 모달 - 이어쓰기 함수
  const onClickContinueTempBtn = () => {
    setContinueTempPost(true);
    setShowTempContinueModal(false);
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
    handleShowModal();
    setEditorModalType('postContent');
    editorFlowModalDispatch({ type: 'postContent' });
    setIgnoreBlocker(true);
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
        handleShowModal();
        setEditorModalType('editContent');
        editorFlowModalDispatch({ type: 'editContent' });
        setIgnoreBlocker(true);
      } catch (err) {
        console.error(err);
      }
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

    handleShowModal();
    setEditorModalType('tempSave');
    setIgnoreBlocker(true);

    isTemporaryPostExist
      ? editorFlowModalDispatch({ type: 'putNewTempSaveContent' })
      : editorFlowModalDispatch({ type: 'tempSave' });
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

    handleShowModal();
    editorFlowModalDispatch({ type: 'putTempSaveContent' });
    setIgnoreBlocker(true);
    setEditorModalType('putTempSaveContent');
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
          title: MODAL.TEMP_SAVE,
          leftBtnText: '아니오',
          leftBtnFn: () => handleCloseModal(),
          rightBtnText: '예',
          rightBtnFn: tempSaveHandler,
          modalImgType: 'SAVE',
          onClickBg: () => handleCloseModal(),
        };
      // 최초 제출하기
      case 'postContent':
        return {
          ...state,
          title: MODAL.POST_CONTENT,
          leftBtnText: '홈으로 가기',
          leftBtnFn: () => navigate(`/group/${groupId}`),
          rightBtnText: '글 확인하기',
          rightBtnFn: () => navigate(`/detail/${groupId}/${postContentId}`),
          modalImgType: 'POST',
          onClickBg: () => {},
        };
      // 임시저장 이어쓰기 -> 제출하기
      case 'putTempSaveContent':
        return {
          ...state,
          title: MODAL.POST_CONTENT,
          leftBtnText: '홈으로 가기',
          leftBtnFn: () => navigate(`/group/${groupId}`),
          rightBtnText: '글 확인하기',
          rightBtnFn: () => navigate(`/detail/${groupId}/${tempPostId}`),
          modalImgType: 'POST',
          onClickBg: () => {},
        };
      // 임시저장 존재하는데 다른 글 임시저장
      case 'putNewTempSaveContent':
        return {
          ...state,
          title: MODAL.PUT_NEW_TEMP_SAVE_CONTENT,
          leftBtnText: '예',
          leftBtnFn: tempSaveHandler,
          rightBtnText: '아니오',
          rightBtnFn: handleCloseModal,
          modalImgType: 'CAUTION',
          onClickBg: () => {},
        };
      // 수정하기
      case 'editContent':
        return {
          ...state,
          title: MODAL.EDIT_CONTENT,
          leftBtnText: '홈으로 가기',
          leftBtnFn: () => navigate(`/group/${groupId}`),
          rightBtnText: '글 확인하기',
          rightBtnFn: () => navigate(`/detail/${groupId}/${editPostId}`),
          modalImgType: 'POST',
          onClickBg: () => {},
        };
      // 페이지 이탈
      case 'exitEditPage':
        return {
          ...state,
          title: MODAL.EXIT_EDIT_PAGE,
          leftBtnText: '예',
          leftBtnFn: () => navigate(`/group/${groupId}`),
          rightBtnText: '아니오',
          rightBtnFn: () => handleCloseModal(),
          modalImgType: 'CAUTION',
          onClickBg: () => handleCloseModal(),
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
    if (isModalOpen || showTempContinueModal) {
      switch (editorModalType) {
        case 'tempSave':
          onClickTempSaveBtn();
          break;
        case 'postContent':
          break;
        case 'putTempSaveContent':
          onClickTempExistSaveBtn();
          break;
        case 'editContent':
          onClickEditSaveBtn();
          break;
        case 'continueTempSave':
          // 렌더링 되자마자 쿼리함수 실행되므로 prevent만 넣어줌
          break;
        case 'exitEditPage':
          break;
      }
    }

    (editorModalType === 'continueTempSave' || editorModalType === 'exitEditPage') &&
      !isModalOpen &&
      !showTempContinueModal &&
      allowScroll();
  }, [isModalOpen, showTempContinueModal, editorModalType]);

  // 새로고침 방지
  const preventReload = (e: Event) => {
    e.preventDefault();
  };

  useEffect(() => {
    (() => {
      history.push(history.location);
      window.addEventListener('beforeunload', preventReload);
    })();

    return () => {
      window.removeEventListener('beforeunload', preventReload);
    };
  }, []);

  return (
    <PostPageWrapper>
      {/* 헤더 */}
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

      {/* 글 제출 막는 toast */}
      <PostDeclinedWrapper $postAvailable={postErrorMessage.trim().length === 0}>
        <EditorErrorIcn />
        <PoseDeclinedText>{postErrorMessage}</PoseDeclinedText>
      </PostDeclinedWrapper>
      <ImageUpload
        setPreviewImgUrl={setPreviewImgUrl}
        previewImgUrl={previewImgUrl}
        setImageFile={setImageFile}
      />

      {/* 글감 */}
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

      {/* 텍스트 에디터 */}
      <TipTap
        title={editorVal.title}
        setTitle={setTitle}
        tempContent={tempContent}
        editContent={type === 'edit' ? location?.state?.content : ''}
        setEditorContent={setContent}
        setContentWithoutTag={setContentWithoutTag}
      />
      <Spacing marginBottom="8" />

      {/* 임시저장 이어쓰기 관련 모달 */}
      <FullModal isModalOpen={showTempContinueModal} content={MODAL.TEMP_CONTINUE}>
        <FullModalBtn isPrimary={true} content="새로 쓰기" onClick={onClickNewPostBtn} />
        <FullModalBtn isPrimary={false} content="이어 쓰기" onClick={onClickContinueTempBtn} />
        <Spacing marginBottom="0.2" />
        <DeleteTempContentBtn onClick={onClickDeleteTempPost}>
          임시 저장 삭제하기
        </DeleteTempContentBtn>
      </FullModal>

      {/* 글쓰기 관련 모달 */}
      <DefaultModal
        isModalOpen={isModalOpen}
        onClickBg={editorFlowModalVal.onClickBg}
        content={editorFlowModalVal.title}
        modalImg={editorFlowModalVal.modalImgType}
      >
        <DefaultModalBtn
          btnText={[editorFlowModalVal.leftBtnText, editorFlowModalVal.rightBtnText]}
          onClickLeft={editorFlowModalVal.leftBtnFn}
          onClickRight={editorFlowModalVal.rightBtnFn}
        />
      </DefaultModal>

      {/* 페이지 이탈 모달 */}
      <DefaultModal
        isModalOpen={isPageExitModalOpen}
        onClickBg={handleClosePageExitModal}
        content={MODAL.PAGE_EXIT_WARN}
        modalImg="CAUTION"
      >
        <DefaultModalBtn
          btnText={['예', '아니요']}
          onClickLeft={handleExitPage}
          onClickRight={handleClosePageExitModal}
        />
      </DefaultModal>
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

// 임시저장된 글 삭제하기 부분
const DeleteTempContentBtn = styled.span`
  color: ${({ theme }) => theme.colors.gray60};

  ${({ theme }) => theme.fonts.body6};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray20};
  }
`;
