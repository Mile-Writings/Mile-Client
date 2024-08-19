import styled from '@emotion/styled';
import { ChangeEvent, useReducer, useState } from 'react';

import CreateGroupInfo from './components/CreateGroupInfo';
import CreateGroupLeaderInfo from './components/CreateGroupLeaderInfo';
import { usePostCreateGroup } from './hooks/queries';
import { CreateGroupTypes, CurrentPageType } from './types/stateType';

import { AuthorizationHeader, UnAuthorizationHeader } from '../../components/commons/Header';
import DefaultModal from '../../components/commons/modal/DefaultModal';
import DefaultModalBtn from '../../components/commons/modal/DefaultModalBtn';
import { DEFAULT_IMG_URL } from '../../constants/defaultImgUrl';
import useModal from '../../hooks/useModal';

type CreateGroupAction =
  | { type: 'setGroupName'; value: string }
  | { type: 'setGroupInfo'; value: string }
  | { type: 'setGroupImageFile'; value: string }
  | { type: 'setIsPublic'; value: boolean }
  | { type: 'setTopic'; value: string }
  | { type: 'setTopicTag'; value: string }
  | { type: 'setTopicDesc'; value: string }
  | { type: 'setLeaderPenName'; value: string }
  | { type: 'setLeaderDesc'; value: string };

