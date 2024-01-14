import { useState } from 'react';

import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

import Carousel from './carousel/Carousel';
import EachArticle from './carousel/EachArticle';
import CuriousArticle from './components/CuriousArticle';
import CuriousProfile from './components/CuriousProfile';
import GroupCuriousTitle from './components/GroupCuriousTitle';
import GroupSideHeader from './components/GroupSideHeader';
import GroupTodayWriteStyle from './components/GroupTodayWriteStyle';
import { useGroupFeedAuth, useGroupInfo } from './hooks/queries';
import GroupFloatingBtn from '../../assets/svgs/groupFloatingBtn.svg';
import GroupFloatingBtnHover from '../../assets/svgs/groupFloatingBtnHover.svg';
import GroupThumbnailImg from '../../assets/svgs/groupThumnailImg.svg';
import Footer from '../../components/commons/Footer';
import { GroupFeedHeader, LogOutHeader } from '../../components/commons/Header';
import Spacing from '../../components/commons/Spacing';

const GroupFeed = () => {
  const { groupId } = useParams();
  const { isMember, isLoading, isError, error } = useGroupFeedAuth(groupId || '');
  const { groupInfoData } = useGroupInfo(groupId || '');

  const [activeCategoryId, setActiveCategoryId] = useState<number>(1);
  const accessToken = localStorage.getItem('accessToken');

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(`/login`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data..{error?.message}</div>;
  }

  return (
    <GroupFeedWrapper>
      {accessToken ? <GroupFeedHeader /> : <LogOutHeader onClick={handleLogin} />}
      <GroupFeedThumnail imageUrl={groupInfoData?.imageUrl} />
      <Spacing marginBottom="6" />
      <GroupInfoWrapper>
        {groupInfoData && <GroupSideHeader groupInfoData={groupInfoData} />}
        <GroupInfo>
          <GroupTodayWriteStyle isMember={isMember} />
          <Spacing marginBottom="6.4" />
          <GroupCuriousTitle
            mainText="궁금해요 버튼이 많은 2명의 프로필"
            subText="부연설명 텍스트"
          />
          <Spacing marginBottom="2" />
          <CuriousProfile />
          <Spacing marginBottom="6.4" />
          <GroupCuriousTitle mainText="궁금해요 버튼이 많은 2개의 글" subText="부연설명 텍스트" />
          <Spacing marginBottom="2" />
          <CuriousArticle />
          <Spacing marginBottom="6.4" />
          <Carousel activeCategoryId={activeCategoryId} setActiveCategoryId={setActiveCategoryId} />
          <Spacing marginBottom="3.2" />
          <Topic>글감자리입니다.최대 공백포함 15자입니다.</Topic>
          <Spacing marginBottom="0.8" />
          <TopicDescription>
            글감 소개 자리입니다. 최대 공백포함90자입니다. 글감 소개 자리입니다. 최대
            공백포함90자입니다. 글감 소개 자리입니다. 최대 공백포함90자입니다. 글감 소개 자리입니다.
            최대 공백포함90자입니다.
          </TopicDescription>
          <Spacing marginBottom="2" />
          <EachArticle />
        </GroupInfo>
      </GroupInfoWrapper>
      <Spacing marginBottom="14" />
      <Footer />
      {isMember !== undefined && isMember && <FloatingBtn />}
    </GroupFeedWrapper>
  );
};

export default GroupFeed;

const GroupFeedWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.backGroundGray};
`;

const GroupFeedThumnail = styled.div<{ imageUrl: string | undefined }>`
  width: 136.6rem;
  height: 37rem;

  background-image: ${({ imageUrl }) => `url(${imageUrl || GroupThumbnailImg})`};
  background-size: cover;
`;
const GroupInfoWrapper = styled.div`
  display: flex;
  gap: 3.9rem;
  width: 136.6rem;
  padding-right: 16.5rem;
  padding-left: 16.5rem;
`;

const GroupInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 72rem;
`;

const Topic = styled.div`
  width: 63.1rem;

  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.title5};
`;

const TopicDescription = styled.div`
  width: 63.1rem;

  color: ${({ theme }) => theme.colors.gray70};

  ${({ theme }) => theme.fonts.body3};
`;

const FloatingBtn = styled.div`
  position: fixed;
  right: calc((100vw - 136.6rem) / 2 + 6rem);
  bottom: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7rem;
  height: 7rem;

  background-image: url(${GroupFloatingBtn});

  :hover {
    background-image: url(${GroupFloatingBtnHover});
  }
`;
