import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';

import { DefaultHeader } from '../../components/commons/Header';
import Spacing from '../../components/commons/Spacing';

const GroupJoinCongrats = () => {
  const location = useLocation();
  return (
    <GroupJoinCongratsWrapper>
      <DefaultHeader />
      <Spacing marginBottom="11.4" />
      <GroupJoinCongratsContainer>
        <GroupJoinTitleWrapper>
          <GroupJoinTitle>{location.state.moimTitle} 가입을 축하해요!</GroupJoinTitle>
          <GroupJoinText>글 모임에서 당신의 소중한 이야기를 들려주세요.</GroupJoinText>
        </GroupJoinTitleWrapper>
        <Spacing marginBottom="4.8" />
        <CongratsImg />
        <Spacing marginBottom="4.8" />
        <GoToGroupFeedBtn>모임 페이지 보러가기</GoToGroupFeedBtn>
      </GroupJoinCongratsContainer>
    </GroupJoinCongratsWrapper>
  );
};

export default GroupJoinCongrats;

const GroupJoinCongratsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 82.6rem;
`;

const GroupJoinCongratsContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 72rem;
  height: 54.4rem;
  padding: 6.4rem 5.25rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

const GroupJoinTitleWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
  justify-content: center;
`;

const GroupJoinTitle = styled.h1`
  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.title3}
`;

const GroupJoinText = styled.p`
  color: ${({ theme }) => theme.colors.gray90};
  ${({ theme }) => theme.fonts.subtitle4}
`;

const CongratsImg = styled.div`
  width: 100%;
  height: 19.4rem;

  background-color: ${({ theme }) => theme.colors.gray10};
`;

const GoToGroupFeedBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1.5rem 0;

  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.mainViolet};
  border-radius: 5px;

  /* 글자 크기 변경 필요 !!!! */
  ${({ theme }) => theme.fonts.subtitle4}

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
  }
`;
