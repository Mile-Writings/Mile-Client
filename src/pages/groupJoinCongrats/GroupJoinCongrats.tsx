import styled from '@emotion/styled';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DefaultHeader } from '../../components/commons/Header';
import Spacing from '../../components/commons/Spacing';
import groupJoinCongratsIlust from '/src/assets/images/createGroupCongrats.png';
import groupJoinCongratsWebp from '/src/assets/webps/joincongratulation.webp';

const GroupJoinCongrats = () => {
  const { groupId } = useParams() as { groupId: string };
  const location = useLocation();
  const navigate = useNavigate();

  if (!location?.state?.moinTitle) {
    navigate('/error');
  }
  const onClickGoToGroupFeedBtn = () => {
    navigate(`/group/${groupId}`);
  };
  return (
    <JoinWrapper>
      <DefaultHeader />
      <GroupJoinCongratsWrapper>
        <Spacing marginBottom="15.6" />
        <GroupJoinCongratsContainer>
          <GroupJoinTitleWrapper>
            <GroupJoinTitle>{location?.state?.moimTitle} 가입을 축하해요!</GroupJoinTitle>
            <GroupJoinText>글 모임에서 당신의 소중한 이야기를 들려주세요.</GroupJoinText>
          </GroupJoinTitleWrapper>
          <Spacing marginBottom="4.8" />
          <picture>
            <source srcSet={groupJoinCongratsWebp} />
            <img src={groupJoinCongratsIlust} alt="가입 축하 일러스트" />
          </picture>
          <Spacing marginBottom="4.8" />
          <GoToGroupFeedBtn onClick={onClickGoToGroupFeedBtn}>
            모임 페이지 보러가기
          </GoToGroupFeedBtn>
        </GroupJoinCongratsContainer>
      </GroupJoinCongratsWrapper>
    </JoinWrapper>
  );
};

export default GroupJoinCongrats;

const JoinWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const GroupJoinCongratsWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15.6rem 0 11.6rem;

  background-color: ${({ theme }) => theme.colors.white};
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