const CreateGroup = () => {
  const [currentPage, setCurrentPage] = useState<CurrentPageType['currentPage']>('GroupInfoPage');
  const [isGroupLeaderValid, setIsGroupLeaderValid] = useState(true);
  const [groupImageView, setGroupImageView] = useState('');
  // modal 열고닫음
  const { isModalOpen, handleShowModal, handleCloseModal } = useModal();
  const initialState = {
    groupName: '',
    groupInfo: '',
    groupImageFile: '',
    isPublic: true,
    topic: '',
    topicTag: '',
    topicDesc: '',
    leaderPenName: '',
    leaderDesc: '',
  };

  const reducer = (state: CreateGroupTypes, action: CreateGroupAction) => {
    switch (action.type) {
      case 'setGroupName':
      case 'setGroupInfo':
      case 'setGroupImageFile':
      case 'setTopic':
      case 'setTopicTag':
      case 'setLeaderPenName':
      case 'setLeaderDesc': {
        const fieldName = action.type.slice(3); // "set"을 제외한 나머지 문자열
        const formattedFieldName = fieldName.charAt(0).toLowerCase() + fieldName.slice(1); // 첫 글자만 소문자로 변경
        return { ...state, [formattedFieldName]: action.value };
      }
      case 'setIsPublic':
        return { ...state, isPublic: action.value };
      case 'setTopicDesc':
        return { ...state, topicDesc: action.value };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    groupName,
    groupInfo,
    isPublic,
    topic,
    topicTag,
    topicDesc,
    leaderPenName,
    leaderDesc,
    groupImageFile,
  } = state;

  const setGroupName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setGroupName', value: e.target.value });
  };

  const setGroupInfo = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'setGroupInfo', value: e.target.value });
  };

  const setGroupImageFile = (inputValue: string) => {
    dispatch({ type: 'setGroupImageFile', value: inputValue });
  };

  const setIsPublic = (inputValue: boolean) => {
    dispatch({ type: 'setIsPublic', value: inputValue });
  };

  const setTopic = (topic: string) => {
    dispatch({ type: 'setTopic', value: topic });
  };

  const setTopicTag = (topicTag: string) => {
    dispatch({ type: 'setTopicTag', value: topicTag });
  };
  const setTopicDesc = (topicDesc: string) => {
    dispatch({ type: 'setTopicDesc', value: topicDesc });
  };
  const setLeaderPenName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setLeaderPenName', value: e.target.value });
  };
  const setLeaderDesc = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'setLeaderDesc', value: e.target.value });
  };

  // 빈 문자열인 경우 DEFAULT_IMG_URL로 대체
  const finalGroupImageFile = groupImageFile === '' ? DEFAULT_IMG_URL : groupImageFile;

  const { mutate } = usePostCreateGroup({
    groupName,
    groupInfo,
    groupImageFile: finalGroupImageFile,
    isPublic,
    topic,
    topicTag,
    topicDesc,
    leaderPenName,
    leaderDesc,
  });

  const createGroup = () => {
    if (!leaderPenName) {
      setIsGroupLeaderValid(false);
      return;
    }
    if (leaderPenName.length > 8) {
      alert('글모임장 필명 글자수를 확인해주세요');
      return;
    }
    if (leaderDesc.length > 100) {
      alert('글모임 소개 글자수를 확인해주세요');
      return;
    }

    if (groupName && topic && topicTag && leaderPenName && leaderDesc.length <= 100) {
      mutate();
    } else {
      throw new Error('글모임 생성 알 수 없는 에러');
    }
  };

  const handleBackBtn = () => {
    setCurrentPage('GroupInfoPage');
  };
  return (
    <CreateGroupWrapper>
      {localStorage.getItem('accessToken') ? <AuthorizationHeader /> : <UnAuthorizationHeader />}
      {currentPage === 'GroupInfoPage' && (
        <CreateGroupInfo
          setCurrentPage={setCurrentPage}
          groupName={groupName}
          setGroupName={setGroupName}
          groupInfo={groupInfo}
          setGroupInfo={setGroupInfo}
          setGroupImageFile={setGroupImageFile}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          topic={topic}
          topicTag={topicTag}
          topicDesc={topicDesc}
          setTopic={setTopic}
          setTopicTag={setTopicTag}
          setTopicDesc={setTopicDesc}
          groupImageView={groupImageView}
          setGroupImageView={setGroupImageView}
        />
      )}
      {currentPage === 'GroupLeaderInfoPage' && (
        <CreateGroupLeaderInfo
          leaderPenName={leaderPenName}
          setLeaderPenName={setLeaderPenName}
          leaderDesc={leaderDesc}
          setIsGroupLeaderValid={setIsGroupLeaderValid}
          setLeaderDesc={setLeaderDesc}
          isGroupLeaderValid={isGroupLeaderValid}
        />
      )}
      {currentPage === 'GroupLeaderInfoPage' && (
        <BtnWrapper>
          <CreateGroupBtn type="button" onClick={handleShowModal}>
            생성하기
          </CreateGroupBtn>
          <BackPageBtn type="button" onClick={handleBackBtn}>
            뒤로가기
          </BackPageBtn>
        </BtnWrapper>
      )}

      <DefaultModal
        isModalOpen={isModalOpen}
        handleClickBg={handleCloseModal}
        type="DEFAULT"
        content={`생성 완료 시 필명 변경이 불가합니다. \n계속 하시겠습니까?`}
        modalImg="POST"
      >
        <DefaultModalBtn isLeft={true} text="아니오" onClickBtn={handleCloseModal} />
        <DefaultModalBtn isLeft={false} text="예" onClickBtn={createGroup} />
      </DefaultModal>
    </CreateGroupWrapper>
  );
};

export default CreateGroup;

const BackPageBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.1rem;

  color: ${({ theme }) => theme.colors.mainViolet};

  ${({ theme }) => theme.fonts.button2};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.mainViolet};
  border-radius: 10px;

  :hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
    border: 1px solid ${({ theme }) => theme.colors.mileViolet};
  }
`;
const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
`;

const CreateGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 11.4rem;
`;
const CreateGroupBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.1rem;

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.button2};
  background: ${({ theme }) => theme.colors.mainViolet};
  border: 1px solid ${({ theme }) => theme.colors.mainViolet};
  border-radius: 10px;

  :hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
    border: 1px solid ${({ theme }) => theme.colors.mileViolet};
  }
`;
