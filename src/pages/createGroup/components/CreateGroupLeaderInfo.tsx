import styled from '@emotion/styled';
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';

import { CurrentPageType } from '../types/stateType';

import Spacing from '../../../components/commons/Spacing';

interface GroupLeaderPropTypes {
  leaderPenName: string;
  setCurrentPage: Dispatch<SetStateAction<CurrentPageType['currentPage']>>;
  setLeaderPenName: (e: ChangeEvent<HTMLInputElement>) => void;
  leaderDesc: string;
  setLeaderDesc: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isGroupLeaderValid: boolean;
  setIsGroupLeaderValid: Dispatch<SetStateAction<boolean>>;
}

const CreateGroupLeaderInfo = ({
  leaderPenName,
  setCurrentPage,
  setLeaderDesc,
  leaderDesc,
  setLeaderPenName,
  isGroupLeaderValid,
  setIsGroupLeaderValid,
}: GroupLeaderPropTypes) => {
  // useEffect(() => {
  //   const handleBackButton = (e: PopStateEvent) => {
  //     e.preventDefault(); // 기본 동작 방지
  //     setCurrentPage('GroupInfoPage'); // 상태 변경
  //   };

  //   window.addEventListener('popstate', handleBackButton);
  //   return () => {
  //     window.removeEventListener('popstate', handleBackButton);
  //   };
  // }, []); // 의존성 배열을 비워서 컴포넌트 마운트 시 1회만 설정되도록 함

  const handleLeaderNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setIsGroupLeaderValid(true);
    setLeaderPenName(e);
  };
  return (
    <>
      <CreateGroupLayout>
        <TitleWrapper>
          <SubTitle>안녕하세요. 마일에 오신 것을 환영합니다</SubTitle>
          <Spacing marginBottom="1.1" />
          <Title>글모임 장의 정보를 입력해주세요</Title>
        </TitleWrapper>
        <WhiteInputWrapper isValid={isGroupLeaderValid}>
          <GroupInputWrapper>
            <InputTitleText>글모임장 필명*</InputTitleText>
            <GroupLeaderNameInput
              placeholder="모임에서 사용할 필명 설정 후 가입할 수 있어요!"
              isValid={leaderPenName.length <= 8}
              onChange={(e) => handleLeaderNameInput(e)}
            />{' '}
            {leaderPenName.length > 8 && <ErrorMsgText>8자 이내로 작성해주세요.</ErrorMsgText>}
          </GroupInputWrapper>
        </WhiteInputWrapper>
        <GroupLeaderInfoWrppaer>
          <GroupInputWrapper>
            <InputTitleText>글 모임 소개</InputTitleText>
            <GroupLeaderInfoTextarea
              placeholder="글 모임에 대해 자유롭게 소개해주세요."
              isValid={leaderDesc.length <= 100}
              onChange={(e) => setLeaderDesc(e)}
              maxLength={110}
            />
            <TextAreaLenth isValid={leaderDesc.length <= 100}>
              {leaderDesc.length}/ 100
            </TextAreaLenth>
          </GroupInputWrapper>
        </GroupLeaderInfoWrppaer>
      </CreateGroupLayout>
    </>
  );
};

const ErrorMsgText = styled.p`
  ${({ theme }) => theme.fonts.body4};
  color: ${({ theme }) => theme.colors.mileRed};
`;

const TextAreaLenth = styled.span<{ isValid: boolean }>`
  position: relative;
  bottom: 4rem;
  left: 70.6rem;

  width: 6rem;

  ${({ theme }) => theme.fonts.button3};
  color: ${({ theme, isValid }) => (isValid ? theme.colors.gray70 : theme.colors.mileRed)};
`;
const GroupLeaderInfoTextarea = styled.textarea<{ isValid: boolean }>`
  width: 100%;
  height: 11rem;
  padding: 1rem 1.2rem;

  color: ${({ theme }) => theme.colors.gray100};

  background: ${({ theme }) => theme.colors.gray5};
  border: 1px solid
    ${({ theme, isValid }) => (isValid ? theme.colors.gray20 : theme.colors.mileRed)};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.button2};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray50};
  }
`;

const GroupLeaderInfoWrppaer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;

  border-radius: 8px;
`;
const GroupLeaderNameInput = styled.input<{ isValid: boolean }>`
  width: 100%;
  height: 3.9rem;
  padding: 1rem 1.2rem;

  color: ${({ theme }) => theme.colors.gray100};

  background: ${({ theme }) => theme.colors.gray5};
  border: 1px solid
    ${({ theme, isValid }) => (isValid ? theme.colors.gray20 : theme.colors.mileRed)};

  /* border: 1px solid ${({ theme }) => theme.colors.gray20}; */
  border-radius: 6px;
  ${({ theme }) => theme.fonts.button2};

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray50};
  }
`;
const WhiteInputWrapper = styled.section<{ isValid: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;

  border: 1px solid ${({ theme, isValid }) => (isValid ? 'none' : theme.colors.mileRed)};
  border-radius: 8px;
`;

const GroupInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  padding: 2.8rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

const InputTitleText = styled.p`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.subtitle2};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.title1};
`;
const SubTitle = styled.h2`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.title5};
`;

const TitleWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
`;
const CreateGroupLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  width: 82.6rem;
  height: fit-content;
  margin-bottom: 2.8rem;
`;

const GroupLeaderInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 11.4rem;
`;

export default CreateGroupLeaderInfo;
