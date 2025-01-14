import styled from '@emotion/styled';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DefaultHeader } from '../../components/commons/Header';
import Spacing from '../../components/commons/Spacing';
import groupJoinCongratsIlust from '/src/assets/images/createGroupCongrats.png';
import groupJoinCongratsWebp from '/src/assets/webps/joincongratulation.webp';
import { MOBILE_MEDIA_QUERY } from '../../styles/mediaQuery';

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
        <TitleImgWrapper>
          <GroupJoinTitleWrapper>
            <GroupJoinTitle>{location?.state?.moimTitle} 가입을 축하해요!</GroupJoinTitle>
            <GroupJoinText>글 모임에서 당신의 소중한 이야기를 들려주세요.</GroupJoinText>
          </GroupJoinTitleWrapper>
          <Spacing marginBottom="4.8" />
          <GroupJoinImg>
            <source srcSet={groupJoinCongratsWebp} />
            <GroupJoinIlust src={groupJoinCongratsIlust} alt="가입 축하 일러스트" />
          </GroupJoinImg>
        </TitleImgWrapper>
        <Spacing marginBottom="4.8" />
        <GoToGroupFeedBtn onClick={onClickGoToGroupFeedBtn}>모임 페이지 보러가기</GoToGroupFeedBtn>
      </GroupJoinCongratsWrapper>
    </JoinWrapper>
  );
};

export default GroupJoinCongrats;

const JoinWrapper = styled.div`
  display: flex;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.white};
`;

const GroupJoinCongratsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.white};

  @media ${MOBILE_MEDIA_QUERY} {
    position: relative;
    padding: 0 2rem;
  }
`;

const TitleImgWrapper = styled.div`
  @media ${MOBILE_MEDIA_QUERY} {
    position: absolute;
    top: 25%;
  }
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

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mTitle6}
  }
`;

const GroupJoinImg = styled.picture`
  width: 40.8rem;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 35rem;
  }
`;

const GroupJoinIlust = styled.img`
  @media ${MOBILE_MEDIA_QUERY} {
    width: 35rem;
  }
`;

const GroupJoinText = styled.p`
  color: ${({ theme }) => theme.colors.gray90};
  ${({ theme }) => theme.fonts.subtitle4}

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mSubtitle4}
  }
`;

const GoToGroupFeedBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 61.5rem;
  padding: 1.5rem 0;

  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.mainViolet};
  border-radius: 5px;

  ${({ theme }) => theme.fonts.subtitle4}

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    position: absolute;
    bottom: 4.2rem;
    width: 90%;

    border-radius: 10px;

    ${({ theme }) => theme.fonts.button2};
  }
`;
