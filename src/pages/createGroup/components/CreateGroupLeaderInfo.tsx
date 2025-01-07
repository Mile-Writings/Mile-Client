import styled from '@emotion/styled';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import Responsive from '../../../components/commons/Responsive/Responsive';
import Spacing from '../../../components/commons/Spacing';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';
interface GroupLeaderPropTypes {
  leaderPenName: string;
  setLeaderPenName: (e: ChangeEvent<HTMLInputElement>) => void;
  leaderDesc: string;
  setLeaderDesc: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isGroupLeaderValid: boolean;
  setIsGroupLeaderValid: Dispatch<SetStateAction<boolean>>;
}

const CreateGroupLeaderInfo = ({
  leaderPenName,
  setLeaderDesc,
  leaderDesc,
  setLeaderPenName,
  isGroupLeaderValid,
  setIsGroupLeaderValid,
}: GroupLeaderPropTypes) => {
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

            <Responsive only="desktop">
              <GroupLeaderNameInput
                placeholder="모임에서 사용할 필명 설정 후 가입할 수 있어요!"
                isValid={leaderPenName.length <= 8}
                onChange={(e) => handleLeaderNameInput(e)}
                maxLength={9}
              />{' '}
            </Responsive>
            <Responsive only="mobile">
              <GroupLeaderNameInput
                placeholder="띄어쓰기 포함 8자 이내"
                isValid={leaderPenName.length <= 8}
                onChange={(e) => handleLeaderNameInput(e)}
                maxLength={9}
              />{' '}
            </Responsive>
            {leaderPenName.length > 8 && <ErrorMsgText>8자 이내로 작성해주세요.</ErrorMsgText>}
          </GroupInputWrapper>
        </WhiteInputWrapper>
        <GroupLeaderInfoWrppaer>
          <GroupInputWrapper>
            <InputTitleText>글모임장 소개</InputTitleText>
            <GroupLeaderInfoTextarea
              placeholder="글 모임에 대해 자유롭게 소개해주세요."
              isValid={leaderDesc.length <= 100}
              onChange={(e) => setLeaderDesc(e)}
              maxLength={110}
            />
            <TextAreaLength isValid={leaderDesc.length <= 100}>
              {leaderDesc.length}/ 100
            </TextAreaLength>
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

const TextAreaLength = styled.span<{ isValid: boolean }>`
  position: absolute;
  right: 4rem;
  bottom: 4rem;

  width: fit-content;

  color: ${({ theme, isValid }) => (isValid ? theme.colors.gray70 : theme.colors.mileRed)};

  ${({ theme }) => theme.fonts.button3};
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

  @media ${MOBILE_MEDIA_QUERY} {
    ::placeholder {
      ${({ theme }) => theme.fonts.mSubtitle2};
    }
    ${({ theme }) => theme.fonts.mSubtitle2};
  }
`;

const GroupLeaderInfoWrppaer = styled.section`
  position: relative;
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

  @media ${MOBILE_MEDIA_QUERY} {
    ::placeholder {
      ${({ theme }) => theme.fonts.mSubtitle2};
    }
    ${({ theme }) => theme.fonts.mSubtitle2};
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

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mTitle6}
  }
`;

const SubTitle = styled.h2`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.title5};

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mSubtitle4};
  }
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

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;

    /* padding: 0 2rem; */
  }
`;

export default CreateGroupLeaderInfo;
